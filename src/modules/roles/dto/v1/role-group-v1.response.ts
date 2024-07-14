import { IRoleGroup } from 'src/databases/interaces/role-group.interface';

export class RoleGroupV1ResponseDto {
    id?: string;
    name: string;
    key: string;
    description: string;

    static toResponse(data: IRoleGroup): RoleGroupV1ResponseDto {
        const response = new RoleGroupV1ResponseDto();
        response.id = data.id;
        response.name = data.name;
        response.key = data.key;
        response.description = data.description;

        return response;
    }

    static toResponses(data: IRoleGroup[]): RoleGroupV1ResponseDto[] {
        return data.map((item) => this.toResponse(item));
    }
}
