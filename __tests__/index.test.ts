import { Delay, sayHello } from "../src"

describe('prompt function', () => {
    const name = "@qdr_tech"
    const sayHelloResponse = `Hello ${name}`;
    let hello: string;

    let timeoutSpy: jest.SpyInstance;

    beforeAll(async () => {
        jest.useFakeTimers();
        timeoutSpy = jest.spyOn(global, 'setTimeout');

        const p: Promise<string> = sayHello(name);
        jest.runOnlyPendingTimers();
        hello = await p;
    });

    // Teardown after assertions
    afterAll(async () => {
        timeoutSpy.mockRestore();
    });

    // Assert if setTImeout is called once
    it(`delay the greeting by default delay (Medium)`, () => {
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(
            expect.any(Function),
            Delay.Medium
        );
    });
    
    // SayHello should return `Hello ${name}`
    it(`sayHello returns ${sayHelloResponse}`, async () => {
        expect(hello).toBe(sayHelloResponse);
    })
})