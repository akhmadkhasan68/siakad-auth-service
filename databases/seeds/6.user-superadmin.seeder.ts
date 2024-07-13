import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { User } from "../../src/databases/entities/user.entity";
import { Role } from "../../src/databases/entities/role.entity";
import { RoleAdminEnum } from "src/common/enums/role.enum";

export default class UserSuperadminSeeder implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<void> {
        const userRepository = connection.getRepository(User);
        const roleRepository = connection.getRepository(Role);

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
