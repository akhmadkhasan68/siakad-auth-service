import { Injectable } from '@nestjs/common';
import { IPaginateResponse } from 'src/common/interfaces/index.interface';
import { IRole } from 'src/databases/interaces/role.interface';
import { PaginateService } from 'src/infrastructures/services/paginate.service';
import { RolePaginateV1RequestDto } from '../dto/v1/index/role-paginate-v1.request';
import { RoleRepository } from '../repositories/role.repository';

@Injectable()
export class RoleService extends PaginateService {
    constructor(private readonly roleRepository: RoleRepository) {
        super();
    }

    async fetchPaginate(
        payload: RolePaginateV1RequestDto,
    ): Promise<IPaginateResponse<IRole>> {
        const query = this.roleRepository.roleRepository
            .createQueryBuilder('role')
            .innerJoinAndSelect('role.roleGroup', 'roleGroup');

        if (payload.keyword) {
            query.andWhere((qb) => {
                qb.where('role.name ILIKE :keyword', {
                    keyword: `%${payload.keyword}%`,
                }).orWhere('role.key ILIKE :keyword', {
                    keyword: `%${payload.keyword}%`,
                });
            });
        }

        if (payload.sort) {
            switch (payload.sort) {
                case 'name':
                    query.orderBy('role.name', this.getOrder(payload.order));
                    break;
                case 'key':
                    query.orderBy('role.key', this.getOrder(payload.order));
                    break;
                case 'description':
                    query.orderBy(
                        'role.description',
                        this.getOrder(payload.order),
                    );
                    break;
                default:
                    query.orderBy(
                        'role.createdAt',
                        this.getOrder(payload.order),
                    );
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
}
