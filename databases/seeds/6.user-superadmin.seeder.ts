import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { RoleAdminEnum } from "../../src/common/enums/role.enum";
import { Role } from "../../src/databases/entities/role.entity";
import { User } from "../../src/databases/entities/user.entity";

export default class UserSuperadminSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<void> {
        const userRepository = dataSource.getRepository(User);
        const roleRepository = dataSource.getRepository(Role);

        const role = await roleRepository.findOne({ where: { 
            key: RoleAdminEnum.SuperAdmin
        } });

        if (role) {
            await userRepository.save(userRepository.create({
                firstName: 'Admin',
                lastName: 'Admin',
                email: 'admin@admin.com',
                phone: '081234567890',
                password: 'admin',
                roles: [role],
                isEmailVerified: true,
                emailVerifiedAt: new Date(),
                isPhoneVerified: true,
                phoneVerifiedAt: new Date(),
                registeredAt: new Date(),
            }));
        }
    }
}
