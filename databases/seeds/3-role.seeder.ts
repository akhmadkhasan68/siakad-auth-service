import { StringUtil } from "src/common/utils/string.util";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { RoleGroupEnum } from "../../src/common/enums/role-group.enum";
import { RoleAdminEnum, RoleCustomerEnum } from "../../src/common/enums/role.enum";
import { RoleGroup } from "../../src/databases/entities/role-group.entity";
import { Role } from "../../src/databases/entities/role.entity";

export default class RoleSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<void> {
        const roleGroupAdmin = await dataSource.getRepository(RoleGroup).findOne({ where: { key: RoleGroupEnum.Admin } });
        const roleGroupCustomer = await dataSource.getRepository(RoleGroup).findOne({ where: { key: RoleGroupEnum.Customer } });

        await dataSource.createQueryBuilder().insert().into(Role).values([
            {
                roleGroup: roleGroupAdmin,
                name: StringUtil.convertToTitleCase(RoleAdminEnum.SuperAdmin),
                key: RoleAdminEnum.SuperAdmin,
                description: `${StringUtil.convertToTitleCase(RoleAdminEnum.SuperAdmin)} role`,
            },
            {
                roleGroup: roleGroupCustomer,
                name: StringUtil.convertToTitleCase(RoleCustomerEnum.Parent),
                key: RoleCustomerEnum.Parent,
                description: `${StringUtil.convertToTitleCase(RoleCustomerEnum.Parent)} role`,
            },
            {
                roleGroup: roleGroupCustomer,
                name: StringUtil.convertToTitleCase(RoleCustomerEnum.Student),
                key: RoleCustomerEnum.Student,
                description: `${StringUtil.convertToTitleCase(RoleCustomerEnum.Student)} role`,
            },
            {
                roleGroup: roleGroupCustomer,
                name: StringUtil.convertToTitleCase(RoleCustomerEnum.Teacher),
                key: RoleCustomerEnum.Teacher,
                description: `${StringUtil.convertToTitleCase(RoleCustomerEnum.Teacher)} role`,
            },
            {
                roleGroup: roleGroupCustomer,
                name: StringUtil.convertToTitleCase(RoleCustomerEnum.Staff),
                key: RoleCustomerEnum.Staff,
                description: `${StringUtil.convertToTitleCase(RoleCustomerEnum.Staff)} role`,
            },
        ]).execute();
    }
}
