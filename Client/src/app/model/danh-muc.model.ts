
export class DanhMuc  {
    constructor(
        public tabOfContID?: number,
        public fontID?: number,
        public fontCode?: string,
        public tabOfContCode?: string,
        public tabOfContName?: string,
        public tabOfContNumber?: string,
        public gearBoxCount?: number,
        public note?: string,
        public organName?: string,
        public storageID?: number
    ) {
    }
}

export class danhMucSelect2 { 
    constructor(
            public id?: string,
            public text?: string
    ){}
}
export const danhmucs : DanhMuc[] = [
]