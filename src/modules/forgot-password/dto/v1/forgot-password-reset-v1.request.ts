import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Match } from 'src/infrastructures/decorators/match.decorator';

export class ForgotPasswordResetV1Request {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    token: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    @MinLength(8)
    @Match('password')
    passwordConfirmation: string;
}
