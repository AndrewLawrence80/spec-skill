#include <stdarg.h>
#include <stddef.h>
#include <setjmp.h>
#include <stdint.h>
#include <cmocka.h>

/* 被测对象 */
int add(int a, int b) {
    return a + b;
}

/* 测试用例 */
static void test_add(void **state) {
    (void) state; /* unused */
    assert_int_equal(add(2, 2), 4);
}

int main(void) {
    const struct CMUnitTest tests[] = {
        cmocka_unit_test(test_add),
    };
    return cmocka_run_group_tests(tests, NULL, NULL);
}
