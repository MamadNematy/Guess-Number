import { describe, expect, it } from "vitest";
import { judge, randomTarget, range, trend, validate, type Guess } from "./game";

describe("game rules", () => {
  it("judges a guess", () => {
    expect(judge(50, 30)).toBe("high");
    expect(judge(10, 30)).toBe("low");
    expect(judge(30, 30)).toBe("correct");
  });

  it("validates the input", () => {
    expect(validate("42", 100)).toBe(42);
    expect(validate(" 7 ", 100)).toBe(7);
    for (const bad of ["", "0", "101", "4.5", "-3", "abc"]) expect(validate(bad, 100)).toBeNull();
  });

  it("always picks a target inside the range", () => {
    for (let i = 0; i < 500; i++) {
      const t = randomTarget(50);
      expect(t).toBeGreaterThanOrEqual(1);
      expect(t).toBeLessThanOrEqual(50);
    }
  });

  it("counts misses on the same side in a row", () => {
    expect(trend(["high", "high", "high"])).toBe(2);
    expect(trend(["high", "low", "low"])).toBe(1);
    expect(trend(["low"])).toBe(0);
  });

  it("narrows the possible range", () => {
    const g: Guess[] = [{ value: 50, hint: "high" }, { value: 20, hint: "low" }];
    expect(range(g, 100)).toEqual([21, 49]);
  });
});
