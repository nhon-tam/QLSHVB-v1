
export class HoSo  {
    
    public fileCode? : string;
    public identifier? : string;
    public organId? : number;
    public gearBoxCode? : string;
    public gearBoxId? : number;
    public fileCatalog? : number;
    public fileNotation? : string;
    public profileTypeId? : number; 

    public title? : string;

    public maintenance? : string;
    public rights? : string;

    public language? : string;
    public languageId? : number;
    public startDate? : Date;
    public endDate? : Date;
    /// <summary>
    /// tổng số tài liệu trong hồ sơ
    /// </summary>
    public totalDoc? : number;
    public description? : string;
    /// <summary>
    /// kí hiệu thông tin
    /// </summary>
    public inforSign? : string;
    /// <summary>
    /// từ khoá
    /// </summary>
    public keyWord? : string;
    /// <summary>
    /// số lượng tờ
    /// </summary>
    public sheetNumber? : number;
    public pageNumber? : number;
    public physicalStateId? : number;
    public profileTypeName? : string;
    public gearBoxTitle? : string;
    public createdBy? : string;
    public updatedBy? : string;
    public profileId?: number;
    public totalFiles? : number;
    public profileNumber?: number;
    public status?: number;

    public fontId?: number;
    public tableOfContentId?: number;

    public organName?: string;
    public fontName?: string;
    public tableOfContentName ?: string;
    public tableOfContentNumber ?: string;
    public format? : string;
}

export const hosos : HoSo[] = [
    {
    }
]