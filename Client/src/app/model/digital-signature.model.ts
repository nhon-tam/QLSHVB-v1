export class DigitalSignature {
    constructor(
        public id? : number,
        public fileName? : string,
        public size? : string,
        public createBy? : string,
        public createDate? : Date,
        public path? : string,
        public base64String?: string,
        public status?: number,
        public serverPath?: string,
    ){

    }
}

export const digitalsignatures : DigitalSignature[] = [

]