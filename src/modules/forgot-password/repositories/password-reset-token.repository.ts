import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordResetToken } from 'src/databases/entities/password-reset-token.entity';
import { IPasswordResetToken } from 'src/databases/interaces/password-reset-token.interface';
import { Repository } from 'typeorm';

@Injectable()
export class PasswordResetTokenRepository {
    constructor(
        @InjectRepository(PasswordResetToken)
        private readonly passwordResetTokenRepository: Repository<PasswordResetToken>,
    ) {}

    async deleteAllByEmail(email: string): Promise<void> {
        await this.passwordResetTokenRepository.delete({ email });
    }

    async findByToken(token: string): Promise<PasswordResetToken> {
        return await this.passwordResetTokenRepository.findOne({
            where: {
                token,
            },
        });
    }

    async findOneByEmail(email: string): Promise<PasswordResetToken> {
        return await this.passwordResetTokenRepository.findOne({
            where: {
                email,
            },
        });
    }

    async create(data: IPasswordResetToken): Promise<IPasswordResetToken> {
        const cretedPasswordResetToken =
            this.passwordResetTokenRepository.create(data);

        return await this.passwordResetTokenRepository.save(
            cretedPasswordResetToken,
        );
    }
}
