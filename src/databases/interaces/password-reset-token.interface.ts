import { IBaseEntity } from "./base.interface";

export interface IPasswordResetToken extends IBaseEntity {
    token: string;
    email: string;
    expiredAt: Date;
    isExpired: boolean;
    verifiedAt: Date;
    isVerified: boolean;
}
