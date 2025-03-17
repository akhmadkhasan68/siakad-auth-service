import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DateUtil } from 'src/common/utils/date.util';
import { StringUtil } from 'src/common/utils/string.util';
import { config } from '../../config';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        return next.handle().pipe(
            map((data: any) => {
                if (data?.data) {
                    data.data = StringUtil.snakeCaseKeyObj(data.data);
                    data.data = DateUtil.parseDatetimeObj(
                        data.data,
                        request.headers['timezone'] != undefined
                            ? request.headers['timezone']?.toString()
                            : config.timezone,
                    );
                }

                if (data?.meta) {
                    data.meta = {
                        page: StringUtil.snakeCaseKeyObj(data.meta).page,
                        perPage: StringUtil.snakeCaseKeyObj(data.meta).per_page,
                        total: StringUtil.snakeCaseKeyObj(data.meta).total,
                        totalPage: StringUtil.snakeCaseKeyObj(data.meta).total_page,
                    }
                    data.meta = DateUtil.parseDatetimeObj(
                        data.meta,
                        request.headers['timezone'] != undefined
                            ? request.headers['timezone']?.toString()
                            : config.timezone,
                    );
                }

                return data;
            }),
        );
    }
}
