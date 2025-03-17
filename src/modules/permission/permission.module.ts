import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/databases/entities/permission.entity';
import { PermissionHttpV1Controller } from './controllers/v1/permission-http-v1.controller';
import { PermissionNATsV1Controller } from './controllers/v1/permission-nats-v1.controller';
import { PermissionRepository } from './repositories/permission.repository';
import { PermissionService } from './services/permission.service';

@Module({
    imports: [TypeOrmModule.forFeature([Permission])],
    controllers: [
        PermissionHttpV1Controller,
        PermissionNATsV1Controller
    ],
    providers: [
        {
            provide: PermissionService,
            useClass: PermissionService,
        },
        PermissionService,

        PermissionRepository,
    ],
    exports: [PermissionService, PermissionRepository],
})
export class PermissionModule {}
