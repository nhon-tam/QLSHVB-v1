﻿using Common.Common;
using DocumentManagement.BUS;
using DocumentManagement.Common;
using DocumentManagement.FrameWork;
using DocumentManagement.Models.Entity.ComputerFile;
using DocumentManagement.Models.Entity.Profile;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Mvc;
using System.Web;

namespace DocumentManagement.Controllers
{
    public class ProfileController : BaseApiController
    {
        private static readonly ProfileBUS profileBUS = ProfileBUS.GetProfileBUSInstance;
        //private static readonly string FILE_UPLOAD_DIR = Environment.CurrentDirectory + @"\FilesUpload";
        //private static readonly string CURRENT_DIRECTORY = Environment.CurrentDirectory;
        private static readonly GearBoxBUS gearBoxBUS = GearBoxBUS.GetGearBoxBUSInstance;
        //private static readonly string FILE_UPLOAD_DIR = Environment.CurrentDirectory + @"\FilesUpload";
        //private static readonly string CURRENT_DIRECTORY = Environment.CurrentDirectory;

        [HttpGet]
        public IActionResult GetPagingWithSearchResults(BaseCondition<Profiles> condition)
        {
            var result = profileBUS.GetPagingWithSearchResults(condition);
            return Ok(result);
        }

        [HttpGet]
        public IActionResult GetProfilesById([FromQuery] int profileId)
        {
            var result = profileBUS.GetProfileByID(profileId);
            return Ok(result);
        }

        [HttpGet("{gearboxID}")]
        //[Authorize]
        public IActionResult GetProfileByGeaBoxID(int gearboxID)
        {
            var result = profileBUS.GetProfileByGearBoxID(gearboxID);
            return Ok(result);
        }

        [HttpGet("{profileID}")]
        //[Authorize]
        public IActionResult GetFillDataByProfileID(int profileID)
        {
            var result = profileBUS.GetFillDataByProfileID(profileID);
            return Ok(result);
        }

        // For select2
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetProfileByGearBoxId(string id)
        {
            var result = profileBUS.GetProfileByGearBoxId(id);
            return Ok(result);
        }

