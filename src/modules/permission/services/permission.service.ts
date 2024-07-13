import { IPermission } from "src/databases/interaces/permission.interface";
import { PermissionRepository } from "../repositories/permission.repository";
import { Injectable } from "@nestjs/common";
import { PermissionPaginateV1RequestDto } from "../dto/v1/index/permission-paginate-v1.request";
import { IPaginateResponse } from "src/common/interfaces/index.interface";
import { PaginateService } from "src/infrastructures/services/paginate.service";

@Injectable()
export class PermissionService extends PaginateService {
    constructor(
        private readonly permissionRepository: PermissionRepository,
    ) { 
        super();
    }
    
    async fetchPaginate(
        payload: PermissionPaginateV1RequestDto
    ): Promise<IPaginateResponse<IPermission>> {
        const query = this.permissionRepository.permissionRepository.createQueryBuilder('permission');

        if (payload.keyword) {
            query.andWhere((qb) => {
                qb.where('permission.name ILIKE :keyword', { keyword: `%${payload.keyword}%` })
                    .orWhere('permission.key ILIKE :keyword', { keyword: `%${payload.keyword}%` });
            });
        }

        if (payload.sort) {
            switch (payload.sort) {
                case 'name':
                    query.orderBy('permission.name', this.getOrder(payload.order));
                    break;
                case 'key':
                    query.orderBy('permission.key', this.getOrder(payload.order));
                    break;
                case 'description':
                    query.orderBy('permission.description', this.getOrder(payload.order));
                    break;
                default:
                    query.orderBy('permission.createdAt', this.getOrder(payload.order));
                    break;
            }
        }

        query.take(payload.perPage ?? 10);
        query.skip(this.countOffset(payload));

        const [data, count] = await query.getManyAndCount();

        const meta = this.mapMeta(count, payload);

        return {
            data,
            meta,
        };
    }

    async getPermissionsByRoleIds(roleIds: string[]): Promise<IPermission[]> {
        return await this.permissionRepository.getPermissionsByRoleIds(roleIds);
    }
}
