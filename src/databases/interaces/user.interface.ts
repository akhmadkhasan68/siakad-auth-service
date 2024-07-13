import { IBaseEntity } from "./base.interface";
import { IRole } from "./role.interface";

export interface IUser extends IBaseEntity {
    firstName: string;
    lastName: string;
    email: string;
    secondaryEmail: string;
    phone: string;
    secondaryPhone: string;
    password: string;
    isEmailVerified: boolean;
    emailVerifiedAt: Date;
    isPhoneVerified: boolean;
    phoneVerifiedAt: Date;
    referralCode: string;
    registeredAt: Date;
    loggedInAt: Date;
    loggedFailedRetries: number;
    isLocked: boolean;
    lockedAt: Date;
    isDeactivated: boolean;
    deactivatedAt: Date;
    roles?: IRole[];
}
