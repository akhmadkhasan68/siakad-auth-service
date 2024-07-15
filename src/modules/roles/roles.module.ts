import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleGroup } from 'src/databases/entities/role-group.entity';
import { Role } from 'src/databases/entities/role.entity';
import { RoleV1Controller } from './controllers/v1/role-v1.controller';
import { RoleGroupRepository } from './repositories/role-group.repository';
import { RoleRepository } from './repositories/role.repository';
import { RoleService } from './services/role.service';

@Module({
    imports: [TypeOrmModule.forFeature([Role, RoleGroup])],
    controllers: [RoleV1Controller],
    providers: [RoleService, RoleRepository, RoleGroupRepository],
    exports: [RoleService, RoleRepository, RoleGroupRepository],
})
export class RolesModule {}
