import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleGroup } from 'src/databases/entities/role-group.entity';
import { IRoleGroup } from 'src/databases/interaces/role-group.interface';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class RoleGroupRepository {
    constructor(
        @InjectRepository(RoleGroup)
        readonly roleGroupRepository: Repository<IRoleGroup>,
    ) {}

    async findOneById(id: string, throwError?: boolean): Promise<IRoleGroup> {
        const options: FindOneOptions<IRoleGroup> = {
            where: {
                id,
            },
        };

        if (throwError) {
            return this.roleGroupRepository.findOneOrFail(options);
        }

        return this.roleGroupRepository.findOne(options);
    }

    async findOneByKey(key: string, throwError?: boolean): Promise<IRoleGroup> {
        const options: FindOneOptions<IRoleGroup> = {
            where: {
                key,
            },
        };

        if (throwError) {
            return this.roleGroupRepository.findOneOrFail(options);
        }

        return this.roleGroupRepository.findOne(options);
    }

    async create(payload: IRoleGroup): Promise<IRoleGroup> {
        return this.roleGroupRepository.save(payload);
    }
}
