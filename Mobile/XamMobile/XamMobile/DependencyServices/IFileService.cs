using System;
using System.Collections.Generic;
using System.Text;

namespace XamMobile.DependencyServices
{
    public interface IFileService
    {
        void OpenFile(string filePath);
        string GetDownloadFolder();
    }
}
