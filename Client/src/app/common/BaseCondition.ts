import { FilterItem } from './FilterItem';

export class BaseCondition<T> {
    PageSize: number = 5;
    PageIndex: number;
    FilterRuleList? : FilterItem[] = new Array<FilterItem>();
    IN_WHERE?: string = "";
    FromRecords?: number = (this.PageIndex * this.PageSize) - 1;
    Item?: T;
  }