import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { GetPermissionsByRoleIdsV1RequestDto } from "../../dto/v1/get-permissions-by-role-ids/get-permissions-by-role-ids-v1.request";
import { GetPermissionsByRoleIdsV1ResponseDto } from "../../dto/v1/get-permissions-by-role-ids/get-permissions-by-role-ids-v1.response";
import { PermissionService } from "../../services/permission.service";
import { PermissionPaginateV1ResponseDto } from "../../dto/v1/index/permission-paginate-v1.response";
import { PermissionPaginateV1RequestDto } from "../../dto/v1/index/permission-paginate-v1.request";
import { IPaginateResponse } from "src/common/interfaces/index.interface";
import { IPermission } from "src/databases/interaces/permission.interface";

@Controller({
    version: '1',
    path: 'permissions',
})
export class PermissionV1Controller {
    constructor(
        private readonly permissionService: PermissionService,
    ) {}

    @MessagePattern('auth:permissions:fetchPaginate')
    async fetchPaginate(
        @Payload() payload: PermissionPaginateV1RequestDto
    ): Promise<IPaginateResponse<PermissionPaginateV1ResponseDto>> {
        const {
            data,
            meta
        } = await this.permissionService.fetchPaginate(payload);

        return {
            data: PermissionPaginateV1ResponseDto.toResponses(data),
            meta,
        }
    }

    @MessagePattern('auth:permissions:GetPermissionsByRoleIds')
    async getPermissionsByRoleIds(
        @Payload() data: GetPermissionsByRoleIdsV1RequestDto,
    ): Promise<GetPermissionsByRoleIdsV1ResponseDto[]> {
        const permissions = await this.permissionService.getPermissionsByRoleIds(data.roleIds);

        return GetPermissionsByRoleIdsV1ResponseDto.toResponses(permissions);
    }
}
