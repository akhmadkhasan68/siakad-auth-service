import { IRole } from "src/databases/interaces/role.interface";
import { IUser } from "src/databases/interaces/user.interface";

export class UserResponseV1Dto {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    secondaryEmail: string;
    phone: string;
    secondaryPhone: string;
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

    static toResponseDto(data: IUser): UserResponseV1Dto {
        // creating the response object
        const response = new UserResponseV1Dto();
        response.id = data.id;
        response.firstName = data.firstName;
        response.lastName = data.lastName;
        response.email = data.email;
        response.secondaryEmail = data.secondaryEmail;
        response.phone = data.phone;
        response.secondaryPhone = data.secondaryPhone;
        response.isEmailVerified = data.isEmailVerified;
        response.emailVerifiedAt = data.emailVerifiedAt;
        response.isPhoneVerified = data.isPhoneVerified;
        response.phoneVerifiedAt = data.phoneVerifiedAt;
        response.referralCode = data.referralCode;
        response.registeredAt = data.registeredAt;
        response.loggedInAt = data.loggedInAt;
        response.loggedFailedRetries = data.loggedFailedRetries;
        response.isLocked = data.isLocked;
        response.lockedAt = data.lockedAt;
        response.isDeactivated = data.isDeactivated;
        response.deactivatedAt = data.deactivatedAt;
        response.roles = data.roles;
        
        return response;
    }
}
