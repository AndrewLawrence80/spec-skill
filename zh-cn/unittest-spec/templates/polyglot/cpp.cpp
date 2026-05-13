#include <gtest/gtest.h>

// 被测对象
int add(int a, int b) {
    return a + b;
}

// 测试用例
TEST(MathTest, AddTwoNumbers) {
    EXPECT_EQ(add(2, 2), 4);
}
