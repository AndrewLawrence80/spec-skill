package mathutils

import "testing"

// 被测对象
func Add(a, b int) int {
	return a + b
}

// 测试用例
func TestAdd(t *testing.T) {
	result := Add(2, 2)
	if result != 4 {
		t.Errorf("Expected 4, got %d", result)
	}
}

// 表驱动测试
func TestAddTable(t *testing.T) {
	tests := []struct {
		name     string
		a, b     int
		expected int
	}{
		{"positive numbers", 2, 2, 4},
		{"zero", 0, 5, 5},
		{"negative", -1, 1, 0},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := Add(tt.a, tt.b); got != tt.expected {
				t.Errorf("Add(%d, %d) = %d, want %d", tt.a, tt.b, got, tt.expected)
			}
		})
	}
}
