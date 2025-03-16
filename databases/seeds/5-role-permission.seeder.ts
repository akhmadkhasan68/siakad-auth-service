import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { RoleAdminEnum } from "../../src/common/enums/role.enum";
import { Permission } from "../../src/databases/entities/permission.entity";
import { RolePermission } from "../../src/databases/entities/role-permission.entity";
import { Role } from "../../src/databases/entities/role.entity";

export default class RolePermissionSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<void> {
        const roleSuperadmin = await dataSource.getRepository(Role).findOne({ where: { key: RoleAdminEnum.SuperAdmin } });
        const permissions = await dataSource.getRepository(Permission).find();

        for (const permission of permissions) {
            const rolePermission = new RolePermission();
            rolePermission.role = roleSuperadmin;
            rolePermission.permission = permission;
        
            await dataSource.getRepository(RolePermission).save(rolePermission);
        }
    }
}
