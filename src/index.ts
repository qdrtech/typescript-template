import * as readLine from 'readline';

/**
 * Create Interface for readline
 */
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Enum - Predefined Values: Slow, Medium, Fast (miliseconds)
 */
export enum Delay {
    Slow = 10000,
    Medium = 1000,
    Fast = 100
}

/**
 * Map of Delay Enum to Number
 */
const delayMap = new Map<string, Delay>([
    ["1", Delay.Slow],
    ["2", Delay.Medium],
    ["3", Delay.Fast]
]);

/**
 * Returns a Promise<string>
 * 
 * @param {string} name : Inputted Name
 * @param {delay} [delay=Delay.Medium] - A number of miliseconds that controls how fast the promise resolves
 * @returns {Promise<string>}
 */
const delayHello = (
    name: string,
    delay: Delay
): Promise<string> => {
    return new Promise<string>((resolve: (value: string) => void) => {
        setTimeout(() => resolve(`Hello ${name}`), delay);
    });
}

/**
 * Handler which manages calling @function {delayHello} returning the inputted name
 */
export const sayHello = async (name: string, delay?: Delay): Promise<string> => {
    return delayHello(name, delay ?? Delay.Medium);
}

/**
 * Helper to prompt input from the user
 * @param query 
 * @returns {Promise<string>}
 */
export const prompt = (query: string): Promise<string> => {
    return new Promise<string>((resolve) => rl.question(query, resolve));
}

/**
 * Greeting handler which reads input from the user and returns name on a setTimeout delay
 */
const greeting = async ():Promise<void> => {
    let name: string;
    let delay: string;

    do {
        name = await (prompt(`Enter Name: `));

        if (!name?.trim()) {
            continue;
        }

        delay = await (prompt(`Enter Delay, 1: Slow, 2:Medium, 3:Fast: `));
    } while (!name?.trim() || !delayMap.has(delay));

    rl.close();

    const message = await sayHello(name, delayMap.get(delay));

    console.info(message);
}

(() => {
    greeting();
})();
