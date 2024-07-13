import { IRole } from "./role.interface";
import { IUser } from "./user.interface";

export interface IUserRole {
    userId: string;
    roleId: string;

    user?: IUser;
    role?: IRole;
}
