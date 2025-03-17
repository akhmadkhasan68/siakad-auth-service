import { JwtService } from "@nestjs/jwt";
import { IUser } from "src/databases/interaces/user.interface";
import { IJwtPayload } from "../interfaces/jwt-payload.interface";

export class JwtUtil {
    static generateToken(
        user: IUser,
        jwtService: JwtService,
    ): string {
        const payload: IJwtPayload = {
            id: user.id,
        };

        return jwtService.sign(payload);
    }
}