import { Phong } from './phong.model';

export class CoQuan  {
        public organId?: number;
        public organCode?: string;
        public tenCoQuan?: string
        public diaChiID?: string
        public loaiCoQuanID?: number;
        public tinhID? : number
        public huyenID? :number = 0
        public xaPhuongID ?: number = 0
        public createBy? : string
        public updatedBy? :string
        public addressDetail? :string
        public addressID? :number
        public organType? : string
        public description? : string;
        public notes?: string;
        public organTypeId? : number;
        public provinceId? : number;
        public districtId? : number;
        public wardId? : number;
        public coQuanID?: number;
}
export class organ { 
  constructor(
    public organID?: number,
    public tenCoQuan?: string
  ){}
  
}

export class organSelect2 { 
  constructor(
    public id?: string,
    public text?: string
  ){}
  
}
export const coquans = [
    {}
]
