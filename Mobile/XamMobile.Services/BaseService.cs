using AppConstant;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using XamMobile.Services.Models;

namespace XamMobile.Services
{
    public class BaseService : IBaseService
    {
        public string APIBaseURL = AppConstant.AppConstant.Endpoint;
        private readonly JsonSerializerSettings _serializerSettings;
        public static string AccessToken { get; set; }
        private static string DataFormat = "application/json";
        private Uri APIBaseAddress;
        private TimeSpan WebRequestTimeout = TimeSpan.FromSeconds(120);
        HttpClientHandler handler;
        private HttpClient httpClient;
        public HttpClient HttpClient
        {
            get
            {
                if (httpClient == null)
                {
                    CreateHttpClient();
                }
                return httpClient;
            }
        }

        public void CreateHttpClient()
        {
            try
            {
                APIBaseAddress = new Uri(APIBaseURL);
                // dispose old connection
                if (httpClient != null)
                    httpClient.Dispose();
                if (handler != null)
                    handler.Dispose();

                handler = new HttpClientHandler();
                this.httpClient = new HttpClient(handler, false) { BaseAddress = APIBaseAddress };

                this.httpClient.Timeout = WebRequestTimeout;
                this.httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(DataFormat));
            }
            catch (Exception)
            {
                this.httpClient = null;
            }
        }

        public async Task<ResponseResult<TResult>> GetRequestWithHandleErrorAsync<TResult>(string requestUri)
        {
            ResponseResult<TResult> result = new ResponseResult<TResult>();
            result.Message = new MessageResponse();
            try
            {
                result.Result = await GetRequestAsync<TResult>(requestUri);
                result.Message.Code = ResponseCode.SUCCESS;
            }
            catch (Exception)
            {
                result.Message.Code = ResponseCode.ERROR;
            }
            return result;
        }

        public async Task<TResult> GetRequestAsync<TResult>(string requestUri)
        {
            //Authentication : use if ever
            if (!string.IsNullOrEmpty(AccessToken))
            {
                this.HttpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", AccessToken);
            }

            using (var requestResponse = await this.HttpClient.GetAsync(requestUri))
            {
                // check request here
                return await HandleResponse<TResult>(requestResponse);
            }
        }

        public async Task<TResult> PostRequestAsync<TResult>(string requestUri)
        {
            if (!string.IsNullOrEmpty(AccessToken))
            {
                this.HttpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", AccessToken);
            }

            using (var requestResponse = await this.HttpClient.PostAsync(requestUri, null))
            {
                return await HandleResponse<TResult>(requestResponse);
            }
        }

        public async Task<TResult> HandleResponse<TResult>(HttpResponseMessage preloadedJson)
        {
            try
            {
                if (preloadedJson != null && preloadedJson.StatusCode == HttpStatusCode.OK && preloadedJson.IsSuccessStatusCode)
                {

                    var serialized = await preloadedJson.Content.ReadAsStringAsync();
                    var type = typeof(TResult);
                    if (type == typeof(string))
                    {
                        TypeConverter converter = TypeDescriptor.GetConverter(type);
                        if (converter.CanConvertFrom(typeof(string)))
                        {
                            return (TResult)converter.ConvertFrom(serialized);
                        }
                    }
                    TResult result = await Task.Run(() =>
                   JsonConvert.DeserializeObject<TResult>(serialized, _serializerSettings));
                    //DeserializeObjectAsync<TResult>(serialized);
                    return result;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return default(TResult);
        }

        public async Task<MessageResponse> PostRequestWithoutResultAsync<T>(string requestUri, T content)
        {
            var result = new MessageResponse();
            try
            {
                if (!string.IsNullOrEmpty(AccessToken))
                {
                    this.HttpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", AccessToken);
                }

                var jsonString = JsonConvert.SerializeObject(content);
                var stringJsonContent = new StringContent(jsonString, Encoding.UTF8, DataFormat);

                using (var requestResponse = await this.HttpClient.PostAsync(requestUri, stringJsonContent))
                {
                    // check response success
                }
                result.Code = ResponseCode.SUCCESS;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }

        public async Task<TResult> PostRequestAsync<T, TResult>(string requestUri, T content)
        {
            if (!string.IsNullOrEmpty(AccessToken))
            {
                this.HttpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", AccessToken);
            }

            var jsonString = JsonConvert.SerializeObject(content);

            var stringJsonContent = new StringContent(jsonString, Encoding.UTF8, DataFormat);

            using (var requestResponse = await this.HttpClient.PostAsync(requestUri, stringJsonContent))
            {
                return await HandleResponse<TResult>(requestResponse);
            }
        }

        public async Task<TResult> PostRequestFormAsync<TResult>(string requestUri, List<KeyValuePair<string, string>> paramVals)
        {
            
            var req = new HttpRequestMessage(HttpMethod.Post, requestUri) { Content = new FormUrlEncodedContent(paramVals) };
            using (var requestResponse = await this.HttpClient.SendAsync(req))
            {
                return await HandleResponse<TResult>(requestResponse);
            }
        }

        public async Task<ResponseResult<TResult>> PostRequestWithHandleErrorAsync<T, TResult>(string requestUri, T content)
        {
            ResponseResult<TResult> result = new ResponseResult<TResult>();
            result.Message = new MessageResponse();
            try
            {
                result.Result = await PostRequestAsync<T, TResult>(requestUri, content);
                result.Message.Code = ResponseCode.SUCCESS;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }

        public async Task<TResult> UploadFile<TResult>(string requestUri, FileUploaded file)
        {
            List<MemoryStream> memories = new List<MemoryStream>();
            List<HttpContent> streamContents = new List<HttpContent>();

            using (var requestContent = new MultipartFormDataContent())
            {
                var ms = new MemoryStream(file.Content);
                memories.Add(ms);
                HttpContent stream = null;
                stream = CreateFileContent(ms, $"{ file.FileName }", file.MineType);
                requestContent.Add(stream);
                streamContents.Add(stream);

                using (var requestResponse = await this.HttpClient.PostAsync(requestUri, requestContent))
                {
                    foreach (var m in memories)
                        m.Dispose();
                    foreach (var st in streamContents)
                        st.Dispose();

                    return await HandleResponse<TResult>(requestResponse);
                }
            }
        }

        private StreamContent CreateFileContent(Stream stream, string fileName, string contentType)
        {
            var fileContent = new StreamContent(stream);
            fileContent.Headers.ContentDisposition = new ContentDispositionHeaderValue("form-data")
            {
                Name = "\"files\"",
                FileName = "\"" + fileName + "\""
            };
            fileContent.Headers.ContentType = new MediaTypeHeaderValue(contentType);
            return fileContent;
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        internal Task UploadFile<T>(object appConstant, FileUploaded files)
        {
            throw new NotImplementedException();
        }
    }
}
