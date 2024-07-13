import { IPermission } from "./permission.interface";
import { IRole } from "./role.interface";

export interface IRolePermission {
    roleId: string;
    permissionId: string;
    
    role?: IRole;
    permission?: IPermission;
}
