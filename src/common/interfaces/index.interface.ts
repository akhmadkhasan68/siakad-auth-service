import { OrderDirectionType } from "../enums/index.enum";

export interface ISortRequest {
    sort?: string;
    order?: OrderDirectionType;
}

export interface IPaginateRequest {
    perPage?: number;
    page?: number;
}

// Index Response

export interface IPaginationMeta {
    page: number;
    perPage: number;
    total: number;
    totalPage: number;
}

export interface IPaginateResponse<T> {
    meta: IPaginationMeta;
    data: Array<T>;
}
