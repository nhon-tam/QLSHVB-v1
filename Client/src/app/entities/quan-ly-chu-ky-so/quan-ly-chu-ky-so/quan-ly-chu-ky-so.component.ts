import { Component, OnInit } from '@angular/core';
import { BaseCondition } from '../../../common/BaseCondition';
import { Options } from 'select2';
import { Select2OptionData } from 'ng-select2';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DigitalSignature } from '../../../model/digital-signature.model';
import { QuanLyChuKySoService } from '../quan-ly-chu-ky-so.service';
import { FileUploader } from 'ng2-file-upload';
import { JsonPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { removeSummaryDuplicates } from '@angular/compiler';
import { ChuKySoPopupService } from '../chu-ky-so-popup-service.service';
import { ChuKySoDeletePopupComponent } from '../chu-ky-so-delete-popup/chu-ky-so-delete-popup.component';
import { ChuKySoUpdateStatusPopupComponent } from '../chu-ky-so-update-status-popup/chu-ky-so-update-status-popup.component';

@Component({
  selector: 'app-quan-ly-chu-ky-so',
  templateUrl: './quan-ly-chu-ky-so.component.html',
  styleUrls: ['./quan-ly-chu-ky-so.component.css']
})
export class QuanLyChuKySoComponent implements OnInit {
  signature: DigitalSignature[] = new Array<DigitalSignature>();

  imgSrc: string | ArrayBuffer;
  options: Options;
  organNameArr: Array<Select2OptionData>;
  page = 1;
  pageSize = 5;
  totalRecords: number = 0;
  form: FormGroup;
  submitted = false;
  loading = false;
  errorMessageFileUpload: string = '';
  error = false;
  condition: BaseCondition<DigitalSignature> = new BaseCondition<DigitalSignature>();

  public uploader : FileUploader = new FileUploader({
    isHTML5: true
  });

  constructor (
    private formBuilder: FormBuilder,
    private service: QuanLyChuKySoService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private popup: ChuKySoPopupService
    ) {
        this.service.listen()
          .subscribe((m : any) => {
            this.loadPages(this.page);
          });
      }

  ngOnInit() {
    this.organNameArr = new Array<Select2OptionData>();
    this.options = {
      width: "100%",
      closeOnSelect: true,
      multiple: false,
      tags: false,
      theme: 'classic'
    }
    this.form = this.formBuilder.group({
    //  organName: ['', Validators.required],
      file: [undefined, Validators.required]
    });
    this.getPaging();
  }

  openDeleteDialog(id: any) {
    this.popup.open(ChuKySoDeletePopupComponent as Component, id);
  }

  onFileSelected() {
    this.error = false;
    console.log(this.uploader.queue[0]._file);
    let $img: any = document.querySelector('#file');
    var seft = this;
    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();
      reader.readAsDataURL($img.files[0]);
      console.log($img.files[0].type);
      var fileExtension = $img.files[0].type.toString().split('/')[1];
      if (fileExtension !== 'png') {
        $('#file:file').val('');
        $(document).find('#image').attr('src', '#');
      //  this.errorMessageFileUpload = "Ch??? ch???p nh???n ?????nh d???ng .png, vui l??ng th??? l???i.";
        $(document).find('#image-upload .error').html('Ch??? ch???p nh???n ?????nh d???ng .png, vui l??ng th??? l???i.');
        this.uploader.clearQueue();
        return;
      }
      
      reader.onload = (e: any) => {
        var image = new Image();
        image.src = e.target.result;
        image.onload = () => {
          if (image.height == 150 && image.width == 150) {
            $('#image').attr('src', e.target.result);
            $(document).find('#image-upload .error').html('');
          }
          else {
            $(document).find('#image').attr('src', '#');
            $('#file:file').val('');
            $(document).find('#image-upload .error').html('Ch??? ???????c upload file c?? k??ch th?????c ti??u chu???n 150x150 (px), vui l??ng th??? l???i.');
            this.uploader.clearQueue();
            return;
          }
        };
      };
    }  
  }

  get f() {
    return this.form.controls;
  }

  uploadSubmit () {
      let fileItem = this.uploader.queue[0]._file;
      if(fileItem.size > 5000000) {
        alert("File n??n c?? k??ch th?????c nh??? h??n 5Mb.");
        return;
      }
      var data = new FormData();
      data.append('file', fileItem);
      data.append('fileSeq', 'seq_0');
      data.append('dataType', fileItem.type.split('/')[1]);
      return data;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.f);
    if (this.form.invalid || $('#image').attr('src') == '#') {
      this.uploader.clearQueue();
      this.error = true; 
      return; 
    }
    
    this.loading = true;
    var object : DigitalSignature = new DigitalSignature();
    var _file = this.uploader.queue[0]._file;
    object.fileName = _file.name;
    object.createBy = "admin";
    object.size = _file.size.toString();
    var formData = new FormData();
    formData = this.uploadSubmit();
    formData.append('signatureInfo', JSON.stringify(object));
    this.service.signatureCreate(formData)
      .subscribe((result) => {
        if (result.isSuccess && result.errorCode == "0") {
          this.onClose();
          this.loading = false;
          this.toast.success("Th??m m???i con d???u t??i li???u th??nh c??ng", "Th??ng b??o");
          this.clearQueueAndInput();
        }
        else {
          if (result.errorCode == "-2") {
            if(confirm("T???n t???i con d???u t??i li???u tr??n h??? th???ng:\n" + result.returnValue + ".\nVui l??ng ch???n OK ????? ti???n h??nh ghi ????, ch???n Cancel ????? h???y b???.")) {
              this.loading = true;
              formData.append('overwrite', "1");
              this.service.signatureCreate(formData)
                .subscribe((result) => {
                  if (result.isSuccess) {
                    this.loading = false;
                    this.toast.info("Ghi ???? con d???u t??i li???u th??nh c??ng", "Th??ng b??o");
                    this.onClose();
                    this.clearQueueAndInput();
                  }
                  else {
                    this.loading = false;
                    this.toast.error("Ghi ???? con d???u t??i li???u th???t b???i", "Th??ng b??o");
                  //  this.onClose();
                    this.clearQueueAndInput();
                  }
                }, (error) => {
                  this.loading = false;
                  this.toast.error("Ghi ???? con d???u t??i li???u th???t b???i", "Th??ng b??o");
                },
                () => {

                })
            }
          }
          else {
            this.loading = false;
            this.toast.error("Th??m m???i con d???u t??i li???u th???t b???i", "Th??ng b??o");
            this.clearQueueAndInput();
          }
          
        }
      }, (error) => {
        this.loading = false;
        this.toast.error("Th??m m???i con d???u t??i li???u th???t b???i", "Th??ng b??o");
        this.clearQueueAndInput();
      },
      () => {

      })
  }

  clearQueueAndInput () {
    this.uploader.clearQueue();
    $('#file:file').val('');
    $(document).find('#image').attr('src', '#');
  }

  getPaging() {
    this.showSpinner("dataTable", "timer", "0.8");
      this.service.signatureGetPaging()
      .subscribe((result) => {
        this.signature = result.itemList;
        this.page = 1;
        this.pageSize = 5;
        this.totalRecords = result.totalRows;
      }, (error) => {
        setTimeout(() => {
          alert(JSON.stringify(error));
          this.hideSpinner("dataTable");
        }, 5000);
      }, () => {
        this.hideSpinner("dataTable");
      });
    }

    loadPages(page : number) {
      this.showSpinner("paging", "ball-spin-clockwise", "0.2");
      this.condition.PageIndex = page;
      this.service.signatureGetPaging(this.condition)
        .subscribe((result) => {
          this.signature = result.itemList;
          this.page = page;
          this.pageSize = 5;
          this.totalRecords = result.totalRows;
        }, (error) => {
          setTimeout(() => {
            alert(JSON.stringify(error));
            this.hideSpinner("paging");
          }, 5000);
        }, () => {
          this.hideSpinner("paging");
        });
    }

    showSpinner (name?: string, type?: string, opacity? : string) {
      this.spinner.show(
        name,
        {
          type: `${type}`,
          size: 'small',
          bdColor: `rgba(255,255,255, ${opacity})`,
          color: 'rgb(0,191,255)',
          fullScreen: false
        }
      );
    }
  
    hideSpinner (name? : string) {
      setTimeout(() => {
        this.spinner.hide(name);
      }, 100);
    }

    openUpdateDialog(id : any, status?: any) {
        this.popup.open(ChuKySoUpdateStatusPopupComponent as Component, id);
    }

    onClose() {
      this.service.filter('Register click');
    }
}
