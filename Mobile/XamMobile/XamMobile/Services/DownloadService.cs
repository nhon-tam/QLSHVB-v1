using Acr.UserDialogs;
using Plugin.LocalNotification;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.IO;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Xamarin.Forms;
using XamMobile.DependencyServices;

namespace XamMobile.Services
{
    public class DownloadService : IDownloaderService
    {
        public event EventHandler<DownloadEventArgs> OnFileDownloaded;
        public event EventHandler<DowloadProgressEventArgs> OnProgressDownload;
        IPermissionService PermissionService;
        IFileService FileService;
        private long TotalByDownload;

        public void OpenFile(NotificationTappedEventArgs eventArgs)
        {
            FileService.OpenFile(eventArgs.Data);
            RemoveAllTappEvents();
        }

        private void RemoveAllTappEvents()
        {
            foreach (var delegateItem in openFilesDelegate)
            {
                NotificationCenter.Current.NotificationTapped -= delegateItem;
            }

            openFilesDelegate.Clear();
        }

        public DownloadService(IPermissionService permissionService, IFileService fileService)
        {
            PermissionService = permissionService;
            FileService = fileService;
        }

        private static List<NotificationTappedEventHandler> openFilesDelegate = new List<NotificationTappedEventHandler>();

        public async Task<string> DownloadFile(string filePath, string folder, object data = null, string fileName = null, bool stillDownloadIfExist = true, bool isDownloadFolder = true, ActionFileDownload action = ActionFileDownload.Download, string fileLocalPath = null, bool isSlient = false)
        {
            bool permission = await PermissionService.RequestExternalPermssion();
            if (!permission)
            {
                throw new Exception("Permission Denied. Can not continue, please try again.");
            }

            if (action == ActionFileDownload.Download)
            {
                RemoveAllTappEvents();
                NotificationCenter.Current.NotificationTapped += OpenFile;
                openFilesDelegate.Add(OpenFile);
            }

            // if load file from local
            if (!string.IsNullOrEmpty(fileLocalPath))
            {
                OnDownloadCompleted(false, fileLocalPath, action, data, isSlient);
                return fileLocalPath;
            }

            string downloadFolder = folder;
            if (isDownloadFolder) // if download folder is parent
                downloadFolder = Path.Combine(FileService.GetDownloadFolder(), folder);

            try
            {
                if (!Directory.Exists(downloadFolder))
                {
                    Directory.CreateDirectory(downloadFolder);
                }
                using (var webClient = new CustomWebClient())
                {
                    webClient.Action = action;
                    webClient.Data = data;
                    webClient.Headers.Add("Authorization", "Bearer " + BaseService.AccessToken);
                    using (webClient.OpenRead(filePath))
                    {
                        TotalByDownload = Convert.ToInt64(webClient.ResponseHeaders["Content-Length"]);
                    }
                    webClient.DownloadFileCompleted += new AsyncCompletedEventHandler(Completed);
                    webClient.DownloadProgressChanged += new DownloadProgressChangedEventHandler(ProgressChanged);

                    var fullPath = Path.Combine(downloadFolder, Path.GetFileName(filePath));
                    if (fileName != null)
                    {
                        fullPath = $"{ downloadFolder }/{fileName}";
                    }

                    string fName = AppendFileNumberIfExists(fullPath, "", stillDownloadIfExist);
                    webClient.FilePath = Path.Combine(downloadFolder, Path.GetFileName(fName));

                    // just download if file not exist
                    if (!File.Exists(webClient.FilePath))
                    {
                        await webClient.DownloadFileTaskAsync(new Uri(filePath), webClient.FilePath);
                    }
                    else
                    {
                        // download successfully
                        OnDownloadCompleted(false, webClient.FilePath, action, data, isSlient);
                    }
                    return webClient.FilePath;
                }
            }
#pragma warning disable CA1031 // Do not catch general exception types
            catch (Exception ex)
            {
                OnDownloadCompleted(true, string.Empty, action, data, isSlient);
                return string.Empty;
            }
#pragma warning restore CA1031 // Do not catch general exception types
        }

        public async Task<ImageSource> DownloadFileIntoMemory(string filePath)
        {
            string downloadFolder = FileService.GetDownloadFolder();
            var webClient = new WebClient();
            webClient.Headers.Add("Authorization", "Bearer " + BaseService.AccessToken);
            var imageData = await webClient.DownloadDataTaskAsync(filePath);
            return ByteToImage(imageData);
        }

