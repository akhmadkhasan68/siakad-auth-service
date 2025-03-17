import { StringUtil } from "src/common/utils/string.util";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { PermissionConstants } from "../../src/common/constants/permission.constant";
import { Permission } from "../../src/databases/entities/permission.entity";

export default class PermissionSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<void> {
        const repository = dataSource.getRepository(Permission);

        const permissions: string[] = this.getValues(PermissionConstants);
        if (permissions.length > 0) {
            const values = permissions.map(
                (
                    permission,
                ): { name: string; key: string; description: string } => {
                    const permissionName = StringUtil.convertToTitleCase(permission);

                    return {
                        name: permissionName,
                        key: permission,
                        description: `${permissionName} permission`,
                    };
                },
            );

            for (const value of values) {
                const permission = await repository.findOne({
                    where: { key: value.key },
                });
                if (!permission) {
                    await repository.save(repository.create(value));
                }
            }
        }
    }

    getValues(obj: any): any[] {
        const values = [];
        for (const key in obj) {
            if (typeof obj[key] === 'object') {
                values.push(...this.getValues(obj[key]));
            } else {
                values.push(obj[key]);
            }
        }
        return values;
    }
}
