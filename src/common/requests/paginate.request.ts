import { Type } from "class-transformer";
import { IsOptional } from "class-validator";
import { IPaginateRequest, ISortRequest } from "../interfaces/index.interface";
import { OrderDirectionType } from "../enums/index.enum";

export class PaginateRequest implements IPaginateRequest, ISortRequest {
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
