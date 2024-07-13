import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import { IPermission } from "../interaces/permission.interface";
import { IRoleGroup } from "../interaces/role-group.interface";
import { IRole } from "../interaces/role.interface";
import { BaseEntity } from "./base.entity";
import { RoleGroup } from "./role-group.entity";
import { IUser } from "../interaces/user.interface";
import { User } from "./user.entity";
import { Permission } from "./permission.entity";

@Entity('roles')
export class Role extends BaseEntity implements IRole {
    @ManyToOne(() => RoleGroup, roleGroup => roleGroup.id, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    roleGroup: IRoleGroup;

    @Column()
    name: string;

    @Column()
    key: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    description: string;

    @ManyToMany(() => Permission, Permission => Permission.roles, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    permissions?: IPermission[];

    @ManyToMany(() => User, user => user.roles, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    users?: IUser[];
}
