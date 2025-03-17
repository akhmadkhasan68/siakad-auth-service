import { Controller, Get, Param, Query } from "@nestjs/common";
import { IApiResponse, IPaginationResponse } from "src/common/interfaces/response.interface";
import { RolePaginateV1RequestDto } from "../../dto/requests/v1/index/role-paginate-v1.request";
import { RoleV1Response } from "../../dto/responses/v1/role-v1.response";
import { RoleService } from "../../services/role.service";

@Controller({
    version: '1',
    path: 'roles',
})
export class RoleHttpV1Controller {
    constructor(
        private readonly roleService: RoleService
    ) {}

    @Get()
    async fetchPaginate(
        @Query() payload: RolePaginateV1RequestDto,
    ): Promise<IPaginationResponse<RoleV1Response>> {
        const { items, meta } = await this.roleService.fetchPaginate(payload);

        return {
            message: 'OK',
            data: {
                items: RoleV1Response.toResponses(items),
                meta,
            },
        };
    }

    @Get(':id')
    async detail(@Param('id') id: string): Promise<IApiResponse<RoleV1Response>> {
        const data = await this.roleService.findOneById(id);

        return {
            message: 'OK',
            data: RoleV1Response.toResponse(data),
        };
    }
}