import { Component, OnInit, AfterContentInit, HostListener, AfterViewChecked } from '@angular/core';
import { PDFSource } from 'ng2-pdf-viewer';
import { Options } from 'select2';
import { Select2OptionData } from 'ng-select2';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyTaiLieuPopupService } from '../quan-ly-tai-lieu-popup.service';
import { QuanLyTaiLieuService } from '../quan-ly-tai-lieu.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Document } from '../../../model/document.model';
import { QuanLyHopSoService } from '../../quan-ly-hop-so/quan-ly-hop-so.service';
import { QuanLyDanhMucService } from '../../quan-ly-danh-muc/quan-ly-danh-muc.service';
import { HopSo } from '../../../model/hop-so.model';
import { CoQuan } from '../../../model/co-quan.model';
import { Phong } from '../../../model/phong.model';
import { LoaiHoSoService } from '../../quan-ly-loai-ho-so/loai-ho-so.service';
import { QuanLyHoSoService } from '../../quan-ly-ho-so/quan-ly-ho-so.service';
import { FileUpload } from '../../../model/file.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { QuanLyChuKySoService } from '../../quan-ly-chu-ky-so/quan-ly-chu-ky-so.service';
import { DigitalSignature } from '../../../model/digital-signature.model';
import { Compiler } from '@angular/core';
import { setDate } from 'ngx-bootstrap/chronos/utils/date-setters';
import { ApiUrl } from '../../../common';
import { UserGroupService } from '../../quan-ly-nhom-nguoi-dung/user-group.service';

@Component({
  selector: 'app-van-ban-pdf',
  templateUrl: './van-ban-pdf.component.html',
  styleUrls: ['./van-ban-pdf.component.css']
})
export class VanBanPdfComponent implements OnInit, AfterContentInit,AfterViewChecked {
  pdfSrc: string | PDFSource | ArrayBuffer = undefined;
  document: Document = new Document();

  computerFile: FileUpload = new FileUpload();
  value1 = 'Default';
  isEdit: boolean = false;
  defaultValue: string;
  data: any;
  options: Options;
  documentTypeList: Array<Select2OptionData>;
  languageList: Array<Select2OptionData>;
  profileList: Array<Select2OptionData>;
  formatList: Array<Select2OptionData>;
  confidenceLevelList: Array<Select2OptionData>;
  lstOrgan: Array<Select2OptionData>;
  lstFont: Array<Select2OptionData>;
  lstDanhMuc: Array<Select2OptionData>;
  gearBoxList: Array<Select2OptionData>;
  computerFileSelect2: Array<Select2OptionData>;
  computerFileList: Array<FileUpload> = new Array<FileUpload>();
  confidenceLevelId: number;
  languageId: number;
  formatId: number;
  form: FormGroup;
  docTypeId: number;
  submitted = false;
  documentId: number;
  loading = false;
  hopso: HopSo;
  organ: CoQuan;
  phong: Phong;
  organID: any;
  issuedDate: string;
  fontID: any;
  subscription: Subscription;
  saveLoading: boolean = false;
  continueLoading: boolean = false;

  // signature
  loadingSignature = false;
  checked : boolean = false;
  IdSecure : boolean = false;
  IdDisable : boolean = false;
  hasImage: boolean = false;
  imageSrc: string = '#';
  signature: DigitalSignature[];
  gearBoxId: number;
  profileId: number;
  fileId: number;
  public userRole: string;
  public roles : string;
  userName: string;
  constructor(
    private activeModal: NgbActiveModal,
    private taiLieuPopupService: QuanLyTaiLieuPopupService,
    private taiLieuService: QuanLyTaiLieuService,
    private toastr: ToastrService,
    private hopsoService: QuanLyHopSoService,
    private formBuilder: FormBuilder,
    private danhmucService: QuanLyDanhMucService,
    private route: ActivatedRoute,
    private hoSoService: QuanLyHoSoService,
    private quanLyTaiLieuService: QuanLyTaiLieuService,
    private signatureService: QuanLyChuKySoService,
    private _compiler : Compiler,
    private userGroupService: UserGroupService
  ) {
    this.document = new Document();
    this.hopso = new HopSo();
    this.organ = new CoQuan();
    this.phong = new Phong();
    this.userName = localStorage.getItem('user');
    this.options = {
      multiple: false,
      theme: 'classic',
      closeOnSelect: true,
      width: "100%"
    }
  }

