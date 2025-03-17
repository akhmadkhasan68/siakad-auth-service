import { IRole } from 'src/databases/interaces/role.interface';
import { RoleGroupV1Response } from './role-group-v1.response';

export class RoleV1Response {
    id?: string;
    name: string;
    key: string;
    description: string;
    roleGroup?: RoleGroupV1Response;

    static toResponse(data: IRole): RoleV1Response {
        const response = new RoleV1Response();
        response.id = data.id;
        response.name = data.name;
        response.key = data.key;
        response.description = data.description;

        if (data.roleGroup) {
            response.roleGroup = RoleGroupV1Response.toResponse(
                data.roleGroup,
            );
        }

        return response;
    }

    static toResponses(data: IRole[]): RoleV1Response[] {
        return data.map((item) => this.toResponse(item));
    }
}
