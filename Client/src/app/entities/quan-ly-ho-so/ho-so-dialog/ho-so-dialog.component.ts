import { Component, OnInit, AfterContentInit } from '@angular/core';
import { HoSo } from '../../../model/ho-so.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyHoSoPopupService } from '../quan-ly-ho-so-popup.service';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { QuanLyHoSoService } from '../quan-ly-ho-so.service';
import { FileUpload } from '../../../model/file.model';
import { BaseCondition } from '../../../common';
import { HtmlParser } from '@angular/compiler';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BaseCdkCell } from '@angular/cdk/table';
import { Alert } from '../../../containers/_alert';
import { Rights, Languages } from '../../../common/Variables';
import { QuanLyHopSoService } from '../../quan-ly-hop-so/quan-ly-hop-so.service';
import { QuanLyDanhMucService } from '../../quan-ly-danh-muc/quan-ly-danh-muc.service';
import { QuanLyTaiLieuService } from '../../quan-ly-tai-lieu/quan-ly-tai-lieu.service';

@Component({
  selector: 'app-ho-so-dialog',
  templateUrl: './ho-so-dialog.component.html',
  styleUrls: ['./ho-so-dialog.component.css']
})
export class HoSoDialogComponent implements OnInit, AfterContentInit {
  page = 1;
  pageSize: number = 10;
  totalRecords: number;
  hoso: HoSo;
  date: Date;
  lstOrgan: Array<Select2OptionData>;
  lstFont: Array<Select2OptionData>;
  lstDanhMuc: Array<Select2OptionData>;
  isSelectAll: boolean;
  public uploader : FileUploader = new FileUploader({
    isHTML5: true
  });
  public fileTemp : FileUploader = new FileUploader({
    isHTML5: true
  });
  // lấy danh sách file sau khi đã tải file lên trước đó
  public uploaderAfterChange : FileUploader = new FileUploader ({
    isHTML5: true
  })
  options: Options;
  profileTypeList: Array<Select2OptionData>;
  fileNotationList: Array<Select2OptionData>;
  gearBoxTitleList: Array<Select2OptionData>;

  allGearBox: Array<Select2OptionData>;
  allProfileType: Array<Select2OptionData>;
  allRights: Array<Select2OptionData>;
  languages: Array<Select2OptionData>;
  physicalStates: Array<Select2OptionData>;

  isOverwrite: boolean = false;
  profile: HoSo = new HoSo();
  isUpdate: boolean = false;

  form : FormGroup;
  submitted = false;
  loading = false;
  organId: any;
  fontId: any;
  tableOfContentId: number;

