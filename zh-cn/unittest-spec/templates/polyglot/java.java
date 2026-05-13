import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

class MathUtilsTest {

    // 被测对象
    int add(int a, int b) {
        return a + b;
    }

    @Test
    void testAddTwoNumbers() {
        assertEquals(4, add(2, 2));
    }
}
