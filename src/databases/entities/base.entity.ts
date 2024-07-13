import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IBaseEntity } from "../interaces/base.interface";

export class BaseEntity implements IBaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt?: Date;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt?: Date;

    @DeleteDateColumn({
        name: 'deleted_at'
    })
    deletedAt?: Date;
}
