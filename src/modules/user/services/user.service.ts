import { Injectable } from "@nestjs/common";
import { IUser } from "src/databases/interaces/user.interface";
import { UserRepository } from "../repositories/user.repository";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async findById(id: string, withRelations?: boolean): Promise<IUser> {
        return this.userRepository.findById(id, withRelations);
    }
}