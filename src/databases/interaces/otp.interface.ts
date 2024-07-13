import { IBaseEntity } from "./base.interface";
import { IUser } from "./user.interface";

export interface IOtp extends IBaseEntity {
    code: string;
    email: string;
    expiredAt: Date;
    isExpired: boolean;
    verifiedAt: Date;
    isVerified: boolean;
}
