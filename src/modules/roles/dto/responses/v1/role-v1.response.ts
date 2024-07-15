import { IRole } from 'src/databases/interaces/role.interface';
import { RoleGroupV1ResponseDto } from './role-group-v1.response';

export class RoleV1ResponseDto {
    id?: string;
    name: string;
    key: string;
    description: string;
    roleGroup?: RoleGroupV1ResponseDto;

    static toResponse(data: IRole): RoleV1ResponseDto {
        const response = new RoleV1ResponseDto();
        response.id = data.id;
        response.name = data.name;
        response.key = data.key;
        response.description = data.description;

        if (data.roleGroup) {
            response.roleGroup = RoleGroupV1ResponseDto.toResponse(
                data.roleGroup,
            );
        }

        return response;
    }

    static toResponses(data: IRole[]): RoleV1ResponseDto[] {
        return data.map((item) => this.toResponse(item));
    }
}
