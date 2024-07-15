import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IPaginateResponse } from 'src/common/interfaces/index.interface';
import { CreateRoleV1RequestDto } from '../../dto/requests/v1/create/create-role-v1.request';
import { RolePaginateV1RequestDto } from '../../dto/requests/v1/index/role-paginate-v1.request';
import { UpdateRoleV1RequestDto } from '../../dto/requests/v1/update/update-role-v1.request';
import { RoleV1ResponseDto } from '../../dto/responses/v1/role-v1.response';
import { RoleService } from '../../services/role.service';

@Controller({
    version: '1',
    path: 'roles',
})
export class RoleV1Controller {
    constructor(private readonly roleService: RoleService) {}

    @MessagePattern('auth:roles:fetchPaginate')
    async fetchPaginate(
        @Payload() payload: RolePaginateV1RequestDto,
    ): Promise<IPaginateResponse<RoleV1ResponseDto>> {
        const { data, meta } = await this.roleService.fetchPaginate(payload);

        return {
            data: RoleV1ResponseDto.toResponses(data),
            meta,
        };
    }

    @MessagePattern('auth:roles:findOneById')
    async findOneById(@Payload() id: string): Promise<RoleV1ResponseDto> {
        const data = await this.roleService.findOneById(id);

        return RoleV1ResponseDto.toResponse(data);
    }

    @MessagePattern('auth:roles:create')
    async create(
        @Payload() payload: CreateRoleV1RequestDto,
    ): Promise<RoleV1ResponseDto> {
        const data = await this.roleService.create(payload);

        return RoleV1ResponseDto.toResponse(data);
    }

    @MessagePattern('auth:roles:update')
    async update(
        @Payload() payload: UpdateRoleV1RequestDto,
    ): Promise<RoleV1ResponseDto> {
        const data = await this.roleService.update(payload);

        return RoleV1ResponseDto.toResponse(data);
    }
}