        public static ImageSource ByteToImage(byte[] imageData)
        {
            ImageSource retSource = null;
            if (imageData != null)
            {
                retSource = ImageSource.FromStream(() => new MemoryStream(imageData));
            }
            return retSource;
        }

        private string AppendFileNumberIfExists(string file, string ext, bool stillDownloadIfExist)
        {
            if (File.Exists(file))
            {
                if (stillDownloadIfExist)
                {
                    string folderPath = Path.GetDirectoryName(file);
                    string fileName = Path.GetFileNameWithoutExtension(file);
                    string extension = string.Empty;
                    if (string.IsNullOrEmpty(ext))
                    {
                        extension = Path.GetExtension(file);
                    }
                    else
                    {
                        extension = ext;
                    }

                    int fileNumber = 0;
                    Regex r = new Regex(@"\(([0-9]+)\)$");
                    Match m = r.Match(fileName);
                    string addSpace = " ";
                    if (m.Success)
                    {
                        addSpace = string.Empty;
                        string s = m.Groups[1].Captures[0].Value;
                        var c = int.TryParse(s, out fileNumber);
                        fileName = fileName.Replace("(" + s + ")", "");
                    }
                    do
                    {
                        fileNumber += 1;
                        file = Path.Combine(
                            folderPath,
                            string.Format(
                                CultureInfo.CurrentCulture,
                                "{0}{3}({1}){2}",
                                fileName,
                                fileNumber,
                                extension,
                                addSpace
                             )
                         );
                    }
                    while (File.Exists(file));
                }
            }
            return file;
        }

        private void Completed(object sender, AsyncCompletedEventArgs e)
        {
            var webClient = sender as CustomWebClient;
            OnDownloadCompleted(e.Error != null, webClient.FilePath, webClient.Action, webClient.Data, false);
        }

        private void ProgressChanged(object sender, DownloadProgressChangedEventArgs e)
        {
            var webClient = sender as CustomWebClient;
            // download progress here
            if (OnProgressDownload != null)
            {
                var percentage = (double)e.BytesReceived / TotalByDownload;
                OnProgressDownload.Invoke(this,
                    new DowloadProgressEventArgs
                    {
                        Data = webClient.Data,
                        TotalByDownload = this.TotalByDownload,
                        BytesReceived = e.BytesReceived,
                        Percentage = e.ProgressPercentage,
                        SelfPercentage = percentage
                    }
                );
            }
        }

        private void OnDownloadCompleted(bool hasError, string filePath, ActionFileDownload action, object data, bool isSlient)
        {
            var fileSaved = !hasError;
            if (hasError)
            {
                if (!isSlient)
                    UserDialogs.Instance.Alert("Download Error");
            }
            else
            {
                // TODO do open file here
                switch (action)
                {
                    case ActionFileDownload.Open:
                        FileService.OpenFile(filePath);
                        break;
                    case ActionFileDownload.Download:
                        UserDialogs.Instance.Toast("File is Downloaded");
                        var notification = new Plugin.LocalNotification.NotificationRequest
                        {
                            NotificationId = 101,
                            Title = "An item has downloaded ",
                            Description = "Click to view more detail",
                            ReturningData = filePath
                        };
                        NotificationCenter.Current.Show(notification);
                        break;
                }
            }

            if (OnFileDownloaded != null)
                OnFileDownloaded.Invoke(this, new DownloadEventArgs(fileSaved, filePath, data));
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }

    public class DownloadEventArgs : EventArgs
    {
        public bool FileSaved { get; set; } = false;
        public string FilePath { get; set; } = string.Empty;
        public object Data { get; set; }
        public DownloadEventArgs(bool fileSaved, string filePath, object data)
        {
            FileSaved = fileSaved;
            FilePath = filePath;
            Data = data;
        }
    }

    public class DowloadProgressEventArgs : EventArgs
    {
        public long TotalByDownload { get; set; }
        public long BytesReceived { get; set; }
        public int Percentage { get; set; }
        public double SelfPercentage { get; set; }
        public object Data { get; set; }
    }

    public enum ActionFileDownload
    {
        Open,
        Download,
        AutoDownload
    }

    public class CustomWebClient : WebClient
    {
        public string FilePath { get; set; }
        public ActionFileDownload Action { get; set; }
        public object Data { get; set; }
    }
}
