// Using Jest syntax

// Subject under test
function add(a: number, b: number): number {
    return a + b;
}

// Test suite
describe("MathUtils", () => {
    it("should add two numbers correctly", () => {
        expect(add(2, 2)).toBe(4);
    });
});
