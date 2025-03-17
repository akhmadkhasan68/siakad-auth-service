/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { OrderDirectionEnum, OrderDirectionType } from "src/common/enums/index.enum";
import { IPaginationRequest } from "src/common/interfaces/request.interface";
import { IPaginationData, IPaginationMeta } from "src/common/interfaces/response.interface";

/**
 * PaginateService
 * Used to fetch paginated data with any sort, filter and search
 */
export abstract class PaginateService {
    readonly DefaultPerPage: number = 10;
    readonly DefaultPage: number = 1;
    readonly DefaultSort: string = 'created_at';
    readonly DefaultOrder: OrderDirectionType = OrderDirectionEnum.Desc;

    abstract fetchPaginate(
        arg0: any,
        arg1: any,
        arg3: any,
    ): Promise<IPaginationData<any>>;

    countOffset({ page, perPage }: IPaginationRequest): number {
        page = page ?? this.DefaultPage;
        perPage = perPage ?? this.DefaultPerPage;

        return (page - 1) * perPage;
    }

    getOrder(order: string): OrderDirectionEnum.Asc | OrderDirectionEnum.Desc {
        return [OrderDirectionEnum.Asc as string, OrderDirectionEnum.Desc as string].indexOf(order) == 0 ? OrderDirectionEnum.Asc : OrderDirectionEnum.Desc;
    }

    mapMeta(
        count: number,
        { page, perPage }: IPaginationRequest,
    ): IPaginationMeta {
        page = page ?? this.DefaultPage;
        perPage = perPage ?? this.DefaultPerPage;

        return {
            page: +page,
            perPage: +perPage,
            total: +count,
            totalPage: +Math.ceil(count / perPage),
        };
    }

    getNullsOrder(order: string): 'NULLS FIRST' | 'NULLS LAST' {
        return order == OrderDirectionEnum.Asc ? 'NULLS FIRST' : 'NULLS LAST';
    }
}
