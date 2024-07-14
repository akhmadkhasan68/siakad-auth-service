import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/databases/entities/role.entity';
import { IRole } from 'src/databases/interaces/role.interface';
import { Repository } from 'typeorm';

@Injectable()
export class RoleRepository {
    constructor(
        @InjectRepository(Role)
        readonly roleRepository: Repository<IRole>,
    ) {}
}
