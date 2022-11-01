
export class ThongKe  {
    constructor(
        public fontName?: string,
        public tableOfNumber?: string,
        public gearBoxCode?: string,
        public profileCode?: string,
        public docNumber?: string,
        public fileName?: string,
        public updateDate?: Date,
        public status?: number,
        public ComputerFileID?: number
    ) {
    }
}

export class FilterDTO  {
    constructor(
        public startDate?: Date,
        public endDate?: Date
    ) {
    }
}

export const thongKe : ThongKe[] = [
    {
    }
]