import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
    ForbiddenException,
    HttpException,
    HttpStatus,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { Response } from 'express';
import { IApiErrorResponse } from 'src/common/interfaces/response.interface';
import { EntityNotFoundError } from 'typeorm';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        switch (true) {
            case exception instanceof UnprocessableEntityException:
                const exceptionResponse = exception.getResponse();
                const data = exceptionResponse['data'] ?? null;

                response.status(status).json(<IApiErrorResponse>{
                    message: exceptionResponse['message'],
                    errors: data,
                });
                return;
            case exception instanceof UnauthorizedException:
                response.status(status).json(<IApiErrorResponse>{
                    message: exception.message ?? 'Not Authorized',
                    errors: null,
                });
                return;
            case exception instanceof ForbiddenException:
                response.status(status).json(<IApiErrorResponse>{
                    message: exception.message ?? 'Forbidden Access',
                    errors: null,
                });
                return;
            case exception instanceof NotFoundException:
                response.status(HttpStatus.NOT_FOUND).json(<IApiErrorResponse>{
                    code: 404,
                    message: 'Not Found: ' + exception.message,
                    errors: null,
                });
                return;
            case exception instanceof InternalServerErrorException:
                response.status(status).json(<IApiErrorResponse>{
                    message: 'Server Error',
                    errors: null,
                });
                return;
            case exception instanceof BadRequestException:
                response.status(status).json(<IApiErrorResponse>{
                    message: exception.message,
                    errors: null,
                });
                return;
            default:
                response.status(status).json(<IApiErrorResponse>{
                    message: exception.getResponse()['message'],
                    errors: exception.getResponse()['error'],
                });
                return;
        }
    }
}

@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: EntityNotFoundError, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = 404;

        response.status(status).json(<IApiErrorResponse>{
            message: 'Data not found',
            errors: null,
        });
    }
}
