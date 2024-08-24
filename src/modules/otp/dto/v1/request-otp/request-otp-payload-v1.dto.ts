import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RequestOtpPayloadV1Dto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
