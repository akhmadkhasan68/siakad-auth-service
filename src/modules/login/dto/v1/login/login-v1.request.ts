import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginV1Request {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
