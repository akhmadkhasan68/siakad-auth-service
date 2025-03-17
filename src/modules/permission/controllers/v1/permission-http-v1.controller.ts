import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { IApiResponse, IPaginationResponse } from "src/common/interfaces/response.interface";
import { IUser } from "src/databases/interaces/user.interface";
import { GetUserLogged } from "src/infrastructures/decorators/get-user-logged.decorator";
import { LoggedInGuard } from "src/infrastructures/guards/logged-in.guard";
import { PermissionPaginateV1RequestDto } from "../../dto/v1/index/permission-paginate-v1.request";
import { PermissionV1ResponseDto } from "../../dto/v1/permission-v1.response";
import { PermissionService } from "../../services/permission.service";

@Controller({
    version: '1',
    path: 'permissions',
})
export class PermissionHttpV1Controller {
    constructor(
        private readonly permissionService: PermissionService
    ) {}

    @Get()
    async fetchPaginate(
        @Query() payload: PermissionPaginateV1RequestDto,
    ): Promise<IPaginationResponse<PermissionV1ResponseDto>> {
        const { items, meta } = await this.permissionService.fetchPaginate(payload);

        return {
            message: 'OK',
            data: {
                items: PermissionV1ResponseDto.toResponses(items),
                meta,
            },
        };
    }

    @Get(':id')
    async detail(
        @Param('id') id: string,
    ): Promise<IApiResponse<PermissionV1ResponseDto>> {
        const permission = await this.permissionService.findOneById(id);

        return {
            message: 'Get permission detail success',
            data: PermissionV1ResponseDto.toResponse(permission),
        };
    }

    @Get('my-permissions')
    @UseGuards(LoggedInGuard)
    async myPermissions(
        @GetUserLogged() user: IUser,
    ): Promise<IApiResponse<PermissionV1ResponseDto[]>> {
        const roleIds = user.roles.map((role) => role.id);
        const permissions = await this.permissionService.getPermissionsByRoleIds(roleIds);

        return {
            message: 'Get user permissions success',
            data: PermissionV1ResponseDto.toResponses(permissions),
        };
    }
}