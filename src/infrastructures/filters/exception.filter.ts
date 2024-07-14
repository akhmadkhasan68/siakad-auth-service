import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ForbiddenException,
    HttpStatus,
    InternalServerErrorException,
    NotFoundException,
    RpcExceptionFilter,
    UnauthorizedException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { IApiResponse } from 'src/common/interfaces/response.interface';
import { EntityNotFoundError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements RpcExceptionFilter {
    catch(exception: any, _: ArgumentsHost): Observable<any> {
        const exceptionResponse = exception.getResponse();
        const data = exceptionResponse['data'] ?? null;
        const message = exceptionResponse['message'] ?? 'Internal Server Error';

        switch (true) {
            case exception instanceof UnprocessableEntityException:
                return throwError((): IApiResponse<null> => {
                    return {
                        code: HttpStatus.UNPROCESSABLE_ENTITY,
                        message,
                        errors: exception.getResponse(),
                        data,
                    };
                });
            case exception instanceof UnauthorizedException:
                return throwError((): IApiResponse<null> => {
                    return {
                        code: HttpStatus.UNAUTHORIZED,
                        message,
                        errors: null,
                        data,
                    };
                });
            case exception instanceof ForbiddenException:
                return throwError((): IApiResponse<null> => {
                    return {
                        code: HttpStatus.FORBIDDEN,
                        message,
                        errors: null,
                        data,
                    };
                });
            case exception instanceof NotFoundException:
                return throwError((): IApiResponse<null> => {
                    return {
                        code: HttpStatus.NOT_FOUND,
                        message,
                        errors: null,
                        data,
                    };
                });
            case exception instanceof InternalServerErrorException:
                return throwError((): IApiResponse<null> => {
                    return {
                        code: HttpStatus.INTERNAL_SERVER_ERROR,
                        message,
                        errors: null,
                        data,
                    };
                });
            case exception instanceof BadRequestException:
                return throwError((): IApiResponse<null> => {
                    return {
                        code: HttpStatus.BAD_REQUEST,
                        message,
                        errors: null,
                        data,
                    };
                });
            case exception instanceof EntityNotFoundError:
                return throwError((): IApiResponse<null> => {
                    return {
                        code: HttpStatus.NOT_FOUND,
                        message,
                        errors: null,
                        data,
                    };
                });
            default:
                return throwError((): IApiResponse<null> => {
                    return {
                        code: HttpStatus.INTERNAL_SERVER_ERROR,
                        message,
                        errors: null,
                        data,
                    };
                });
        }
    }
}
