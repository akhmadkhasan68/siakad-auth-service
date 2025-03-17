import { Type } from "class-transformer";
import { IsOptional } from "class-validator";
import { OrderDirectionType } from "../enums/index.enum";
import { IPaginationRequest, ISortRequest } from "../interfaces/request.interface";

export class PaginateRequest implements IPaginationRequest, ISortRequest {
    @IsOptional()
    @Type(() => Number)
    page: number;

    @IsOptional()
    @Type(() => Number)
    perPage: number;

    @IsOptional()
    keyword: string;

    @IsOptional()
    sort: string;

    @IsOptional()
    order: OrderDirectionType;
}
