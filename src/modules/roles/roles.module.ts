import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/databases/entities/role.entity';
import { RoleV1Controller } from './controllers/v1/role-v1.controller';
import { RoleRepository } from './repositories/role.repository';
import { RoleService } from './services/role.service';

@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    controllers: [RoleV1Controller],
    providers: [RoleService, RoleRepository],
    exports: [RoleService, RoleRepository],
})
export class RolesModule {}
