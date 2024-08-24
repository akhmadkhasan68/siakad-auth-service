import { Column, Entity } from "typeorm";
import { IPasswordResetToken } from "../interaces/password-reset-token.interface";
import { BaseEntity } from "./base.entity";

@Entity('password_reset_tokens')
export class PasswordResetToken extends BaseEntity implements IPasswordResetToken {
    @Column()
    token: string;

    @Column()
    email: string;

    @Column({
        type: 'timestamp',
        nullable: true,
    })
    expiredAt: Date;

    @Column({
        type: 'boolean',
        default: false,
    })
    isExpired: boolean;

    @Column({
        type: 'timestamp',
        nullable: true,
    })
    verifiedAt: Date;

    @Column({
        type: 'boolean',
        default: false,
    })
    isVerified: boolean;
}
