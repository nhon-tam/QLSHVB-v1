import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import { HopSo } from '../../../model/hop-so.model';
import { CoQuan } from '../../../model/co-quan.model';
import { Phong } from '../../../model/phong.model';
import { QuanLyHopSoService } from '../../quan-ly-hop-so/quan-ly-hop-so.service';
import { Options } from 'select2';
import { QuanLyHoSoService } from '../../quan-ly-ho-so/quan-ly-ho-so.service';
import { ToastrService } from 'ngx-toastr';
import { QuanLyDanhMucService } from '../../quan-ly-danh-muc/quan-ly-danh-muc.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseCondition } from '../../../common/BaseCondition';
import { QuanLyTaiLieuService } from '../../quan-ly-tai-lieu/quan-ly-tai-lieu.service';
import { DocumentSearch } from '../../../model/document-search';
import { Document }from '../../../model/document.model';


@Component({
  selector: 'app-tra-cuu',
  templateUrl: './tra-cuu.component.html',
  styleUrls: ['./tra-cuu.component.css']
})
export class TraCuuComponent implements OnInit {
  lstOrgan: Array<Select2OptionData>;
  lstFont: Array<Select2OptionData>;
  lstDanhMuc: Array<Select2OptionData>;
  gearBoxList: Array<Select2OptionData>;
  profileList: Array<Select2OptionData>;
  documentTypeList: Array<Select2OptionData>;
  condition: BaseCondition<DocumentSearch>;
  documentSearch: DocumentSearch = new DocumentSearch();
  hopso: HopSo;
  organ: CoQuan;
  phong: Phong;
  organID: any;
  fontID: any;
  form: FormGroup;
  options: Options;
  documentTypeArr: string[];
  documents: Document[];
  totalRecords: number;
  pageSize: number;
  pageIndex: number;
  constructor(private hopsoService: QuanLyHopSoService,
    private hoSoService: QuanLyHoSoService, 
    private toastr: ToastrService,
    private danhmucService: QuanLyDanhMucService,
    private taiLieuService: QuanLyTaiLieuService,
    private formBuilder: FormBuilder) {
    this.condition = new BaseCondition<DocumentSearch>();
    this.hopso = new HopSo();
    this.organ = new CoQuan();
    this.phong = new Phong();
    this.documentSearch = new DocumentSearch();
    this.options = {
      multiple: false,
      theme: 'classic',
      closeOnSelect: true,
      width: "100%"
    }
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      documentCode: ['', Validators.required],
      codeNumber: ['', Validators.required],
      docType: ['', Validators.required],
      issuedDate: ['', Validators.required],
      pageAmount: [''],
      codeNotation: ['', Validators.required],
      docOrdinal: ['', Validators.required],
      language: ['', Validators.required],
      format: ['', Validators.required],
      confidenceLevel: ['', Validators.required],
      subject: [''],
      description: [''],
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
        }, () => {
        });
  }
  search(){
    this.condition.FilterRuleList = [
      {
        field: "S_CoQuan.CoQuanID",
        op: "",
        value: ""
      },
      {
        field: "S_HopSo.HopSoID",
        op: "",
        value: ""
      },
      {
        field: "S_MucLucHoSo.MucLucHoSoID",
        op: "",
        value: ""
      },
      {
        field: "S_HoSo.HoSoID",
        op: "",
        value: ""
      },
      {
        field: "S_VanBan.KyHieuVanBan",
        op: "",
        value: ""
      },
      {
        field: "S_VanBan.NgayVanBan",
        op: "",
        value: ""
      },
      {
        field: "S_VanBan.LoaiVanBanID",
        op: "",
        value: ""
      },
      {
        field: "S_VanBan.NoiDung",
        op: "",
        value: ""
      },
    ]
    
    this.condition.PageIndex = 1
    if(this.documentSearch.organID != undefined || this.documentSearch.organID != null){
      this.condition.FilterRuleList[0].op = "and_contains";
      this.condition.FilterRuleList[0].value = this.documentSearch.organID.toString();
    }
    
    console.log(this.documentSearch.organID);
    if(this.documentSearch.gearBoxID != undefined || this.documentSearch.gearBoxID !=  null){
      this.condition.FilterRuleList[1].op = "and_contains";
      this.condition.FilterRuleList[1].value = this.documentSearch.gearBoxID.toString();
    }
    if(this.documentSearch.tableOfContentID != undefined || this.documentSearch.tableOfContentID != null){
      this.condition.FilterRuleList[2].op = "and_contains";
      this.condition.FilterRuleList[2].value = this.documentSearch.tableOfContentID.toString();
    }
    if(this.documentSearch.profileID != undefined || this.documentSearch.profileID != null){
      this.condition.FilterRuleList[3].op = "and_contains";
      this.condition.FilterRuleList[3].value = this.documentSearch.profileID.toString();
    }
    this.condition.FilterRuleList[4].op = "and_contains";
    this.condition.FilterRuleList[4].value = this.documentSearch.codeNotation;
    this.condition.FilterRuleList[5].op = "and_contains";
    if(this.documentSearch.issuedDate != undefined){
      this.condition.FilterRuleList[5].value = this.documentSearch.issuedDate.toString();
    }

    if (this.documentTypeArr != undefined) {
      this.condition.FilterRuleList[6].value = this.documentTypeArr.toString();
      if (this.documentTypeArr.length == 1) {
        this.condition.FilterRuleList[6].op = "and_contains";
      }
      else {
        this.condition.FilterRuleList[6].op = "and_in_strings";
      }
    }
    this.condition.FilterRuleList[7].op = "and_contains";
    this.condition.FilterRuleList[7].value = this.documentSearch.subject;
      this.taiLieuService.getDocumentPaging(this.condition)
      .subscribe((data) => {
        this.documents = data["itemList"];
        this.pageSize = 5;
        this.pageIndex = 1;
        this.totalRecords = data["totalRows"];
      }, (error) => {
        console.log(error);
      }, () => {
        
      })
  }
    
  onProfileChange() {

  }
  onOrganChange(organID : any){
    // if organ select2 box is changed, set value of its child to empty
    this.lstFont = null;
    this.lstDanhMuc = null;
    this.gearBoxList = null;
    this.profileList = null;
    

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
  onFontChange(fontID : any){
    // if font select2 box is changed, set value of its child to empty
    this.lstDanhMuc = null;
    this.gearBoxList = null;
    this.profileList = null;

    var params = fontID;
    if(params == undefined || params == null || params == "")
      params  = this.fontID;
    else{
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
    this.gearBoxList = null;
    this.profileList = null;
    var params = tabOfContID;
    if(params == undefined || params == null || params == "")
      params  = this.fontID;
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
  onGearBoxChange(gearBoxId : any){
    // if  select2 gearbox box is changed, set value of its child to empty
    this.profileList = null;
    
    var params = gearBoxId;
    if(params == undefined || params == null || params == "")
      params  = this.fontID;
    else
    {
      this.hoSoService.getProfileByGearBoxId(gearBoxId)
      .subscribe((data) => {
        if(data.errorCode != '0') {
          this.toastr.info(data.errorMessage, "Thông báo");
        }
        else
        {
          if (data != undefined && data.itemList.length != 0) {
            console.log(data);
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
  loadPages(page : string) {
    if(isNaN(parseInt(page))){
      return;
    }
    try{
      var condi : BaseCondition<DocumentSearch> = new BaseCondition<DocumentSearch>();
      if (this.condition.FilterRuleList != undefined) {
        condi.FilterRuleList = this.condition.FilterRuleList;
      }
      condi.PageIndex = parseInt(page);
      this.taiLieuService.getDocumentPaging(condi).subscribe((data : any) => {
        this.documents = data.itemList;
        this.pageSize = 5;
        this.pageIndex = parseInt(page);
        this.totalRecords = data.totalRows;
      }, (error) => {
        this.pageSize = 5;
      }, () => {
      });
    }catch (e) {
      alert(JSON.stringify(e))
    }
  }
}
