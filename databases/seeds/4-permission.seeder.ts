import { Permission } from "../../src/databases/entities/permission.entity";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { convertToTitleCase } from "../../src/common/utils/string";
import { PERMISSION } from "src/common/constants/permission.constant";

export default class PermissionSeeder implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const repository = connection.getRepository(Permission);

        const permissions: string[] = this.getValues(PERMISSION);
        if (permissions.length > 0) {
            const values = permissions.map((permission): { name: string, key: string, description: string } => {
                const permissionName = convertToTitleCase(permission);

                return {
                    name: permissionName,
                    key: permission,
                    description: `${permissionName} permission`,
                };
            });

            for (const value of values) {
                const permission = await repository.findOne({ where: { key: value.key } });
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