  ngOnInit() {
    this.getRoleByUserName();
    this.checked = false;
    this.IdSecure = false;
    this.IdDisable = true;
    this.form = this.formBuilder.group({
      documentCode: ['', Validators.required],
      codeNumber: ['', Validators.required],
      docType: ['', Validators.required],
      issuedDate: ['', Validators.required],
      pageAmount: [''],
      codeNotation: ['', Validators.required],
      docOrdinal: [''],
      language: ['', Validators.required],
      format: ['', Validators.required],
      confidenceLevel: ['', Validators.required],
      subject: [''],
      description: [''],
      organizationIssued: [''],
      keyword: [''],
      inforSign: [''],
      mode: [''],
      autograph: [''],
      profile: ['', Validators.required],
      computerFileId:['', Validators.required],
      organID: ['', Validators.required],
      tabOfContID: ['', Validators.required],
      fontID: ['', Validators.required],
      gearBox: ['', Validators.required],
      signature: ['']
      // addressDetail: ['']
    });
    this.subscription = this.route.params.subscribe((params) => {
      if(this.route.url){
        if(this.route.snapshot.routeConfig.path === "taiLieuPdf/profileId/:id"){
          this.document.fileId = params['id'];
          this.onProfileChange(this.document.fileId);
          this.getFillDataByProfileID(this.document.fileId);
        }
        else{
          this.documentId = params['id'];
        }
      }
    });

    this.danhmucService.getAllCoQuan()
      .subscribe((result) => {
        
        if (result != undefined) {
          var organList = [];
          for (var item of result.itemList) {
            var temp = { id: item.organID, text: item.tenCoQuan };
            organList.push(temp);
          }
          this.lstOrgan = organList;
          
          // if(this.lstOrgan != null){
          //   this.organID = this.lstOrgan[0].id;
          // }
          // else 
          //   this.organID = 0;
        }
      },
        (error) => {
          console.log(error);
        }, () => {
        });
    
    this.taiLieuService.getDocumentTypeList()
      .subscribe((result) => {
        
        if (result != undefined) {
          var documentTypeList = [];
          for (var item of result.itemList) {
            var temp = { id: item.documentTypeId.toString(), text: item.typeName };
            documentTypeList.push(temp);
          }
          this.documentTypeList = documentTypeList;
        }
        },
        (error) => {
          console.log(error);
        }, () => {
        });

    this.taiLieuService.getLanguageList()
      .subscribe((result) => {
        var languageList = [];
        for (var item of result.itemList) {
          var temp = { id: item.languageId, text: item.languageName }
          languageList.push(temp);
        }

        this.languageList = languageList;
      },
        (error) => {
          console.log(error);
          setTimeout(() => {
            alert("Lấy dữ liệu về ngôn ngữ thất bại. Lỗi: " + JSON.stringify(error));
          }, 1000);
        },
        () => {

        });
    this.taiLieuService.getFormatList()
      .subscribe((result) => {
        var formatList = [];
        for (var item of result.itemList) {
          var temp = { id: item.formatId, text: item.formatName }
          formatList.push(temp);
        }

        this.formatList = formatList;
      },
        (error) => {
          console.log(error);
          setTimeout(() => {
            alert("Lấy dữ liệu về tình trạng vật lý thất bại. Lỗi: " + JSON.stringify(error));
          }, 1000);
        },
        () => {

        });
    this.taiLieuService.getConfidenceLevelList()
      .subscribe((result) => {
        var confidenceLevelList = [];
        for (const item of result.itemList) {
          var temp = { id: item.confidenceLevelId, text: item.confidenceLevelName }
          confidenceLevelList.push(temp);
        }

        this.confidenceLevelList = confidenceLevelList;
      },
        (error) => {
          console.log(error);
          setTimeout(() => {
            alert("Lấy dữ liệu về mức độ bảo mật thất bại. Lỗi: " + JSON.stringify(error));
          }, 1000);
        },
        () => {

        });
    // edit
    if (this.documentId != null) {
      this.taiLieuService.getDocumentById(this.documentId)
            .subscribe((result) => {
                if (result.isSuccess) {
                  $.ajaxSetup({ cache: false });
                  const document : Document = result.item;
                  this.document = document;
                  this.issuedDate = document.issuedDate.toString().split('T')[0];
                  var url = ApiUrl.endpoint + result.item.clientUrl;
                  this.pdfSrc = url;
                  if (this.document !== undefined &&
                    this.document.signature === 1 && 
                    this.document.documentId !== undefined &&
                    this.document.documentId !== null)
                  {
                    this.checked = true;
                    this.IdSecure = true;
                  }
                  
                  this.onOrganChange(document.organId);
                }
                else {
                  this.toastr.info(result.errorMessage, "Thông báo");
                }
            }, 
            (error) => {
              console.log(error);
            }, 
            () => {

            });
      this.isEdit = true;
    }
  }
  clear() {
    this.document.documentCode = '';
    this.document.computerFileId = undefined;
    this.document.codeNumber = '';
    this.document.docOrdinal = undefined;
    this.document.codeNotation = '';
    this.document.pageAmount = undefined;
    this.document.subject = '';
    this.document.description = '';
    this.document.inforSign = '';
    this.document.keyword = '';
    this.document.mode = '';
    this.document.autograph = '';
    this.checked = false;
    this.loadingSignature = false;
    this.hasImage = false;
    this.submitted = false;
  }

