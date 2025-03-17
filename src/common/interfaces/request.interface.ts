import { OrderDirectionType } from "../enums/index.enum";

export interface ISortRequest {
    sort?: string;
    order?: OrderDirectionType;
}

export interface IPaginationRequest {
    perPage?: number;
    page?: number;
}