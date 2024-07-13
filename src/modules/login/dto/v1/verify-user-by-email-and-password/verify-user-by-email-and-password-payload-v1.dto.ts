import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class VerifyUserByEmailAndPasswordPayloadV1Dto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
