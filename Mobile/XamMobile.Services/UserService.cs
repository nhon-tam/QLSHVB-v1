using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using XamMobile.EntityModels;
using XamMobile.Services.Models;

namespace XamMobile.Services
{
    public class UserService : BaseService, IUserService
    {
        public async Task<List<NhanVienEntity>> GetNhanVien(int nhanVienId)
        {
            try
            {
                var userResponse = await GetRequestWithHandleErrorAsync<OdataResult<List<NhanVienEntity>>>($"{AppConstant.AppConstant.APINhanVien}?$filter=NhanVienID eq {nhanVienId}");
                if (userResponse.Message.Code == ResponseCode.SUCCESS)
                {
                    return userResponse.Result.Results;
                }
                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }
        public async Task<UserEntity> GetUserById(int userId)
        {
            try
            {
                var userResponse = await GetRequestWithHandleErrorAsync<OdataResult<UserEntity>>($"{AppConstant.AppConstant.APIUser}?$filter=UserID eq {userId}");
                if (userResponse.Message.Code == ResponseCode.SUCCESS)
                {
                    return userResponse.Result.Results;
                }
                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }
        public async Task<List<UserEntity>> GetUsers()
        {
            try
            {
                var userResponse = await GetRequestWithHandleErrorAsync<OdataResult<List<UserEntity>>>($"{AppConstant.AppConstant.APIUser}");
                if (userResponse.Message.Code == ResponseCode.SUCCESS)
                {
                    return userResponse.Result.Results;
                }
                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<MessageResponse> Login(string userName, string password)
        {
            MessageResponse result = new MessageResponse();
            var reqData = new List<KeyValuePair<string, string>>();
            reqData.Add(new KeyValuePair<string, string>("username", userName));
            reqData.Add(new KeyValuePair<string, string>("password", password));
            reqData.Add(new KeyValuePair<string, string>("grant_type", "password"));

            try
            {
                var authenResponse = await PostRequestFormAsync<AuthenResponse>("/token", reqData);
                AccessToken = authenResponse.AccessToken;
                result.Code = ResponseCode.SUCCESS;
            }
            catch (Exception ex)
            {
                result.Code = ResponseCode.ERROR;
                return result;
            }
            return result;
        }

        public async Task<NhanVienEntity> SaveNhanVien(NhanVienEntity model)
        {
            try
            {
                var result = await PostRequestWithHandleErrorAsync<NhanVienEntity, NhanVienEntity>(AppConstant.AppConstant.APIInsertOrUpdateNhanVien, model);
                if (result.Message.IsSuccess)
                {
                    return result.Result;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<bool> DeleteNhanVien(NhanVienEntity model)
        {
            try
            {
                var result = await PostRequestWithHandleErrorAsync<NhanVienEntity, NhanVienEntity>(AppConstant.AppConstant.APIDeleteNhanVien, model);
                return result.Message.IsSuccess;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> UpdateNVAvatar(int nhanVienId, string imageName)
        {
            try
            {
                var res = await GetRequestAsync<string>($"{AppConstant.AppConstant.APIUpdateNhanVienAvatar}?nhanVienId={nhanVienId}&imageName={imageName}");
                return !string.IsNullOrEmpty(res);
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        public async Task<List<NhanVienEntity>> GetNhanViens()
        {
            try
            {
                var userResponse = await GetRequestWithHandleErrorAsync<OdataResult<List<NhanVienEntity>>>($"{AppConstant.AppConstant.APINhanVien}");
                if (userResponse.Message.Code == ResponseCode.SUCCESS)
                {
                    return userResponse.Result.Results;
                }
                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
