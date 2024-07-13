import { RoleGroupEnum } from "../../src/common/enums/role-group.enum";
import { RoleGroup } from "../../src/databases/entities/role-group.entity";
import { Role } from "../../src/databases/entities/role.entity";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { convertToTitleCase } from "../../src/common/utils/string";
import { RoleAdminEnum, RoleCustomerEnum } from "../../src/common/enums/role.enum";

export default class RoleSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const roleGroupAdmin = await connection.getRepository(RoleGroup).findOne({ where: { key: RoleGroupEnum.Admin } });
    const roleGroupCustomer = await connection.getRepository(RoleGroup).findOne({ where: { key: RoleGroupEnum.Customer } });

    await connection.createQueryBuilder().insert().into(Role).values([
        {
            roleGroup: roleGroupAdmin,
            name: convertToTitleCase(RoleAdminEnum.SuperAdmin),
            key: RoleAdminEnum.SuperAdmin,
            description: `${convertToTitleCase(RoleAdminEnum.SuperAdmin)} role`,
        },
        {
            roleGroup: roleGroupCustomer,
            name: convertToTitleCase(RoleCustomerEnum.Parent),
            key: RoleCustomerEnum.Parent,
            description: `${convertToTitleCase(RoleCustomerEnum.Parent)} role`,
        },
        {
            roleGroup: roleGroupCustomer,
            name: convertToTitleCase(RoleCustomerEnum.Student),
            key: RoleCustomerEnum.Student,
            description: `${convertToTitleCase(RoleCustomerEnum.Student)} role`,
        },
        {
            roleGroup: roleGroupCustomer,
            name: convertToTitleCase(RoleCustomerEnum.Teacher),
            key: RoleCustomerEnum.Teacher,
            description: `${convertToTitleCase(RoleCustomerEnum.Teacher)} role`,
        },
        {
            roleGroup: roleGroupCustomer,
            name: convertToTitleCase(RoleCustomerEnum.Staff),
            key: RoleCustomerEnum.Staff,
            description: `${convertToTitleCase(RoleCustomerEnum.Staff)} role`,
        },
    ]).execute();
  }
}
