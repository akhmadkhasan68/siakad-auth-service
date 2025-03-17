import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/databases/entities/user.entity';
import { IUser } from 'src/databases/interaces/user.interface';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<IUser>,
    ) {}

    async findByEmail(email: string, withRelations?: boolean): Promise<IUser> {
        const options: FindOneOptions<IUser> = {
            where: {
                email,
            },
        };

        if (withRelations) {
            options.relations = ['roles', 'roles.roleGroup'];
        }

        return this.usersRepository.findOne(options);
    }

    async findById(id: string, withRelations?: boolean): Promise<IUser> {
        const options: FindOneOptions<IUser> = {
            where: {
                id,
            },
        };

        if (withRelations) {
            options.relations = ['roles', 'roles.roleGroup'];
        }

        return this.usersRepository.findOne(options);
    }

    async update(id: string, user: IUser): Promise<void> {
        await this.usersRepository.update(id, user);
    }

    async updatePassword(id: string, password: string): Promise<void> {
        const user = await this.findById(id);
        user.password = bcrypt.hash(password, 10);

        await this.usersRepository.update(id, user);
    }
}
