import { Column, Entity } from "typeorm";
import { IOtp } from "../interaces/otp.interface";
import { BaseEntity } from "./base.entity";

@Entity('otps')
export class Otp extends BaseEntity implements IOtp {
    @Column()
    code: string;

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
