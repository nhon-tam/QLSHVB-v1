import { Component, OnInit } from '@angular/core';
import { Document } from '../../../model/document.model';
import { Subscription } from 'rxjs';
import { QuanLyTaiLieuService } from '../quan-ly-tai-lieu.service';
import { ActivatedRoute } from '@angular/router';
import { QuanLyHoSoService } from '../../quan-ly-ho-so/quan-ly-ho-so.service';
import * as moment from 'moment';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-tai-lieu-detail',
  templateUrl: './tai-lieu-detail.component.html',
  styleUrls: ['./tai-lieu-detail.component.css']
})
export class TaiLieuDetailComponent implements OnInit {
  document: Document;
  page = 1;
  private subscription: Subscription;
  private eventSubscriber: Subscription;
  constructor(
    private quanLyTaiLieuService: QuanLyTaiLieuService,
    private route: ActivatedRoute,
    private hosoService: QuanLyHoSoService
  ) {
    this.document = new Document();
   }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.load(params['id']);
    });
  }
  load(id : number) {
    this.quanLyTaiLieuService.getDocumentById(id)
      .subscribe((result) => {
        this.document = result.item;
      });
  }

  downloadFile(fileId : number, computerFileName : string) {
    this.hosoService.DownloadProfileAttachment(fileId).subscribe(response => {
      if(response) {
        if(response.type != undefined && response.type){
          var extension = response.type.split('/')[1];
          this.handleResponse(response, extension, computerFileName);
        }
      }
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
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
    if(extension === 'pdf'){
      var fileURL = URL.createObjectURL(data);
      window.open(fileURL);
    }
  }

  getOriginalFileName(extension: string, computerFileName : string) {
    var originalFileName = '';
    if(extension === 'pdf'){
      originalFileName = computerFileName + "_" + moment(new Date()).format('DD/MM/YYYY') +  ".pdf";
    }
    else if(extension === 'csv' || extension === 'xlxs' ||
    extension === 'vnd.openxmlformatsofficedocument.spreadsheetml.sheet') {
      originalFileName = computerFileName + "_" + moment(new Date()).format('DD/MM/YYYY') + ".csv";
    }
    else if(extension === 'plain') {
      originalFileName = computerFileName + "_" + moment(new Date()).format('DD/MM/YYYY') +  ".txt";
    }
    else {
      originalFileName = computerFileName + "_" + moment(new Date()).format('DD/MM/YYYY') +  ".docx";
    }
    return originalFileName;
  }
  


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
