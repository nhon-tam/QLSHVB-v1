using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace XamMobile.Services
{
    public interface IDownloaderService : IDisposable
    {
        Task<string> DownloadFile(string filePath, string folder, object Data = null, string fileName = null, bool stillDownloadIfExist = true, bool isDownloadFolder = true, ActionFileDownload action = ActionFileDownload.Download, string fileLocalPath = null, bool isSlient = false);
        event EventHandler<DownloadEventArgs> OnFileDownloaded;
        event EventHandler<DowloadProgressEventArgs> OnProgressDownload;
        Task<ImageSource> DownloadFileIntoMemory(string filePath);
    }
}
