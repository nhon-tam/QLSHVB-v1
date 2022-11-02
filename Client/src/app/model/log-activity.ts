
export class LogActivity  {
    constructor(
        public documentID?: number,
        public documentCode?: string,
        public logID?: number,
        public docOrdinal?: string,
        public description?: string,
        public creatorName?: string,
        public updatorName?: string,
        public createDate?: Date,
        public updateDate?: Date
    ) {
    }
}

export const logActivity : LogActivity[] = [
    {
    }
]