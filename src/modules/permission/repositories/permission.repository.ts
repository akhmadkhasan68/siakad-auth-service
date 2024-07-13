import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "src/databases/entities/permission.entity";
import { IPermission } from "src/databases/interaces/permission.interface";
import { In, Repository } from "typeorm";

@Injectable()
export class PermissionRepository {
    constructor(
        @InjectRepository(Permission)
        readonly permissionRepository: Repository<IPermission>,
    ) { }

    async getPermissionsByRoleIds(roleIds: string[]): Promise<IPermission[]> {
        return this.permissionRepository.find({
            where: {
                roles: {
                    id: In(roleIds),
                },
            },
        });
    }
}
