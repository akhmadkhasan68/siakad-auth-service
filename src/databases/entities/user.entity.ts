import { BeforeInsert, Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { PasswordUtil } from "../../../src/common/utils/password.util";
import { IRole } from "../interaces/role.interface";
import { IUser } from "../interaces/user.interface";
import { BaseEntity } from "./base.entity";
import { Role } from "./role.entity";

@Entity('users')
export class User extends BaseEntity implements IUser {
    @Column({
        name: 'first_name',
        type: 'varchar',
        length: 50
    })
    firstName: string;

    @Column({
        name: 'last_name',
        type: 'varchar',
        length: 50
    })
    lastName: string;

    @Column({
        type: 'varchar',
        length: 50
    })
    email: string;

    @Column({
        name: 'secondary_email',
        type: 'varchar',
        length: 50,
        nullable: true
    })
    secondaryEmail: string;

    @Column({
        name: 'phone',
        type: 'varchar',
        length: 15
    })
    phone: string;

    @Column({
        name: 'secondary_phone',
        type: 'varchar',
        length: 15,
        nullable: true
    })
    secondaryPhone: string;

    @Column({
        name: 'password',
        type: 'varchar',
        length: 255
    })
    password: string;

    @Column({
        name: 'is_email_verified',
        type: 'boolean',
        default: false
    })
    isEmailVerified: boolean;

    @Column({
        name: 'email_verified_at',
        type: 'timestamp',
        nullable: true
    })
    emailVerifiedAt: Date;

    @Column({
        name: 'is_phone_verified',
        type: 'boolean',
        default: false
    })
    isPhoneVerified: boolean;

    @Column({
        name: 'phone_verified_at',
        type: 'timestamp',
        nullable: true
    })
    phoneVerifiedAt: Date;

    @Column({
        name: 'referral_code',
        type: 'varchar',
        length: 10
    })
    referralCode: string;

    @Column({
        name: 'registered_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    registeredAt: Date;

    @Column({
        name: 'logged_in_at',
        type: 'timestamp',
        nullable: true
    })
    loggedInAt: Date;

    @Column({
        name: 'logged_failed_retries',
        type: 'int',
        default: 0
    })
    loggedFailedRetries: number;

    @Column({
        name: 'is_locked',
        type: 'boolean',
        default: false
    })
    isLocked: boolean;

    @Column({
        name: 'locked_at',
        type: 'timestamp',
        nullable: true
    })
    lockedAt: Date;

    @Column({
        name: 'is_deactivated',
        type: 'boolean',
        default: false
    })
    isDeactivated: boolean;

    @Column({
        name: 'deactivated_at',
        type: 'timestamp',
        nullable: true
    })
    deactivatedAt: Date;

    @ManyToMany(() => Role, role => role.users, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinTable({
        name: 'user_roles',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'role_id',
            referencedColumnName: 'id'
        }
    })
    roles?: IRole[];

    @BeforeInsert()
    async generateReferralCode() {
        this.referralCode = Math.random().toString(36).substring(2, 12).toUpperCase();
    }

    @BeforeInsert()
    async setPassword(password: string) {
        this.password = await PasswordUtil.hashPassword(password);
    }
}
