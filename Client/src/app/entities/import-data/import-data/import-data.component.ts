import { Component, OnInit } from '@angular/core';
import { BaseCondition } from '../../../common/BaseCondition';
import { Options } from 'select2';
import { Select2OptionData } from 'ng-select2';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DigitalSignature } from '../../../model/digital-signature.model';
import { FileUploader } from 'ng2-file-upload';
import { JsonPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { removeSummaryDuplicates } from '@angular/compiler';
import { ImportDataService } from '../import-data.service';
import * as moment from 'moment';
import { saveAs } from 'file-saver';
import { CoQuan } from '../../../model/co-quan.model';
import { Phong } from '../../../model/phong.model';
import { QuanLyPhongService } from '../../quan-ly-phong/quan-ly-phong.service';
import { QuanLyDanhMucService } from '../../quan-ly-danh-muc/quan-ly-danh-muc.service';
import { ValidImport } from '../../../model/valid-Import.model';
import { DataValidation } from '../../../model/data-validation';

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.css']
})
export class ImportDataComponent implements OnInit {
  page = 1;
  pageSize: number = 10;
  totalRecords: number;
  signature: DigitalSignature[] = new Array<DigitalSignature>();
  validImport : ValidImport = new ValidImport();
  imgSrc: string | ArrayBuffer;
  options: Options;
  form: FormGroup;
  loading = false;
  errorMessageFileUpload: string = '';
  error = false;
  organList: Array<Select2OptionData>;
  fontList: Array<Select2OptionData>;
  validSuccessfully: boolean;
  public uploader : FileUploader = new FileUploader({
    isHTML5: true
  });
  dataValidations : DataValidation[] = new Array<DataValidation>();
  dataResponses : DataValidation[] = new Array<DataValidation>();

  constructor (
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private importDataService: ImportDataService,
    private phongService: QuanLyPhongService,
    private danhMucService: QuanLyDanhMucService,
    private toastr: ToastrService,
    ) {
        this.validSuccessfully = false;
        this.options = {
          multiple: false,
          theme: 'classic',
          closeOnSelect: true,
          width: "100%"
        }
        this.validImport = new ValidImport();
        this.page = 1;
        this.pageSize = 10;
      }

  ngOnInit() {
    this.loadFilterOptionsOrgan();
    this.form = this.formBuilder.group({
      organID: ['', Validators.required],
      fontID: ['', Validators.required]
    });
  }

  loadFilterOptionsOrgan () {
    this.phongService.getAllCoQuan()
      .subscribe((result) => {
        var arrTypes = [];
        var rs = result.itemList;
        for (const item of rs) {
          let value = { id: item.organID, text: item.tenCoQuan }
          arrTypes.push(value);
        }
        this.organList = arrTypes;
      }, 
      (error => {
        setTimeout(() => {
          alert("Lỗi: " + JSON.stringify(error));
          // this.hideSpinner("filterOptions");
        }, 5000);
      }),
      () => {
        // this.hideSpinner("filterOptions");
      })

      this.danhMucService.getAllPhong()
      .subscribe((result) => {
        if (result != undefined) {
          var phongs = [];
          for (var item of result.itemList) {
            var temp = { id: item.fontID, text: item.fontName };
            phongs.push(temp);
          }
          this.fontList = phongs;
        }
      },
      (error => {
        setTimeout(() => {
          alert("Lỗi: " + JSON.stringify(error));
          // this.hideSpinner("filterOptions");
        }, 5000);
      }),
      () => {
        // this.hideSpinner("filterOptions");
      })
  }

  fileInputChange(value : any) {
    this.dataResponses = new Array<DataValidation>();
    this.dataValidations = new Array<DataValidation>();
    if(this.uploader.queue.length > 1){
      this.validSuccessfully = false;
      this.uploader.queue[0].remove();
    }
  }

  downloadImportTemplate() {
    this.importDataService.DownloadImportTemplate().subscribe(response => {
      if(response) {
        if(response.type != undefined && response.type){
          var extension = response.type.split('/')[1];
          this.handleResponse(response, extension, "ImportTemplate");
        }
      }
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  save() {

  }

  validFileUpload() {
    this.page = 1;
    this.pageSize = 10;
    this.totalRecords = 0;
    if (this.form.invalid) return;
    var files = new FormData();
    if (this.uploader.queue.length > 0) {
      files = this.uploadSubmit();
    }
    else {
      files = undefined;
    }

    if (this.validImport.fontID != undefined && this.validImport.organID != undefined) {
      if(files != undefined && files){
        this.importDataService.validFileupload(this.validImport, files)
        .subscribe((result) => {
          if(result){
            this.validSuccessfully = result.isCorrect;
            this.dataResponses = result.dataValidationDTOs;
            if(this.dataResponses && this.dataResponses.length != 0){
              this.totalRecords = this.dataResponses.length;
              this.loadPages(this.page, this.pageSize);
            }
          }
        },
        (error) => {
          this.toast.error("Bạn phải chọn 1 tệp đúng theo mẫu để tiếp tục thực hiện!!!");
        },
        () => {
        });
      }
      else{
        this.toastr.error("Bạn phải chọn 1 tệp");
      }
    }
    else{
      this.toastr.error("Bạn phải chọn cơ quan và phông");
    }
  }

  handleResponse(data: any,extension: string, computerFileName : string) {
    var fileName = [];
    if(computerFileName != undefined && computerFileName){
      fileName = computerFileName.split('.');
      if(fileName.length != 0) {
        computerFileName = fileName[0];
      }
    }
    var originalFileName = this.getOriginalFileName(extension, computerFileName);
    saveAs(data, originalFileName);
  }

  getOriginalFileName(extension: string, computerFileName : string) {
    var originalFileName = '';
    originalFileName = computerFileName + "_" + moment(new Date()).format('DD/MM/YYYY') + ".xls";
    return originalFileName;
  }

  loadPages(page : number, pageSize: number) {
    this.dataValidations = new Array<DataValidation>();
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
        if(this.dataResponses[i]){
          this.dataValidations.push(this.dataResponses[i]);
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
        if(this.dataResponses[i]){
          this.dataValidations.push(this.dataResponses[i]);
        }
      }
    }
  }

  get f() {
    return this.form.controls;
  }

  uploadSubmit () {
      let fileItem = this.uploader.queue[0]._file;
      if(fileItem.size > 100000000) {
        alert("File nên có kích thước nhỏ hơn 100Mb.");
        return;
      }
      var data = new FormData();
      data.append('file', fileItem);
      data.append('fileSeq', 'seq_0');
      data.append('dataType', fileItem.type.split('/')[1]);
      return data;
  }

  clearQueueAndInput () {
    this.uploader.clearQueue();
    $('#file:file').val('');
    $(document).find('#image').attr('src', '#');
  }

}