  constructor (
   public activeModal: NgbActiveModal,
   private hoSoPopupService: QuanLyHoSoPopupService,
   private toastr: ToastrService,
   private service: QuanLyHoSoService,
   private formBuilder: FormBuilder,
   private hopsoService: QuanLyHopSoService,
   private danhmucService: QuanLyDanhMucService,
   private taiLieuService : QuanLyTaiLieuService,
  )
  {
    this.profileTypeList = new Array<Select2OptionData>();
    this.fileNotationList = new Array<Select2OptionData>();
    this.gearBoxTitleList = new Array<Select2OptionData>();
    this.allGearBox = new Array<Select2OptionData>();
    this.allProfileType = new Array<Select2OptionData>();
    this.allRights = new Array<Select2OptionData>();
    this.languages = new Array<Select2OptionData>();
    this.hoso = new HoSo();
    this.hoso.profileId = undefined;
    this.options = {
      theme: 'classic',
      width: '100%'
    }
    this.isSelectAll = false;
    this.page = 1;
    this.pageSize = 10;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      organId: ['', Validators.required],
      tableOfContentId: ['', Validators.required],
      fontId: ['', Validators.required],
      gearBox: ['', Validators.required],
      fileCode: ['', Validators.required],
      title: ['', Validators.required],
      fileNotation: ['', Validators.required],
      profileTypeId: [''],
      maintenance: ['', Validators.required],
      rights: [''],
      languageId: [''],
      startDate: [undefined, Validators.required],
      endDate: [undefined],
      totalDoc: [''],
      description: [''],
      inforSign: [''],
      keyWord: [''],
      pageNumber: ['', Validators.required],
      sheetNumber: ['', Validators.required],
      physicalStateId: ['']
    })
    this.getAddNew();
    if (this.hoSoPopupService.profile != undefined) {
      this.isUpdate = true;
      this.hoso = this.hoSoPopupService.profile.item;
      this.organId = this.hoso.organId;
      this.fontId = this.hoso.fontId;
      this.tableOfContentId = this.hoso.tableOfContentId;
    }
    else if(this.hoSoPopupService.gearBoxID != 0){
      this.hoso.gearBoxId = this.hoSoPopupService.gearBoxID;
      this.FillDataById(this.hoso.gearBoxId);
    }

    this.getAllOrgan();
    this.getLanguages();
    this.getPhysicalStates();
    this.loadPages(this.page, this.pageSize);
  }

  get f() {
    return this.form.controls;
  }
  FillDataById(gearBoxId: number){
    if(gearBoxId != undefined && gearBoxId != null && gearBoxId.toString() != ""){
      this.hopsoService.getHopSoById(gearBoxId)
      .subscribe((res=>{
          if(res != undefined && res != null && res.item != undefined){
            this.hoso.tableOfContentId = res.item.tabOfContID != undefined ? res.item.tabOfContID : null;
            this.hoso.fontId = res.item.fontID != undefined ? res.item.fontID : null;
            this.hoso.organId = res.item.organID != undefined ? res.item.organID : null;
          }
      }));
    }
  }

  getPhysicalStates() {
    this.taiLieuService.getFormatList()
    .subscribe((result) => {
      var formatList = [];
      for (var item of result.itemList) {
        var temp = { id: item.formatId, text: item.formatName }
        formatList.push(temp);  
      }
      
      this.physicalStates = formatList;
    },
    (error) => {
      console.log(error);
      setTimeout(() => {
        alert("Lấy dữ liệu về tình trạng vật lý thất bại. Lỗi: " + JSON.stringify(error));
      }, 1000);
    },
    () => {
      
    });
  }
  getLanguages() {
    this.taiLieuService.getLanguageList()
    .subscribe((result) => {
      var languageList = [];
      for (var item of result.itemList) {
        var temp = { id: item.languageId, text: item.languageName }
        languageList.push(temp);
      }
      
      this.languages = languageList;
    },
    (error) => {
      console.log(error);
      setTimeout(() => {
        alert("Lấy dữ liệu về ngôn ngữ thất bại. Lỗi: " + JSON.stringify(error));
      }, 1000);
    },
    () => {
      
    });
    
  }
  uploadSubmit () {
    for (var i = 0; i < this.uploader.queue.length; i++) {
      let fileItem = this.uploader.queue[i]._file;
      if(fileItem.size > 100000000 && this.uploader.queue[i].isCancel) {
        alert("File nên có kích thước nhỏ hơn 100Mb.");
        return;
      }
    }
    var data = new FormData();
    for (var j = 0; j < this.uploader.queue.length; j++) {
      if(this.uploader.queue[j].isCancel){
        let fileItem = this.uploader.queue[j]._file;
        data.append('files', fileItem);
        data.append('fileSeq', 'seq'+j);
        data.append('dataType', fileItem.type.split('/')[1]);
      }
    }
    return data;
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }
  
  save() {
    this.submitted = true;
    if (this.form.invalid) return;
    console.log('Form submited');
    this.loading = true;

    var files = new FormData();
    if (this.uploader.queue.length > 0) {
      files = this.uploadSubmit();
    }
    else {
      files = undefined;
    }
    if (this.hoso.profileId == undefined) {
      if(files != undefined && files){
        this.service.insertSingleProfile(this.hoso, files)
        .subscribe((result) => {
          if (!result.isSuccess)
          {
            switch (result.errorCode) {
              case "-1": { // EXCEPTION
                this.toastr.error("Thêm mới thất bại, lỗi: " + result.errorMessage + ", vui lòng thử lại hoặc bấm Cancel để hủy bỏ.");
                break;
              }
              case "-2": { // OVERWRITE
                  var lstFilesAlreadyExists : string[] = new Array<string>();
                  var arrFileName: string[] = new Array<string>();
                  if (result.returnValue && result.returnValue != undefined) {
                    lstFilesAlreadyExists = JSON.parse(result.returnValue);
                    for (const file of lstFilesAlreadyExists) {
                      let fileNameArr = file.split('\\');
                      let fileName = fileNameArr[fileNameArr.length -1];
                      arrFileName.push(fileName);
                    }
                  }
  
                  if (confirm(`Tồn tại file đã được upload trên hệ thống, chọn OK để tiến hành ghi đè file đã tồn tại bằng file mới, chọn Cancel để hủy bỏ.
                  \nDanh sách file đã tồn tại:\n${
                    arrFileName.toString().split(',').join('\n')
                  }`)) {
                    files = this.uploadSubmit();
                    files.append('overwrite', 'accept');
                    this.service.insertSingleProfile(this.hoso, files)
                      .subscribe((result) => {
                        if (result.isSuccess) {
                          this.isOverwrite = true;
                        }
                        else {
                          this.toastr.error("Ghi đè file thất bại, vui lòng kiểm tra và thử lại.", "Thông báo"); 
                        }
                      },
                      (error) => {
                        console.log(error);
                      },
                      () => {
                        if (this.isOverwrite) {
                          this.activeModal.dismiss('success');
                          this.toastr.info(`Ghi đè ${lstFilesAlreadyExists.length} file thành công`, "Thông báo");
                          this.toastr.info("Bạn vừa tải lên " + this.uploader.queue.length + " file.", "Thông báo");
                          this.uploader.clearQueue();
                        }
                      });
                  }
                  else {
                    this.toastr.error("Ghi đè file thất bại, vui lòng kiểm tra và thử lại.", "Thông báo");
                  }
                break;
              }
              case "-3": { // EXISTS
                this.toastr.warning("Đã tồn tại hồ sơ có mã hồ sơ: " 
                + this.hoso.fileCode + 
                " trên hệ thống, vui lòng thử lại hoặc bấm Cancel để hủy bỏ. Hoặc mở mục sửa thông tin hồ sơ để cập nhật file cho hồ sơ này!!!");
                break;
              }
              default: {
                this.toastr.error("Thêm mới thất bại, lỗi: " + result.errorMessage + ", vui lòng thử lại hoặc bấm Cancel để hủy bỏ.")
                break;
              }
            }
          }
          else {
            // toàn file mới
            if (this.uploader.queue.length > 0) {
              this.toastr.info("Bạn vừa tải lên " + this.uploader.queue.length + " file.", "Thông báo");
            }
            this.uploader.clearQueue();
            this.clear();
            this.success("Thêm mới hồ sơ thành công", "Thêm mới hồ sơ");
          }
        },
        (error) => {
          console.log(error);
          this.toastr.error("Thêm mới thất bại", "Thông báo");
        },
        () => {
          this.onClose();
        });
      }
      else{
        this.toastr.error("Tệp tin tải lên không được để trống");
      }
    }
    else {
      if(files != undefined && files){
        this.service.updateSingleProfile(this.hoso, files)
        .subscribe((result) => {
  
          if (!result.isSuccess) {
            switch (result.errorCode) {
              case "-1": {
                this.toastr.error("Cập nhật thất bại, lỗi: " + result.errorMessage + ", vui lòng thử lại hoặc bấm Cancel để hủy bỏ.");
                break;
              }
              case "-2": {
                  var lstFilesAlreadyExists : string[] = new Array<string>();
                  var arrFileName: string[] = new Array<string>();
                  if (result.returnValue && result.returnValue != undefined) {
                    lstFilesAlreadyExists = JSON.parse(result.returnValue);
                    for (const file of lstFilesAlreadyExists) {
                      let fileNameArr = file.split('\\');
                      let fileName = fileNameArr[fileNameArr.length -1];
                      arrFileName.push(fileName);
                    }
                  }
                  if (confirm(`Tồn tại file đã được upload trên hệ thống, chọn OK để tiến hành ghi đè file đã tồn tại bằng file mới, chọn Cancel để hủy bỏ.
                  \nDanh sách file đã tồn tại:\n${
                    arrFileName.toString().split(',').join('\n')
                  }`)) {
                    files = this.uploadSubmit();
                    files.append('overwrite', 'accept');
                    this.service.updateSingleProfile(this.hoso, files)
                      .subscribe((result) => {
                        if (result.isSuccess) {
                          
                          this.isOverwrite = true;
                        }
                        else {
                        //  console.log(result);
                          this.toastr.error("Ghi đè file thất bại, vui lòng kiểm tra và thử lại.", "Thông báo");
                        }
                      },
                      (error) => {
                        console.log(error);
                      },
                      () => {
                        if (this.isOverwrite) {
                          this.activeModal.dismiss('success');
                          this.toastr.info(`Ghi đè ${lstFilesAlreadyExists.length} file thành công`, "Thông báo");
                          this.toastr.info("Bạn vừa tải lên " + this.uploader.queue.length + " file.", "Thông báo");
                          this.uploader.clearQueue();
                          this.onClose();
                        }
                      });
                  }
                  else {
                    this.toastr.error("Ghi đè file thất bại, vui lòng kiểm tra và thử lại.", "Thông báo");
                  }
                break;
              }
              default:
              {
                this.toastr.error("Cập nhật thất bại, lỗi: " + result.errorMessage + ", vui lòng thử lại hoặc bấm Cancel để hủy bỏ.");
                break;
              }
            }
          }
          else {
            // toàn file mới
            if (this.uploader.queue.length > 0) {
              this.toastr.info("Bạn vừa tải lên " + this.uploader.queue.length + " file.", "Thông báo");
            }
            this.uploader.clearQueue();
            this.success("Cập nhật hồ sơ thành công", "Cập nhật hồ sơ");
            this.clear();
            this.onClose();
          }
        },
        (error) => {
          console.log(error);
          this.toastr.error("Cập nhật thông tin hồ sơ thất bại, vui lòng thử lại", "Thông báo");
        },
        () => {
        });
      }
    }

  }

  update() {

  }

  success(message : string, title?: string){
    this.toastr.success(message, title);
  }

  // xóa những file đã được upload trước đó, không cho phép upload trùng lặp
  fileInputChange(value : any) {
    this.isSelectAll = false;
    this.updateSelectAllItem();
    for (var i = 0; i < this.uploader.queue.length - 1; i ++) {
      var fileItem1 = this.uploader.queue[i].file;
      for (var j = i + 1; j < this.uploader.queue.length; j ++) {
        var fileItem2 = this.uploader.queue[j].file;
        if (fileItem1.name == fileItem2.name) {
          this.uploader.queue[j].remove();
          j--;
        }
      }
    }
    this.removeFilesWithFormatOtherThanPdf();
    this.totalRecords =  this.uploader.queue.length;
    this.loadPages(this.page, this.pageSize);
  }

  removeFilesWithFormatOtherThanPdf(){
    var length = this.uploader.queue.length;
    for(let i = 0; i < length; i ++) {
      if(this.uploader.queue[i] != null){
        if(!this.uploader.queue[i].file.type.includes("/pdf")){
          this.uploader.queue[i].remove();
          i--;
        }
        if(this.uploader.queue.length == 0){
          break;
        }
      }
    }
  }

  getAddNew () {
    this.allRights = Rights;
    this.languages = Languages;
    this.service.getAllGearBoxAndProfileType()
      .subscribe((result) => {
        var arrGearBox = [];
        // for (const item of result.lstGearBox) {
        //   var temp = { id: item.gearBoxID, text: item.gearBoxTitle }
        //   arrGearBox.push(temp);
        // }
        // this.allGearBox = arrGearBox;
        arrGearBox = [];
        for (const item of result.lstProfileTypes) {
          var temp = { id: item.profileTypeId, text: item.profileTypeName }
          arrGearBox.push(temp);
        }
        this.allProfileType = arrGearBox;
      }, (error) => {
        console.log(error);
      },
      () => {

      });
  }
  ngAfterContentInit(): void {
    if (this.isUpdate) {
      var startDate = this.hoso.startDate.toString().split('T')[0];
      var endDate = this.hoso.endDate.toString().split('T')[0];
    }
    
    function getDateValue (startDate : string, endDate : string) {
      if (startDate != undefined && endDate != undefined) {
        $(document).find('#date-input-start').val(startDate);
        $(document).find('#date-input-end').val(endDate);
      }
    }
    function getDate () {
      let str : string = '';
      let today : Date = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); 
      let yyyy = today.getFullYear();
      //  this.date = new Date(yyyy + '-' + mm + '-' + dd);
      str = yyyy + '-' + mm + '-' + dd;
      return str;
    }
    $(document).ready(function () {
      getDateValue(startDate, endDate);
    });

  }
  onClose() {
    this.service.filter('Register click');
  }

  onOrganChange(organID : any){
    // if organ select2 box is changed, set value of its child to empty
    if (organID != this.organId && this.isUpdate) {

    }
    var params = organID;
    if(params == undefined || params == null || params == "")
        params  = this.organId;
    else {
      if(organID != this.hoso.organId){
        this.hoso.fontId = null;
        this.hoso.tableOfContentId = null;
        this.hoso.gearBoxId = null;
      }
      this.hopsoService.getFontByOrganId(params)
      .subscribe((data) => {
        if (data != undefined && data.length != 0) {
            var phongs = [];
            for (const item of data) {
              var temp = { id: item.fontID, text: item.fontName }
              phongs.push(temp);
            }
            this.lstFont = phongs;
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
  onFontChange(fontID : any){
    // if font select2 box is changed, set value of its child to empty
    this.lstDanhMuc = null;
    var params = fontID;
    if (params == undefined || params == null || params == "")
    {

      params  = undefined;
      this.lstDanhMuc = null;
      return;
    }
    else {
      if(fontID != this.hoso.fontId){
        this.hoso.tableOfContentId = null;
        this.hoso.gearBoxId = null;
      }
      this.hopsoService.getTabByFontId(params)
      .subscribe((data) => {
        if (data != undefined && data.length != 0) {
          var danhmucs = [];
          for (const item of data) {
            var temp = { id: item.tabOfContID, text: item.tabOfContNumber }
            danhmucs.push(temp);
          }
          this.lstDanhMuc = danhmucs;
        }
        else {
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
        params  = this.fontId;
    else {
      if(tabOfContID != this.hoso.tableOfContentId){
        this.hoso.gearBoxId = null;
      }
      this.hopsoService.getGearBoxByTableOfContentId(tabOfContID)
      .subscribe((data) => {
        if (data != undefined && data.itemList.length !=0) {
          var hopsos = [];
          for (const item of data.itemList) {
            var temp = { id: item.gearBoxID, text: item.gearBoxCode }
            hopsos.push(temp);
          }
          this.allGearBox = hopsos;
        }
        else{
          this.allGearBox = [];
        }
      },
      (error) => {
        alert("Lấy dữ liệu hộp số thất bại. Lỗi: " + JSON.stringify(error));
      },
      () => {

      });
    }
  }
  public getAllOrgan() {
    this.danhmucService.getAllCoQuan()
      .subscribe((result) => {
        
        if (result != undefined) {
          var organList = [];
          for (var item of result.itemList) {
            var temp = { id: item.organID, text: item.tenCoQuan };
            organList.push(temp);
          }
          this.lstOrgan = organList;
        }
      },
        (error) => {
          console.log(error);
        },
        () => {

        });
  }

  
  loadPages(page : number, pageSize: number) {
    this.fileTemp = new FileUploader({
      isHTML5: true
    });
    this.page = page;
    this.pageSize = pageSize || 10;
    var length = 0;
    if(page == 1){
      if(10 < this.totalRecords){
        length = 10;
      }else {
        length = this.totalRecords;
      }
      for(let i = 0; i < length; i++) {
        if(this.uploader.queue[i]){
          this.fileTemp.queue.push(this.uploader.queue[i]);
        }
      }
    }
    else{
      if(((page - 1)*pageSize + 10) < this.totalRecords){
        length = (page - 1)*pageSize + 10;
      }else {
        length = this.totalRecords;
      }
      for(let i = (page - 1)*pageSize; i < length; i++) {
        if(this.uploader.queue[i]){
          this.fileTemp.queue.push(this.uploader.queue[i]);
        }
      }
    }
  }

  selectAllFile(){
    if(this.isSelectAll){
      this.isSelectAll = false;
    }
    else{
      this.isSelectAll = true;
    }
    this.updateSelectAllItem();
  }

  updateSelectAllItem(){
    if(this.isSelectAll){
      this.uploader.queue.forEach(element => {
        element.isCancel = true;
      });  
    } 
    else{
      this.uploader.queue.forEach(element => {
        element.isCancel = false;
      });  
    }
  }

  SelectItem(isSelectItem: boolean, name: string){
    if(isSelectItem){
      this.uploader.queue.forEach(element => {
        if(element.file.name === name){
          element.isCancel = false;
        }
      });
    } 
    else{
      this.uploader.queue.forEach(element => {
        if(element.file.name === name){
          element.isCancel = true;
        }
      });  
    }
  }

  deleteItem(){
    var length = this.uploader.queue.length;
    for(let i = 0; i < length; i ++) {
      if(this.uploader.queue[i] != null){
        if(this.uploader.queue[i].isCancel == true){
          this.uploader.queue[i].remove();
          i--;
        }
        if(this.uploader.queue.length == 0){
          break;
        }
      }
    }
    this.totalRecords = this.uploader.queue.length;
    this.loadPages(this.page, this.pageSize);
  }

}
