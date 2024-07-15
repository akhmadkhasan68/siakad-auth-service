export const convertToTitleCase = (str: string): string => {
    const strToLowerCase = str.toLowerCase();
    return strToLowerCase.replace(/\b\w/g, (char: string): string =>
        char.toUpperCase(),
    );
};

export const convertToUpperSnakeCase = (str: string): string => {
    return str.toUpperCase().replace(/ /g, '_');
};
