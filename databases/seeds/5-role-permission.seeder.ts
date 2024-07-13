import { Role } from "../../src/databases/entities/role.entity";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { RoleAdminEnum } from "../../src/common/enums/role.enum";
import { RolePermission } from "../../src/databases/entities/role-permission.entity";
import { Permission } from "../../src/databases/entities/permission.entity";

export default class RolePermissionSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const roleSuperadmin = await connection.getRepository(Role).findOne({ where: { key: RoleAdminEnum.SuperAdmin } });
    const permissions = await connection.getRepository(Permission).find();

    for (const permission of permissions) {
        const rolePermission = new RolePermission();
        rolePermission.role = roleSuperadmin;
        rolePermission.permission = permission;
    
        await connection.getRepository(RolePermission).save(rolePermission);
    }
  }
}
