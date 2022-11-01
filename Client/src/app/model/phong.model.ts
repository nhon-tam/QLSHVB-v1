
export class Phong  {
        public fontID?: number
        public fontNumber?: string
        public organID?: number
        public organName?: string
        public organCode?: string
        public fontName?: string
        public history?: string
        public lang?: string
        public note?: string
        public lookupTools?: string
        public keyGroups ?: string
        public ortherTypes ?: string
        public paperDigital ?: number
        public copyNumber ?: number
        public archivesTime ?: string
        public paperTotal?: number
        public languageId?: number
}

export class fontSelect2 { 
        constructor(
                public id?: string,
                public text?: string
        ){}

}
export const phongs : Phong[] = [
]