        [NonAction]
        public int GetNumberOfPdfPages(string pathDocument)
        {
            if (pathDocument.Split('.').Length > 0)
            {
                string[] arrPathFile = pathDocument.Split('.');
                int length = arrPathFile.Length;
                if (arrPathFile[length - 1].ToLower() == "pdf")
                {
                    PdfReader reader = new PdfReader(pathDocument);
                    int pages = reader.NumberOfPages;
                    reader.Dispose();
                    reader.Close();
                    return pages;
                }
            }
            return 0;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> ProfilesAddNewAndUploadFile()
        {
            IFormCollection form;
            form = await Request.ReadFormAsync();
            object obj3 = Request.Form["profile"]; // object
            Profiles profile = Libs.DeserializeObject<Profiles>(obj3.ToString());
            ReturnResult<Profiles> result = new ReturnResult<Profiles>();
            try
            {
                ICollection<IFormFile> files = Request.Form.Files.ToList(); // danh sách file
                List<ComputerFile> lstFilesExists = new List<ComputerFile>();
                List<ComputerFile> lstFileInfo = new List<ComputerFile>();

                string directoryPathFileUpload = Const.FILE_UPLOAD_DIR + profile.FileCode;
                //string directoryPathFileUpload = Path.Combine(path, profile.FileCode);
                var profileCheck = profileBUS.GetProfileByFileCode(profile.FileCode);
                if (Directory.Exists(directoryPathFileUpload) || profile.FileCode == profileCheck.Item.FileCode)
                {
                    result.Failed("-3", "Tồn tại hồ sơ có mã hồ sơ " + profile.FileCode + " trên hệ thống, vui lòng thử lại.");
                    return Ok(result);
                }
                Directory.CreateDirectory(directoryPathFileUpload);
                if (files.Count > 0)
                {

                    // upload file lên server
                    foreach (var file in files)
                    {
                        var fileExtension = file.FileName.Split('.');
                        if (fileExtension.Length != 0)
                        {
                            if (fileExtension[1].Equals("pdf"))
                            {
                                var filePath = Path.Combine(directoryPathFileUpload, file.FileName);
                                FilesUtillities.CopyFileToPhysicalDiskSync(file, filePath);
                            }
                        }
                    }

                    // lấy lại danh sách file đã được tải lên
                    string[] lstDirFilesUploaded = Directory.GetFiles(directoryPathFileUpload);
                    List<ComputerFile> lstFiles = new List<ComputerFile>();
                    foreach (var fileUrl in lstDirFilesUploaded)
                    {
                        string fileName = Path.GetFileName(fileUrl);
                        foreach (var file in files)
                        {
                            if (fileName.Equals(file.FileName))
                            {
                                lstFiles.Add(new ComputerFile()
                                {
                                    FileName = file.FileName,
                                    Size = (Math.Round((double)(file.Length / 1000000.0), 6)).ToString(),
                                    Url = fileUrl,
                                    PageNumber = GetNumberOfPdfPages(fileUrl),
                                    CreatedBy = profile.CreatedBy,
                                    FolderPath = directoryPathFileUpload,
                                    ClientUrl = Const.FILE_SERVER_FOLDER + profile.FileCode + "/" + file.FileName
                                });
                            }
                        }
                    }

                    result = profileBUS.Create(profile, lstFiles);
                }
                else
                {
                    // không tải file lên thì chỉ send thông tin hồ sơ
                    result = profileBUS.Create(profile);
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                result.Failed("1", ex.Message);
                return Ok(result);
            }

        }

        [HttpPost]
        public async Task<IActionResult> ProfileUpdate()
        {
            IFormCollection form;
            object obj3 = Request.Form["profile"]; // object
            Profiles profile = Libs.DeserializeObject<Profiles>(obj3.ToString());
            ReturnResult<Profiles> result = new ReturnResult<Profiles>();
            try
            {
                ICollection<IFormFile> files = Request.Form.Files.ToList();
                List<ComputerFile> lstFilesExists = new List<ComputerFile>();
                List<ComputerFile> lstFileInfo = new List<ComputerFile>();
                List<ComputerFile> lstFiles = new List<ComputerFile>();

                string path = Libs.GetFullPathDirectoryFileUpload();

                string directoryPathFileUpload = Const.FILE_UPLOAD_DIR + profile.FileCode;

                //string directoryPathFileUpload = Path.Combine(path, profile.FileCode);
                if (!Directory.Exists(directoryPathFileUpload))
                {
                    // FileCode changed
                    //    string[] directories = Directory.GetDirectories(Const.FILE_UPLOAD_DIR);
                    var profileCheck = profileBUS.GetProfileByID(profile.ProfileId);
                    string directoryOfProfile = Path.Combine(path, profileCheck.Item.FileCode);
                    if (Directory.Exists(directoryOfProfile))
                    {
                        Directory.Move(directoryOfProfile, directoryPathFileUpload);
                    }
                    else
                    {
                        Directory.CreateDirectory(directoryPathFileUpload);
                    }
                    if (files.Count > 0)
                    {
                        string[] lstFilesDir = Directory.GetFiles(directoryPathFileUpload);
                        if (lstFilesDir.Length > 0)
                        {
                            string[] lstDirFilesUpload = lstFilesDir;
                            foreach (var fileAlreadyExsists in lstDirFilesUpload)
                            {
                                foreach (var file in files)
                                {
                                    if (fileAlreadyExsists.IndexOf(file.FileName) > -1)
                                    {
                                        lstFilesExists.Add(new ComputerFile()
                                        {
                                            FileName = Path.GetFileName(fileAlreadyExsists),
                                            ProfileId = profile.ProfileId,
                                            Url = fileAlreadyExsists
                                        });
                                    }
                                }
                            }
                            string overwrite = Request.Form["overwrite"].ToString();
                            if (lstFilesExists.Count > 0)
                            {
                                if (overwrite == "accept")
                                {
                                    foreach (var fileAlreadyExists in lstFilesExists)
                                    {
                                        System.IO.File.Delete(fileAlreadyExists.Url);
                                    }
                                    //    overwrite file already exists
                                    foreach (var file in files)
                                    {
                                        string filePath = Path.Combine(directoryPathFileUpload, file.FileName);
                                        FilesUtillities.CopyFileToPhysicalDiskSync(file, filePath);
                                    }
                                }
                                else
                                {
                                    var fileResult = new ReturnResult<ComputerFile>()
                                    {
                                        ReturnValue = Libs.SerializeObject(lstFilesExists.Select(item => item.FileName))
                                    };
                                    fileResult.Failed("-2", "Tồn tại file đã được upload lên hệ thống.");
                                    return Ok(fileResult);
                                }
                            }
                            else
                            {
                                foreach (var file in files)
                                {
                                    var filePath = Path.Combine(directoryPathFileUpload, file.FileName);
                                    FilesUtillities.CopyFileToPhysicalDiskSync(file, filePath);
                                }
                            }
                        }
                        else
                        {
                            foreach (var file in files)
                            {
                                var filePath = Path.Combine(directoryPathFileUpload, file.FileName);
                                FilesUtillities.CopyFileToPhysicalDiskSync(file, filePath);
                            }
                        }
                        // lấy lại danh sách file đã được tải lên
                        string[] lstDirFilesUploaded = Directory.GetFiles(directoryPathFileUpload);
                        foreach (var fileUrl in lstDirFilesUploaded)
                        {
                            string fileName = Path.GetFileName(fileUrl);
                            foreach (var file in files)
                            {
                                if (fileName.Equals(file.FileName))
                                {
                                    lstFiles.Add(new ComputerFile()
                                    {
                                        FileName = file.FileName,
                                        Size = (Math.Round((double)(file.Length / 1000000.0), 6)).ToString(),
                                        Url = fileUrl,
                                        PageNumber = GetNumberOfPdfPages(fileUrl),
                                        CreatedBy = profile.CreatedBy,
                                        FolderPath = directoryPathFileUpload,
                                        ClientUrl = Const.FILE_SERVER_FOLDER + profile.FileCode + "/" + HttpUtility.HtmlEncode(fileName)
                                    });
                                }
                            }
                        }

                        result = profileBUS.Update(profile, lstFiles, lstFilesExists, directoryPathFileUpload);
                    }
                    else
                    {
                        // không tải file lên thì chỉ send thông tin hồ sơ
                        result = profileBUS.Update(profile, null, null, directoryPathFileUpload);
                    }
                }
                else
                {
                    if (files.Count > 0)
                    {
                        string[] lstFilesDir = Directory.GetFiles(directoryPathFileUpload);
                        if (lstFilesDir.Length > 0)
                        {
                            string[] lstDirFilesUpload = lstFilesDir;
                            foreach (var fileAlreadyExsists in lstDirFilesUpload)
                            {
                                foreach (var file in files)
                                {
                                    if (fileAlreadyExsists.IndexOf(file.FileName) > -1)
                                    {
                                        lstFilesExists.Add(new ComputerFile()
                                        {
                                            FileName = Path.GetFileName(fileAlreadyExsists),
                                            ProfileId = profile.ProfileId,
                                            Url = fileAlreadyExsists
                                        });
                                    }
                                }
                            }
                            string overwrite = Request.Form["overwrite"].ToString();
                            if (lstFilesExists.Count > 0)
                            {
                                if (overwrite == "accept")
                                {
                                    foreach (var fileAlreadyExists in lstFilesExists)
                                    {
                                        System.IO.File.Delete(fileAlreadyExists.Url);
                                    }

                                    //    overwrite file already exists
                                    foreach (var file in files)
                                    {
                                        string filePath = Path.Combine(directoryPathFileUpload, file.FileName);
                                        FilesUtillities.CopyFileToPhysicalDiskSync(file, filePath);
                                    }
                                }
                                else
                                {
                                    var fileResult = new ReturnResult<ComputerFile>()
                                    {
                                        ReturnValue = Libs.SerializeObject(lstFilesExists.Select(item => item.FileName))
                                    };

                                    fileResult.Failed("-2", "Tồn tại file đã được upload lên hệ thống.");
                                    return Ok(fileResult);
                                }
                            }
                            else
                            {
                                foreach (var file in files)
                                {
                                    var filePath = Path.Combine(directoryPathFileUpload, file.FileName);
                                    FilesUtillities.CopyFileToPhysicalDiskSync(file, filePath);
                                }
                            }
                        }
                        else
                        {
                            foreach (var file in files)
                            {
                                var filePath = Path.Combine(directoryPathFileUpload, file.FileName);
                                FilesUtillities.CopyFileToPhysicalDiskSync(file, filePath);
                            }
                        }
                        // lấy lại danh sách file đã được tải lên
                        string[] lstDirFilesUploaded = Directory.GetFiles(directoryPathFileUpload);
                        foreach (var fileUrl in lstDirFilesUploaded)
                        {
                            string fileName = Path.GetFileName(fileUrl);
                            foreach (var file in files)
                            {
                                if (fileName.Equals(file.FileName))
                                {
                                    lstFiles.Add(new ComputerFile()
                                    {
                                        FileName = file.FileName,
                                        Size = (Math.Round((double)(file.Length / 1000000.0), 6)).ToString(),
                                        Url = fileUrl,
                                        PageNumber = GetNumberOfPdfPages(fileUrl),
                                        CreatedBy = profile.CreatedBy,
                                        FolderPath = directoryPathFileUpload,
                                        ClientUrl = Const.FILE_SERVER_FOLDER + profile.FileCode + "/" + HttpUtility.HtmlEncode(fileName)
                                    });
                                }
                            }
                        }
                        result = profileBUS.Update(profile, lstFiles, lstFilesExists, directoryPathFileUpload);
                    }
                    else
                    {
                        // không tải file lên thì chỉ send thông tin hồ sơ
                        result = profileBUS.Update(profile, null, null, directoryPathFileUpload);
                    }
                }
                // check FileCode was edit ?
                #region FILE UPLOAD
                //if (files.Count > 0)
                //{
                //    string[] lstFilesDir = Directory.GetFiles(directoryPathFileUpload);
                //    if (lstFilesDir.Length > 0)
                //    {
                //        string[] lstDirFilesUpload = lstFilesDir;
                //        foreach (var fileAlreadyExsists in lstDirFilesUpload)
                //        {
                //            foreach (var file in files)
                //            {
                //                if (fileAlreadyExsists.IndexOf(file.FileName) > -1)
                //                {
                //                    lstFilesExists.Add(new ComputerFile()
                //                    {
                //                        FileName = fileAlreadyExsists,
                //                        ProfileId = profile.ProfileId,
                //                        Url = fileAlreadyExsists
                //                    });
                //                }
                //            }
                //        }
                //        string overwrite = Request.Form["overwrite"].ToString();
                //        if (lstFilesExists.Count > 0)
                //        {
                //            if (overwrite == "accept")
                //            {
                //                foreach (var fileAlreadyExists in lstFilesExists)
                //                {
                //                    System.IO.File.Delete(fileAlreadyExists.FileName);
                //                }

                //                //    overwrite file already exists
                //                foreach (var file in files)
                //                {
                //                    string filePath = Path.Combine(directoryPathFileUpload, file.FileName);
                //                    FilesUtillities.CopyFileToPhysicalDiskSync(file, filePath);
                //                }
                //            }
                //            else
                //            {
                //                var fileResult = new ReturnResult<ComputerFile>()
                //                {
                //                    ReturnValue = Libs.SerializeObject(lstFilesExists.Select(item => item.FileName))
                //                };

                //                fileResult.Failed("-2", "Tồn tại file đã được upload lên hệ thống.");
                //                return Ok(fileResult);
                //            }
                //        }
                //        else
                //        {
                //            foreach (var file in files)
                //            {
                //                var filePath = Path.Combine(directoryPathFileUpload, file.FileName);
                //                FilesUtillities.CopyFileToPhysicalDiskSync(file, filePath);
                //            }
                //        }
                //    }
                //    else
                //    {
                //        foreach (var file in files)
                //        {
                //            var filePath = Path.Combine(directoryPathFileUpload, file.FileName);
                //            FilesUtillities.CopyFileToPhysicalDiskSync(file, filePath);
                //        }
                //    }
                //    // lấy lại danh sách file đã được tải lên
                //    string[] lstDirFilesUploaded = Directory.GetFiles(directoryPathFileUpload);

                //    foreach (var fileUrl in lstDirFilesUploaded)
                //    {
                //        string fileName = Path.GetFileName(fileUrl);
                //        foreach (var file in files)
                //        {
                //            if (fileName.Equals(file.FileName))
                //            {
                //                lstFiles.Add(new ComputerFile()
                //                {
                //                    FileName = file.FileName,
                //                    Size = (Math.Round((double)(file.Length / 1000000.0), 6)).ToString(),
                //                    Url = fileUrl,
                //                    PageNumber = GetNumberOfPdfPages(fileUrl),
                //                    CreatedBy = profile.CreatedBy,
                //                    FolderPath = directoryPathFileUpload
                //                });
                //            }
                //        }
                //    }

                //    result = profileBUS.Update(profile, lstFiles, lstFilesExists, directoryPathFileUpload);
                //}
                //else
                //{
                //    // không tải file lên thì chỉ send thông tin hồ sơ
                //    result = profileBUS.Update(profile, null, null, directoryPathFileUpload);
                //}
                #endregion
                return Ok(result);
            }
            catch (Exception ex)
            {
                result.Failed("1", ex.Message);
                return Ok(result);
            }
        }



        /// <summary>
        /// Lấy dữ liệu + tìm kiếm + phân trang cho hồ sơ
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult ProfilesGetSearchWithPaging(BaseCondition<Profiles> condition)
        {
            return Ok(profileBUS.ProfilesGetSearchWithPaging(condition));
        }

        [HttpGet]
        public IActionResult GetAllProfiles()
        {
            ReturnResult<Profiles> result = profileBUS.GetAllProfiles();
            return Ok(new ProfileFilterOptions()
            {
                lstFileCode = result.ItemList.Select(item => item.FileCode).Distinct().ToList(),
                lstTitle = result.ItemList.Select(item => item.Title).Distinct().ToList(),
                lstGearBoxCode = result.ItemList.Select(item => item.GearBoxCode).Distinct().ToList()
            });
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProfileTypeAndGearBox()
        {
            //ProfileNew profileNew = new ProfileNew();
            //profileNew.lstGearBox = gearBoxBUS.GetAllGearBox().ItemList;
            //profileNew.lstProfileTypes = profileBUS.GetAllProfileTypes().ItemList;
            var gearBoxs = await gearBoxBUS.GetAllGearBox();
            return Ok(new ProfileNew()
            {
                lstGearBox = gearBoxs.ItemList,
                lstProfileTypes = profileBUS.GetAllProfileTypes().ItemList
            });
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult GetListFilesByProfileId([FromBody] BaseCondition<Profiles> condition)
        {
            var result = profileBUS.GetListFilesByProfileId(condition);
            return Ok(result);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="profileId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("{profileId}")]
        public IActionResult GetComputerFileByProfileId(string profileId)
        {
            var result = profileBUS.GetComputerFileByProfileId(profileId);
            return Ok(result);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="condition"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult GetDocumentsByProfileId(BaseCondition<Profiles> condition)
        {
            return Ok(profileBUS.GetDocumentsByProfileId(condition));
        }
    }

}