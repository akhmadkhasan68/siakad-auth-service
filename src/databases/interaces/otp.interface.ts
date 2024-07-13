import { IBaseEntity } from "./base.interface";

export interface IOtp extends IBaseEntity {
    code: string;
    email: string;
    expiredAt: Date;
    isExpired: boolean;
    verifiedAt: Date;
    isVerified: boolean;
}
