import { IPermission } from 'src/databases/interaces/permission.interface';

export class PermissionV1ResponseDto {
    id?: string;
    name: string;
    key: string;
    description: string;

    static toResponse(data: IPermission): PermissionV1ResponseDto {
        const response = new PermissionV1ResponseDto();
        response.id = data.id;
        response.name = data.name;
        response.key = data.key;
        response.description = data.description;

        return response;
    }

    static toResponses(data: IPermission[]): PermissionV1ResponseDto[] {
        return data.map((item) => this.toResponse(item));
    }
}
