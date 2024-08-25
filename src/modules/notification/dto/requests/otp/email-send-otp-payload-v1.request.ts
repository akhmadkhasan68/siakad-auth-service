import { SendOTPDataPayloadV1Request } from './email-send-otp-data-payload-v1.request';

export class EmailSendOTPPayloadV1Request {
    email: string;
    data: SendOTPDataPayloadV1Request;
}