  get formControl() {
    return this.form.controls;
  }
  save(value : string) {
    this.submitted = true;
    if (this.form.invalid) { return; }
    if (value == 'save') {
      this.saveLoading = true;
    }
    else {
      this.continueLoading = true;
    }
    this.loading = true;
    if (this.isEdit) {
      this.taiLieuService.updateDocument(this.document, this.checked, this.imageSrc, this.document.clientUrl)
        .subscribe((result) => {
          if(result.errorCode != '0'){
            alert("Lỗi: " + result.errorCode +". Mess: " + result.errorMessage);
          }
          else {
            // do something
            
            if (value == 'save') {
              this.saveLoading = false;
              jQuery.ajaxSetup({ cache: false });
              window.location.href = '#/QuanLyTaiLieu/taiLieu';
            }
            else {
              this.continueLoading = false;
            }
            this.activeModal.dismiss("Update successfully.");
            this.onSaveSuccess("Chỉnh sửa thành công");
          } 
          },
          (error) => {
            console.log(error);
            // this.onSaveError();
          },
          () => {
            //jQuery.ajaxSetup({ cache: false });
          });
    }
    else {
      this.taiLieuService.createDocument(this.document, this.checked, this.imageSrc, this.document.serverPath)
        .subscribe((result) => {
          if (result.isSuccess) {
            this.onSaveSuccess("Thêm mới thành công");
            this.clear();
            if (value == 'save') {
              this.saveLoading = false;
              jQuery.ajaxSetup({ cache: false });
              window.location.href = '#/QuanLyTaiLieu/taiLieu';
            }
            else {
              this.continueLoading = false;
              //this.onGearBoxChange(this.gearBoxId);
              this.pdfSrc = undefined;
              // for(let i = 0; i < this.computerFileList.length; i ++) {
              //   if (this.document.computerFileId == this.computerFileList[i].fileId) {
              //     this.computerFileList.splice(i, 1);
              //     break;
              //   }
              //   this.onProfileChange(this.document.fileId);
              // }
              // this.computerFileSelect2 = null;
              // this.onProfileChange(this.document.fileId);
            }
          }
          else {
            this.toastr.warning(result.errorMessage, "Thông báo");
          }
        },
          (error) => {
            console.log(error);
            setTimeout(() => {
              this.toastr.warning("Thêm mới thất bại, vui lòng thử lai.", "Thông báo");
              this.continueLoading = false;
            }, 5000);
          }, () => {
            // do something
            //jQuery.ajaxSetup({ cache: false });
            this.computerFileSelect2 = null;
            this.onProfileChange(this.document.fileId);
          });
    }
  }
  onSaveSuccess(message: string) {
    this.toastr.success(message);
  }
  onSaveError(message) {
    this.toastr.success(message);
  }
  ngOnDestroy(): void {

  }
  getFillDataByProfileId(profileId : number){

  }
  onOrganChange(organID : any){
    // if organ select2 box is changed, set value of its child to empty
    var params = organID;
    if(params == undefined || params == null || params == "")
      params  = this.organID;
    else{
      this.hopsoService.getFontByOrganId(params)
      .subscribe((data) => {
        if (data != undefined && data.length != 0) {
            var phongs = [];
            for (const item of data) {
              var temp = { id: item.fontID, text: item.fontName }
              phongs.push(temp);
            }
            this.lstFont = phongs;
            
            // if(this.lstFont != null){
            //   this.fontID = this.lstFont[0].id;
            // }
            // else 
            //   this.fontID = 0;
        }
        else{
          this.lstFont = [];
          this.lstDanhMuc = [];
        }
      },
      (error) => {
        this.lstFont = [];
        this.lstDanhMuc = [];
        alert("Lấy dữ liệu phông thất bại. Lỗi: " + JSON.stringify(error));
      },
      () => {
      });
    } 
  }

