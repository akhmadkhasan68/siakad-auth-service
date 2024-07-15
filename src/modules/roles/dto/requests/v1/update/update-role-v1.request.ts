import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateRoleV1RequestDto } from '../create/create-role-v1.request';

export class UpdateRoleV1RequestDto extends CreateRoleV1RequestDto {
    @IsNotEmpty()
    @IsUUID('4')
    id: string;
}
