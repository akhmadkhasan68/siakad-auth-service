/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { OrderDirectionType } from "src/common/enums/index.enum";
import { IPaginateRequest, IPaginateResponse, IPaginationMeta } from "src/common/interfaces/index.interface";

/**
 * PaginateService
 * Used to fetch paginated data with any sort, filter and search
 */


export abstract class PaginateService {
    readonly DefaultPerPage: number = 10;
    readonly DefaultPage: number = 1;
    readonly DefaultSort: string = 'created_at';
    readonly DefaultOrder: OrderDirectionType = 'DESC';

    abstract fetchPaginate(
        arg0: any,
        arg1: any,
        arg3: any,
    ): Promise<IPaginateResponse<any>>;

    countOffset({ page, perPage }: IPaginateRequest): number {
        page = page ?? this.DefaultPage;
        perPage = perPage ?? this.DefaultPerPage;

        return (page - 1) * perPage;
    }

    getOrder(order: string): 'ASC' | 'DESC' {
        return ['ASC', 'DESC'].indexOf(order) == 0 ? 'ASC' : 'DESC';
    }

    mapMeta(
        count: number,
        { page, perPage }: IPaginateRequest,
    ): IPaginationMeta {
        page = page ?? this.DefaultPage;
        perPage = perPage ?? this.DefaultPerPage;

        return {
            page: page,
            perPage: perPage,
            total: count,
            totalPage: Math.ceil(count / perPage),
        };
    }

    getNullsOrder(order: string): 'NULLS FIRST' | 'NULLS LAST' {
        return order == 'ASC' ? 'NULLS FIRST' : 'NULLS LAST';
    }
}
