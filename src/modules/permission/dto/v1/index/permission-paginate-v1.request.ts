import { IsOptional, IsUUID } from 'class-validator';
import { PaginateRequest } from 'src/common/requests/paginate.request';

export class PermissionPaginateV1RequestDto extends PaginateRequest {
    @IsOptional()
    @IsUUID('4')
    roleId?: string;
}
