import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';
import { IApiResponse } from 'src/common/interfaces/response.interface';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost) {
        const error = exception.getError() as IApiResponse<null>;
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        try {
            const code = 
                // error?.code || 
                HttpStatus.INTERNAL_SERVER_ERROR;
            const message = error?.message || 'Internal Server Error';
            const errors =
                // error?.errors ||
                'Something went wrong. Please try again later.';
            const data = error?.data || null;

            response.status(code).json(<IApiResponse<null>>{
                code,
                data,
                message,
                errors,
            });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(<
                IApiResponse<null>
            >{
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                data: null,
                message: 'Internal Server Error',
                errors: 'Something went wrong. Please try again later.',
            });
        }

        return;
    }
}
