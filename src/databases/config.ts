import { config } from "src/config";
import { DataSourceOptions } from "typeorm";
import { User } from "./entities/user.entity";
import { Role } from "./entities/role.entity";
import { RoleGroup } from "./entities/role-group.entity";
import { UserRole } from "./entities/user-role.entity";
import { RolePermission } from "./entities/role-permission.entity";
import { Otp } from "./entities/otp.entity";
import { PasswordResetToken } from "./entities/password-reset-token.interface";
import { Permission } from "./entities/permission.entity";

export const databaseConfig: DataSourceOptions = {
    type: 'postgres',
    host: config.db.host,
    port: config.db.port,
    username: config.db.user,
    password: config.db.password,
    database: config.db.name,
    entities: [
        User,
        RoleGroup,
        Role,
        Permission,
        UserRole,
        RolePermission,
        Otp,
        PasswordResetToken,
    ],
    synchronize: false,
    logging: config.app.env === 'development',
    migrations: ['dist/databases/migrations/*{.ts,.js}'],
}
