import { describe, expect, test } from "@jest/globals";
import { main1, main2, parseAssignments } from "./index";

describe("part 1", () => {
  test("must parse assignment lines correctly", async () => {
    const line = "2-4,6-8";

    expect(parseAssignments(line)).toEqual([
      {
        start: 2,
        end: 4,
      },
      {
        start: 6,
        end: 8,
      },
    ]);
  });

  test("must return total count of overlaps", async () => {
    const x = await main1("example");

    expect(x).toEqual(2);
  });

  test("must return total count of overlaps", async () => {
    const x = await main1("real");

    expect(x).toEqual(456);
  });
});

describe("part 2", () => {
  test("must return total count of overlaps", async () => {
    const x = await main2("example");

    expect(x).toEqual(4);
  });
  test("must return total count of overlaps", async () => {
    const x = await main2("real");

    expect(x).toEqual(808);
  });
});
