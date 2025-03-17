import * as _ from 'lodash';

export class StringUtil {
    static snakeCaseKeyObj(obj: { [x: string]: any }): { [x: string]: any } {
        if (typeof obj != 'object') return obj;

        for (const oldName in obj) {
            // Camel to underscore
            const newName = _.snakeCase(oldName);

            // Only process if names are different
            if (newName != oldName) {
                // Check for the old property name to avoid a ReferenceError in strict mode.
                if (obj.hasOwnProperty(oldName)) {
                    obj[newName] = obj[oldName];
                    delete obj[oldName];
                }
            }

            // Recursion
            if (typeof obj[newName] == 'object') {
                obj[newName] = StringUtil.snakeCaseKeyObj(obj[newName]);
            }
        }
        return obj;
    }

    static camelCaseKeyObj(obj: { [x: string]: any }): { [x: string]: any } {
        if (typeof obj != 'object') return obj;

        for (const oldName in obj) {
            const newName = _.camelCase(oldName);

            if (newName != oldName) {
                if (obj.hasOwnProperty(oldName)) {
                    obj[newName] = obj[oldName];
                    delete obj[oldName];
                }
            }

            if (typeof obj[newName] == 'object') {
                obj[newName] = StringUtil.camelCaseKeyObj(obj[newName]);
            }
        }
        return obj;
    }

    static convertToTitleCase(str: string): string {
        const strToLowerCase = str.toLowerCase();
        return strToLowerCase.replace(/\b\w/g, (char: string): string =>
            char.toUpperCase(),
        );
    }

    static convertToUpperSnakeCase(str: string): string {
        return str.toUpperCase().replace(/ /g, '_');
    }
}
