// Using Jest / Mocha syntax
const assert = require("assert");

// Subject under test
function add(a, b) {
    return a + b;
}

// Test suite
describe("MathUtils", () => {
    it("should add two numbers correctly", () => {
        assert.strictEqual(add(2, 2), 4);
    });
});
