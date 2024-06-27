/**
 * Enum - Predefined Values: Slow, Medium, Fast (miliseconds)
 */
export enum Delay {
    Slow = 10000,
    Medium = 1000,
    Fast = 100
}

/**
 * Returns a Promise<string>
 * 
 * @param {string} name : Inputted Name
 * @param {delay} [delay=Delay.Medium] - A number of miliseconds that controls how fast the promise resolves
 * @returns {Promise<string>}
 */

const delayHello = (
    name:string,
    delay:Delay
):Promise<string> =>  {
    return new Promise<string>((resolve:(value:string) => void) => {
        setTimeout(() => resolve(`Hello ${name}`), delay);
    });
}

/**
 * Handler which manages calling @function {delayHello} returning the inputted name
 */
export const sayHello = async (name:string, delay?:Delay):Promise<string> => {
    return delayHello(name, delay ?? Delay.Medium);
}
