export const convertToTitleCase = (str: string): string => {
    const strToLowerCase = str.toLowerCase();
    return strToLowerCase.replace(/\b\w/g, (char: string): string => char.toUpperCase());
}
