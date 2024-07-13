import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { IPermission } from "../interaces/permission.interface";
import { BaseEntity } from "./base.entity";
import { IRole } from "../interaces/role.interface";
import { Role } from "./role.entity";

@Entity('permissions')
export class Permission extends BaseEntity implements IPermission {
    @Column()
    name: string;

    @Column()
    key: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    description: string;

    @ManyToMany(() => Role, role => role.permissions, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinTable({
        name: 'role_permissions',
        joinColumn: {
            name: 'permission_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'role_id',
            referencedColumnName: 'id'
        }
    })
    roles?: IRole[];
}
