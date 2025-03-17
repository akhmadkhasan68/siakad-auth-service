/** Basic Response */
export interface IApiResponse<T> {
    message: string;
    data?: T;
}

/** Basic Response with errors */
export interface IApiErrorResponse extends IApiResponse<undefined> {
    errors: any;
}

/** Pagination */
export interface IPaginationMeta {
    page: number;
    perPage: number;
    total: number;
    totalPage: number;
}

export interface IPaginationData<T> {
    items: T[];
    meta: IPaginationMeta;
}

export interface IPaginationResponse<T> extends IApiResponse<IPaginationData<T>> {
    data: {
        items: T[];
        meta: IPaginationMeta;
    }
}