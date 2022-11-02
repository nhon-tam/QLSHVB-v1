export class DataValidation{
    constructor(
        public value?: string,
        public dataType?: number,
        public rowNumber?: number,
        public isCorrect?: boolean,
        public message?: string,
    ){

    }
}