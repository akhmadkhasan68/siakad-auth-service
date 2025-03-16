import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { RoleGroupEnum } from "../../src/common/enums/role-group.enum";
import { convertToTitleCase } from "../../src/common/utils/string";
import { RoleGroup } from "../../src/databases/entities/role-group.entity";

export default class RoleGroupSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const roleGroups: string[] = Object.values(RoleGroupEnum).map((value): string => {
        return value;
    });

    const values = roleGroups.map((roleGroup): { name: string, key: string, description: string } => {
      const roleName = convertToTitleCase(roleGroup);

      return {
        name: roleName,
        key: roleGroup,
        description: `${roleName} role group`,
      };
    });

    const roleGroupRepository = dataSource.getRepository(RoleGroup);
    await roleGroupRepository.save(roleGroupRepository.create(values));
  }
}
