import { Column, Entity } from 'typeorm';
import { IOtp } from '../interaces/otp.interface';
import { BaseEntity } from './base.entity';

@Entity('otps')
export class Otp extends BaseEntity implements IOtp {
    @Column()
    code: string;

    @Column()
    email: string;

    @Column({
        name: 'expired_at',
        type: 'timestamp',
        nullable: true,
    })
    expiredAt: Date;

    @Column({
        name: 'is_expired',
        type: 'boolean',
        default: false,
    })
    isExpired: boolean;

    @Column({
        name: 'verified_at',
        type: 'timestamp',
        nullable: true,
    })
    verifiedAt: Date;

    @Column({
        name: 'is_verified',
        type: 'boolean',
        default: false,
    })
    isVerified: boolean;
}
