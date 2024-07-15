import { IsNotEmpty } from 'class-validator';

export class CreateRoleV1RequestDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;
}
