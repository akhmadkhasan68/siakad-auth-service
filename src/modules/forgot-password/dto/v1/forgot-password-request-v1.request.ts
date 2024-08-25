import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordRequestV1Request {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
