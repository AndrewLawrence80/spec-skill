#include <gtest/gtest.h>

// Subject under test
int add(int a, int b) {
    return a + b;
}

// Test case
TEST(MathTest, AddTwoNumbers) {
    EXPECT_EQ(add(2, 2), 4);
}