  getFillDataByProfileID(profileId : any){
    if(profileId != undefined && profileId != null && profileId != ""){
      this.hopsoService.getFillDataByProfileID(profileId)
      .subscribe((res) => {
        if (res != undefined && res != null 
          && res.item != undefined
          && res.item != null) {
            this.document.organId = res.item.organID != undefined ? res.item.organID : null;
            this.document.fontId = res.item.fontID != undefined ? res.item.fontID : null;
            this.document.tableOfContentId = res.item.tableOfContID != undefined ? res.item.tableOfContID : null;
            this.document.gearBoxId = res.item.gearBoxID != undefined ? res.item.gearBoxID : null;
        }
      },
      (error) => {
        alert("Lấy dữ liệu danh mục thất bại. Lỗi: " + JSON.stringify(error));
      },
      () => {
      });
    }
  } 
  onFontChange(fontID : any){
    // if font select2 box is changed, set value of its child to empty
    var params = fontID;
    if(params == undefined || params == null || params == "")
      params  = this.fontID;
    else{
      if(fontID != this.document.fontId){
        this.document.tableOfContentId = null;
        this.document.gearBoxId = null;
        this.document.fileId = null;
        this.document.computerFileId = null;
      }
      this.hopsoService.getTabByFontId(params)
      .subscribe((data) => {
        if (data != undefined && data.length !=0) {
          var danhmucs = [];
          for (const item of data) {
            var temp = { id: item.tabOfContID, text: item.tabOfContNumber }
            danhmucs.push(temp);
          }
          this.lstDanhMuc = danhmucs;
        }
        else{
          this.lstDanhMuc = [];
        }
      },
      (error) => {
        alert("Lấy dữ liệu danh mục thất bại. Lỗi: " + JSON.stringify(error));
      },
      () => {
      });
    }
  }

  onTableOfContentChange(tabOfContID : any){
    // if table of content select2 box is changed, set value of its child to empty
    var params = tabOfContID;
    if(params == undefined || params == null || params == "")
      params  = this.fontID;
    else{
      if(tabOfContID != this.document.tableOfContentId){
        this.document.gearBoxId = null;
        this.document.fileId = null;
        this.document.computerFileId = null;
      }
      if(this.documentId != null){
        this.hopsoService.getGearBoxByTabOfContForEditID(tabOfContID)
        .subscribe((data) => {
          if (data != undefined && data.itemList.length !=0) {
            var hopsos = [];
            for (const item of data.itemList) {
              var temp = { id: item.gearBoxID, text: item.gearBoxCode }
              hopsos.push(temp);
            }
            this.gearBoxList = hopsos;
          }
          else{
            this.gearBoxList = [];
          }
        },
        (error) => {
          alert("Lấy dữ liệu hộp số thất bại. Lỗi: " + JSON.stringify(error));
        },
        () => {
  
        });
      }
      else{
        this.hopsoService.getGearBoxByTableOfContentId(tabOfContID)
        .subscribe((data) => {
          if (data != undefined && data.itemList.length !=0) {
            var hopsos = [];
            for (const item of data.itemList) {
              var temp = { id: item.gearBoxID, text: item.gearBoxCode }
              hopsos.push(temp);
            }
            this.gearBoxList = hopsos;
          }
          else{
            this.gearBoxList = [];
          }
        },
        (error) => {
          alert("Lấy dữ liệu hộp số thất bại. Lỗi: " + JSON.stringify(error));
        },
        () => {
  
        });
      }
    }
  }
  onGearBoxChange(gearBoxId : any){
    var params = gearBoxId;
    if(params == undefined || params == null || params == "")
      params  = this.fontID;
    else
    {
      if(gearBoxId != this.document.gearBoxId){
        this.document.fileId = null;
        this.document.computerFileId = null;
      }
      this.hoSoService.getProfileByGearBoxId(gearBoxId)
      .subscribe((data) => {
        if(data.errorCode != '0') {
          this.toastr.info(data.errorMessage, "Thông báo");
        }
        else
        {
          if (data != undefined && data.itemList.length != 0) {
            var profileList = [];
            for (const item of data.itemList) {
              var temp = { id: item.profileId, text: item.fileCode }
              profileList.push(temp);
            }
            
            this.profileList = profileList;
          }
          else{
            this.profileList = [];
          }
        }
      },
      (error) => {
        alert("Lấy dữ liệu hồ sơ thất bại. Lỗi: " + JSON.stringify(error));
      },
      () => {
        // hoàn thành
        
      });
    }
  }

