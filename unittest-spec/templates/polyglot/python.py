import pytest

# Subject under test
def add(a: int, b: int) -> int:
    return a + b

# Test case
def test_add():
    assert add(2, 2) == 4

@pytest.mark.parametrize("a,b,expected", [
    (1, 1, 2),
    (0, 5, 5),
    (-1, 1, 0)
])
def test_add_parameterized(a, b, expected):
    assert add(a, b) == expected
