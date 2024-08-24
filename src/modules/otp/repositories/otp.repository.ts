import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Otp } from 'src/databases/entities/otp.entity';
import { IOtp } from 'src/databases/interaces/otp.interface';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class OtpRepository {
    constructor(
        @InjectRepository(Otp)
        private readonly otpRepository: Repository<Otp>,
    ) {}

    async create(data: IOtp): Promise<IOtp> {
        const newData = this.otpRepository.create(data);
        return await this.otpRepository.save(newData);
    }

    async createWithTransaction(
        queryRunner: QueryRunner,
        data: IOtp,
    ): Promise<IOtp> {
        const newData = this.otpRepository.create(data);
        return await queryRunner.manager.save(newData);
    }

    async findByEmail(email: string): Promise<IOtp[]> {
        return await this.otpRepository.find({ where: { email } });
    }

    async findOneByEmail(email: string): Promise<IOtp> {
        return await this.otpRepository.findOne({ where: { email } });
    }

    async findByEmailAndCode(email: string, code: string): Promise<IOtp> {
        return await this.otpRepository.findOne({ where: { email, code } });
    }

    async deleteByEmail(email: string): Promise<void> {
        await this.otpRepository.delete({ email });
    }
}
