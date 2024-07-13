import { Column, Entity, OneToMany } from "typeorm";
import { IRoleGroup } from "../interaces/role-group.interface";
import { IRole } from "../interaces/role.interface";
import { BaseEntity } from "./base.entity";
import { Role } from "./role.entity";

@Entity('role_groups')
export class RoleGroup extends BaseEntity implements IRoleGroup {
    @Column()
    name: string;

    @Column()
    key: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    description: string;

    @OneToMany(() => Role, role => role.roleGroup)
    roles?: IRole[];
    
}
