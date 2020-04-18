export function pad(num: number, size: number): string {
    if (num.toString().length >= size) return num.toString();
    return (Math.pow(10, size) + Math.floor(num)).toString().substring(1);
}