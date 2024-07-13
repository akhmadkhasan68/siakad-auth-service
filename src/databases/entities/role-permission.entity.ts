import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { IPermission } from "../interaces/permission.interface";
import { IRolePermission } from "../interaces/role-permission.interface";
import { IRole } from "../interaces/role.interface";
import { Role } from "./role.entity";
import { Permission } from "./permission.entity";

@Entity('role_permissions')
export class RolePermission implements IRolePermission {
    @PrimaryColumn({name: 'role_id', type: 'uuid'})
    roleId: string;

    @PrimaryColumn({name: 'permission_id', type: 'uuid'})
    permissionId: string;
    
    @ManyToOne(() => Role, role => role.permissions, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn({
        name: 'role_id',
        referencedColumnName: 'id'
    })
    role?: IRole;

    @ManyToOne(() => Permission, permission => permission.roles, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn({
        name: 'permission_id',
        referencedColumnName: 'id'
    })
    permission?: IPermission;
}
