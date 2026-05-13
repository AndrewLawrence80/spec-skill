const std = @import("std");
const expect = std.testing.expect;

// 被测对象
fn add(a: i32, b: i32) i32 {
    return a + b;
}

test "add two numbers" {
    try expect(add(2, 2) == 4);
}
