import { calculateMathExpressions } from "./mathParser";

describe("calculateMathExpressions", () => {
  test("calculates basic math expressions", () => {
    expect(calculateMathExpressions("4+5")).toBe("9");
    expect(calculateMathExpressions("10+20-5")).toBe("25");
    expect(calculateMathExpressions("The result of 4+5 is unknown")).toBe(
      "The result of 9 is unknown"
    );
  });

  test("ignores invalid expressions", () => {
    expect(calculateMathExpressions("random text")).toBe("random text");
    expect(calculateMathExpressions("4++5")).toBe("4++5");
  });

  test("handles spaces in math expressions", () => {
    expect(calculateMathExpressions("4 + 5")).toBe("9");
    expect(calculateMathExpressions("10 + 20 - 5")).toBe("25");
  });
});
