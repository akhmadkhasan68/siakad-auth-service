import { IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordVerifyV1Request {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    token: string;
}
