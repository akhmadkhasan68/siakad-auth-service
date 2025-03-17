import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ServiceCommands } from 'src/common/constants/service-command.constant';
import { IPaginationResponse } from 'src/common/interfaces/response.interface';
import { GetPermissionsByRoleIdsV1RequestDto } from '../../dto/v1/get-permissions-by-role-ids/get-permissions-by-role-ids-v1.request';
import { GetPermissionsByRoleIdsV1ResponseDto } from '../../dto/v1/get-permissions-by-role-ids/get-permissions-by-role-ids-v1.response';
import { PermissionPaginateV1RequestDto } from '../../dto/v1/index/permission-paginate-v1.request';
import { PermissionV1ResponseDto } from '../../dto/v1/permission-v1.response';
import { PermissionService } from '../../services/permission.service';

@Controller({
    version: '1',
    path: 'permissions',
})
export class PermissionNATsV1Controller {
    constructor(private readonly permissionService: PermissionService) {}

    @MessagePattern(ServiceCommands.AuthService.V1.Permissions.FetchPaginate)
    async fetchPaginate(
        @Payload() payload: PermissionPaginateV1RequestDto,
    ): Promise<IPaginationResponse<PermissionV1ResponseDto>> {
        const { items, meta } =
            await this.permissionService.fetchPaginate(payload);

        return {
            message: 'OK',
            data: {
                items: PermissionV1ResponseDto.toResponses(items),
                meta,
            },
        };
    }

    @MessagePattern(ServiceCommands.AuthService.V1.Permissions.FindOneById)
    async findOneById(@Payload() id: string): Promise<PermissionV1ResponseDto> {
        const data = await this.permissionService.findOneById(id);

        return PermissionV1ResponseDto.toResponse(data);
    }

    @MessagePattern(
        ServiceCommands.AuthService.V1.Permissions.GetPermissionsByRoleIds,
    )
    async getPermissionsByRoleIds(
        @Payload() data: GetPermissionsByRoleIdsV1RequestDto,
    ): Promise<GetPermissionsByRoleIdsV1ResponseDto[]> {
        const permissions =
            await this.permissionService.getPermissionsByRoleIds(data.roleIds);

        return GetPermissionsByRoleIdsV1ResponseDto.toResponses(permissions);
    }
}
