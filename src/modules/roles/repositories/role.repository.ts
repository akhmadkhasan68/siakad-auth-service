import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/databases/entities/role.entity';
import { IRole } from 'src/databases/interaces/role.interface';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class RoleRepository {
    constructor(
        @InjectRepository(Role)
        readonly roleRepository: Repository<IRole>,
    ) {}

    async findOneById(id: string, throwError?: boolean): Promise<IRole> {
        const options: FindOneOptions<IRole> = {
            where: {
                id,
            },
        };

        if (throwError) {
            return this.roleRepository.findOneOrFail(options);
        }

        return this.roleRepository.findOne(options);
    }

    async findOneByKey(key: string, throwError?: boolean): Promise<IRole> {
        const options: FindOneOptions<IRole> = {
            where: {
                key,
            },
        };

        if (throwError) {
            return this.roleRepository.findOneOrFail(options);
        }

        return this.roleRepository.findOne(options);
    }

    async create(payload: IRole): Promise<IRole> {
        return this.roleRepository.save(payload);
    }

    async update(id: string, payload: IRole): Promise<IRole> {
        await this.roleRepository.update(id, payload);

        return this.findOneById(id);
    }
}
