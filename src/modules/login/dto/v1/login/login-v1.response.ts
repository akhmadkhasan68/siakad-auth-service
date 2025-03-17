import { DateUtil } from "src/common/utils/date.util";
import { config } from "src/config";
import { IUser } from "src/databases/interaces/user.interface";
import { RoleV1Response } from "src/modules/roles/dto/responses/v1/role-v1.response";

export class LoginV1Response {
    user: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;

        roles?: RoleV1Response[];
    };

    accessToken: string;
    accessTokenExpiresIn: string;

    static toResponse(user: IUser, accessToken: string): LoginV1Response {
        const now = DateUtil.getDateNow(config.timezone);
        const accessTokenExpiresIn = now.getTime() + config.jwt.expiresInMilisecond;
        const expiresInDate = new Date(accessTokenExpiresIn);

        const response = new LoginV1Response();
        response.user = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
        };

        if (user.roles) {
            response.user.roles = RoleV1Response.toResponses(user.roles);
        }

        response.accessToken = accessToken;
        response.accessTokenExpiresIn = DateUtil.formatDate(expiresInDate, config.dateFormat, config.timezone);
        
        return response;
    }
}
