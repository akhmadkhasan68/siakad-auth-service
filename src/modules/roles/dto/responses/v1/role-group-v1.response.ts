import { IRoleGroup } from 'src/databases/interaces/role-group.interface';

export class RoleGroupV1Response {
    id?: string;
    name: string;
    key: string;
    description: string;

    static toResponse(data: IRoleGroup): RoleGroupV1Response {
        const response = new RoleGroupV1Response();
        response.id = data.id;
        response.name = data.name;
        response.key = data.key;
        response.description = data.description;

        return response;
    }

    static toResponses(data: IRoleGroup[]): RoleGroupV1Response[] {
        return data.map((item) => this.toResponse(item));
    }
}
