import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FilePopupService } from './file-popup-service.service';
import { FileUpload } from '../../../model/file.model';
import { ReturnResult, BaseCondition } from '../../../common';
import { QuanLyCoQuanService } from '../../quan-ly-co-quan/quan-ly-co-quan-service.service';
import { HoSo } from '../../../model/ho-so.model';
import { QuanLyHoSoService } from '../quan-ly-ho-so.service';
import { saveAs } from 'file-saver';
import * as moment from 'moment';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.css']
})
export class FileDetailsComponent implements OnInit {

  lstFiles: FileUpload[] = new Array<FileUpload>();
  result: ReturnResult<FileUpload> = new ReturnResult<FileUpload>();
  totalRecords: number;
  page : number = 1;
  pageSize: number = 5;
  condition: BaseCondition<HoSo> = new BaseCondition<HoSo>();
  constructor(private activeModal: NgbActiveModal, private popupService: FilePopupService, private hosoService: QuanLyHoSoService) { }

  ngOnInit(): void {
      this.result = this.popupService.result;
      this.lstFiles = this.result.itemList;
      this.totalRecords = this.result.totalRows;
  }

  cancel() {
    this.activeModal.dismiss('cancel');
  }

  loadPages(page : number) {
    var hoso: HoSo = new HoSo();
    hoso.profileId = this.lstFiles[0].profileId;
    this.condition.PageIndex = page;
    this.condition.PageSize = 5;
    this.condition.Item = hoso;
    this.hosoService.GetListFilesByProfileId(this.condition)
      .subscribe((result) => {
        this.lstFiles = result.itemList;
        this.totalRecords = result.totalRows;
        this.page = page;
      },
      (error) => {
        console.log(error);
      }, () => {

      });
  }

  downloadFileAttachment(fileId : number) {
    this.hosoService.DownloadProfileAttachment(fileId).subscribe(response => {
      if(response) {
        if(response.type != undefined && response.type){
          var extension = response.type.split('/')[1];
          this.handleResponse(response, extension);
        }
      }
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  handleResponse(data: any,extension: string) {
    var originalFileName = this.getOriginalFileName(extension);
    saveAs(data, originalFileName);
    if(extension === 'pdf'){
      var fileURL = URL.createObjectURL(data);
      window.open(fileURL);
    }
  }

  getOriginalFileName(extension: string) {
    var originalFileName = '';
    if(extension === 'pdf'){
      originalFileName = "FileHoSo" + moment(new Date()).format('DDMMMYYYY') + ".pdf";
    }
    else if(extension === 'csv' || extension === 'xlxs' ||
    extension === 'vnd.openxmlformatsofficedocument.spreadsheetml.sheet') {
      originalFileName = "FileHoSo" + moment(new Date()).format('DDMMMYYYY') + ".csv";
    }
    else if(extension === 'plain') {
      originalFileName = "FileHoSo" + moment(new Date()).format('DDMMMYYYY') + ".txt";
    }
    else {
      originalFileName = "FileHoSo" + moment(new Date()).format('DDMMMYYYY') + ".docx";
    }
    return originalFileName;
  }
}
