// 使用 Jest 语法

// 被测对象
function add(a: number, b: number): number {
    return a + b;
}

// 测试套件
describe("MathUtils", () => {
    it("should add two numbers correctly", () => {
        expect(add(2, 2)).toBe(4);
    });
});
