import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { IUserRole } from "../interaces/user-role.interface";
import { BaseEntity } from "./base.entity";
import { IUser } from "../interaces/user.interface";
import { IRole } from "../interaces/role.interface";
import { User } from "./user.entity";
import { Role } from "./role.entity";

@Entity('user_roles')
export class UserRole extends BaseEntity implements IUserRole {
    @PrimaryColumn({name: 'user_id', type: 'uuid'})
    userId: string;

    @PrimaryColumn({name: 'role_id', type: 'uuid'})
    roleId: string;

    @ManyToOne(() => User, user => user.roles, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id'
    })
    user?: IUser;

    @ManyToOne(() => Role, role => role.users, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn({
        name: 'role_id',
        referencedColumnName: 'id'
    })
    role?: IRole;
}
