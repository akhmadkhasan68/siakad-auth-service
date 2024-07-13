import { IBaseEntity } from "./base.interface";
import { IRole } from "./role.interface";

export interface IPermission extends IBaseEntity {
    name: string;
    key: string;
    description: string;
    roles?: IRole[];
}
