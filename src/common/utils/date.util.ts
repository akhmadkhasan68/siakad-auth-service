// import moment from 'moment-timezone';
import * as moment from "moment-timezone";
import { config } from "src/config";

export class DateUtil {
    static parseDatetimeObj(obj: { [x: string]: any }, timezone: string): any {
        if (typeof obj != 'object') {
            return obj;
        }

        for (const oldName in obj) {
            // Recursion
            if (typeof obj[oldName] == 'object') {
                obj[oldName] = DateUtil.parseDatetimeObj(obj[oldName], timezone);
            }
        }

        if (obj instanceof Date) {
            const date = moment.tz(obj, timezone).format('YYYY-MM-DD HH:mm:ss');

            return date;
        }

        return obj;
    }

    static getDateNow(timezone?: string): Date {
        const tz = timezone || config.timezone || 'UTC';

        return moment.tz(tz).toDate();
    }

    static getUnixTimeNow(timezone?: string): number {
        const tz = timezone || config.timezone || 'UTC';

        return moment.tz(tz).unix();
    }

    static formatDate(date: Date, format?: string, timezone?: string): string {
        const tz = timezone || config.timezone || 'UTC';
        const defaultFormat = format || 'YYYY-MM-DD HH:mm:ss';

        return moment.tz(date, tz).format(defaultFormat);
    }
}
