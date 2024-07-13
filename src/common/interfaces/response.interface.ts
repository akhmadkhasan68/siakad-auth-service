import { IPaginationMeta } from './index.interface';

export interface IApiResponse<T> {
    code?: number;
    message: string;
    meta?: IPaginationMeta;
    data: T;
    errors?: any;
}

interface IDataUnprocessable {
    property: string;
    message: string[];
}

export interface IUnprocessableResponse {
    message: string;
    data: Array<IDataUnprocessable>;
}
