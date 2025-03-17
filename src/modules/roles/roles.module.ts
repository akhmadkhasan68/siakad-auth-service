import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleGroup } from 'src/databases/entities/role-group.entity';
import { Role } from 'src/databases/entities/role.entity';
import { RoleHttpV1Controller } from './controllers/v1/role-http-v1.controller';
import { RoleNATsV1Controller } from './controllers/v1/role-nats-v1.controller';
import { RoleGroupRepository } from './repositories/role-group.repository';
import { RoleRepository } from './repositories/role.repository';
import { RoleService } from './services/role.service';

@Module({
    imports: [TypeOrmModule.forFeature([Role, RoleGroup])],
    controllers: [RoleHttpV1Controller, RoleNATsV1Controller],
    providers: [RoleService, RoleRepository, RoleGroupRepository],
    exports: [RoleService, RoleRepository, RoleGroupRepository],
})
export class RolesModule {}
