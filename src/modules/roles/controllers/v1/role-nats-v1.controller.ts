import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ServiceCommands } from 'src/common/constants/service-command.constant';
import { IPaginationResponse } from 'src/common/interfaces/response.interface';
import { CreateRoleV1RequestDto } from '../../dto/requests/v1/create/create-role-v1.request';
import { RolePaginateV1RequestDto } from '../../dto/requests/v1/index/role-paginate-v1.request';
import { UpdateRoleV1RequestDto } from '../../dto/requests/v1/update/update-role-v1.request';
import { RoleV1Response } from '../../dto/responses/v1/role-v1.response';
import { RoleService } from '../../services/role.service';

@Controller({
    version: '1',
    path: 'roles',
})
export class RoleNATsV1Controller {
    constructor(private readonly roleService: RoleService) {}

    @MessagePattern(ServiceCommands.AuthService.V1.Roles.FetchPaginate)
    async fetchPaginate(
        @Payload() payload: RolePaginateV1RequestDto,
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

    @MessagePattern(ServiceCommands.AuthService.V1.Roles.FindOneById)
    async findOneById(@Payload() id: string): Promise<RoleV1Response> {
        const data = await this.roleService.findOneById(id);

        return RoleV1Response.toResponse(data);
    }

    @MessagePattern(ServiceCommands.AuthService.V1.Roles.Create)
    async create(
        @Payload() payload: CreateRoleV1RequestDto,
    ): Promise<RoleV1Response> {
        const data = await this.roleService.create(payload);

        return RoleV1Response.toResponse(data);
    }

    @MessagePattern(ServiceCommands.AuthService.V1.Roles.Update)
    async update(
        @Payload() payload: UpdateRoleV1RequestDto,
    ): Promise<RoleV1Response> {
        const data = await this.roleService.update(payload);

        return RoleV1Response.toResponse(data);
    }

    @MessagePattern(ServiceCommands.AuthService.V1.Roles.Delete)
    async delete(@Payload() id: string): Promise<boolean> {
        const data = await this.roleService.delete(id);

        return data;
    }
}
