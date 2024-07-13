import { IPermission } from "src/databases/interaces/permission.interface";

export class PermissionPaginateV1ResponseDto {
    id?: string;
    name: string;
    key: string;
    description: string;

    static toResponse(data: IPermission): PermissionPaginateV1ResponseDto {
        const response = new PermissionPaginateV1ResponseDto();
        response.id = data.id;
        response.name = data.name;
        response.key = data.key;
        response.description = data.description;

        return response;
    }

    static toResponses(data: IPermission[]): PermissionPaginateV1ResponseDto[] {
        return data.map((item) => this.toResponse(item));
    }
}
