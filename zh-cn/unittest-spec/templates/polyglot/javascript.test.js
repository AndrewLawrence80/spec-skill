// 使用 Jest / Mocha 语法
const assert = require("assert");

// 被测对象
function add(a, b) {
    return a + b;
}

// 测试套件
describe("MathUtils", () => {
    it("should add two numbers correctly", () => {
        assert.strictEqual(add(2, 2), 4);
    });
});