  onProfileChange(profileId : any){
    this.pdfSrc = null;
    var params = profileId;
    if(params == undefined || params == null || params == "")
    {
      params  = this.fontID;
    }
    else {
      this.hoSoService.getComputerFilesByProfileId(profileId)
      .subscribe((data) => {
        if(!data.isSuccess) {
          this.toastr.info(data.errorMessage, "Thông báo");
          this.computerFileSelect2 = null;
        }
        else
        {
          if(profileId != this.document.fileId){
            this.document.computerFileId = null;
          }
          if (data != undefined && data.itemList.length != 0) {
            //this.document.serverPath = data.item.clientUrl;
            var computerFileList = [];
            var files = [];
            if (!this.isEdit) {
              files = data.itemList.filter(item => item.status === 0);
            }
            else {
              files = data.itemList;
            }
            if (files.length > 0) {
              for (const item of files) {
                var temp = { id: item.fileId, text: item.fileName, path: item.url }
                computerFileList.push(temp);
                //this.computerFileList.push({fileId: item.fileId, url: item.url});
                this.computerFileList.push({fileId: item.fileId, url: item.clientUrl, pageNumber: item.pageNumber});
              }
              this.computerFileSelect2 = computerFileList;
            }
            else {
              this.computerFileSelect2 = [];
              this.toastr.info("Không còn file trong hồ sơ, vui lòng tải thêm file lên hoặc chọn hồ sơ khác.", "Thông báo");
            }
          }
          else {
            this.computerFileSelect2 = [];
          }
        }
      },
      (error) => {
        alert("Lấy dữ liệu danh sách file thất bại. Lỗi: " + JSON.stringify(error));
      },
      () => {
        // hoàn thành

      });
    }
  }
  
  getRoleByUserName() {
    this.userGroupService.getRoleName(this.userName)
    .subscribe((result) => {
        if (result.item.roleName.toLowerCase() === 'user') {
          this.roles = result.item.roleName.toLowerCase();
        }
        else {
          this.roles = 'admin';
        }
    }, 
    (error => {
      setTimeout(() => {
        alert("Lỗi: " + JSON.stringify(error));
      }, 5000);
    }),
    () => {
    })
  }

  onFileSelected(id?: any) {
    this.computerFileList.forEach((item) => {
      if(item.fileId == id){
        this.pdfSrc = ApiUrl.endpoint + item.url;
        this.document.pageAmount = item.pageNumber;
        this.document.serverPath = ApiUrl.endpoint + item.url;
        ;
      }
    });
  }

  exit() {
    window.location.href = '#/QuanLyTaiLieu/taiLieu';
  }

  getSignatureStatus() {
    if (this.checked === true) {
      this.loadingSignature = true;
      this.signatureService.signatureGetStatus()
        .subscribe((result) => {
          if (result.isSuccess) {
            this.signature = result.itemList.filter(item => item.status === 1);
            if (this.signature.length > 0) {
              this.loadingSignature = false;
              this.hasImage = true;
              this.imageSrc = ApiUrl.endpoint + this.signature[0].serverPath;
              //this.document.serverPath = this.signature[0].serverPath;
              //$(document).find("[data-page-number=1]").append(`<img class="image-preview" src="${this.imageSrc}" alt=""/>`)
            }
            else {
              this.loadingSignature = false;
              this.toastr.info("Vui lòng áp dụng một con dấu tài liệu trong mục quản lý con dấu tài liệu và thử lại.", "Thông báo");
              this.checked = false;
            }
          }
        }, (error) => {
          setTimeout(() => {
            this.toastr.error("Có lỗi xảy ra, vui lòng thử lại.", "Lỗi");
            this.loadingSignature = false;
          }, 5000);
        });
    }
    else {
      this.hasImage = false;
      this.imageSrc = "#";
    }
  }
  @HostListener('window:scroll', ['$event']) 
    scrollHandler(event) {

    }

  ngAfterContentInit() {
    $('body').append('<script src="script.js?'+Math.random()+'"></script>');
    this._compiler.clearCache();
  }
    displayDate(document : Document): void {
    if (this.isEdit == true) {

    }
  }
  
  ngAfterViewChecked(){
    
    if (this.isEdit == true) {
    
      this.setDocumentDate(this.issuedDate);
    }
    
  }
  setDocumentDate(issuedDate : string){
    if (this.issuedDate != undefined) {
      $(document).find('#issuedDate').val(this.issuedDate);
    }
  }
}
