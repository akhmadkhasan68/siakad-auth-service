import { convertToTitleCase } from "../../src/common/utils/string";
import { RoleGroupEnum } from "../../src/common/enums/role-group.enum";
import { RoleGroup } from "../../src/databases/entities/role-group.entity";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export default class RoleGroupSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
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

    await connection.createQueryBuilder().insert().into(RoleGroup).values(values).execute();
  }
}
