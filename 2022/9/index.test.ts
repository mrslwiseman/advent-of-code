import { describe, expect, test } from "@jest/globals";
import { getExampleInput, getInput } from "../util";
import { calculateTailPosition, main1, main2 } from "./index";

describe("2022-09-1", () => {
  test("tail position calculation function", () => {
    const inputs = [
      { prevHeadX: 0, prevHeadY: 0, headX: 1, headY: 0, tailX: 0, tailY: 0 },
      { prevHeadX: 1, prevHeadY: 0, headX: 2, headY: 0, tailX: 0, tailY: 0 },
      /*
..T...
..>H..
......
......
s.....
      */
      { prevHeadX: 2, prevHeadY: 3, headX: 3, headY: 3, tailX: 2, tailY: 4 },
      /* 
......
...TH.
......
......
s.....
      */
      { prevHeadX: 3, prevHeadY: 3, headX: 4, headY: 3, tailX: 2, tailY: 4 },
    ];

    const expectedTailPositions = [
      { tailX: 0, tailY: 0 },
      { tailX: 1, tailY: 0 },
      { tailX: 2, tailY: 4 },
      { tailX: 3, tailY: 3 },
    ];

    inputs.forEach((input, position) => {
      const result = calculateTailPosition(
        input.prevHeadX,
        input.prevHeadY,
        input.headX,
        input.headY,
        input.tailX,
        input.tailY
      );

      expect(result).toEqual(expectedTailPositions[position]);
    });
  });

  test("must process example correctly", async () => {
    const input = await getExampleInput(__dirname);

    const result = await main1(input);

    expect(result).toEqual(13);
  });
  test("must process real input correct", async () => {
    const input = await getInput(__dirname);

    const result = await main1(input);

    expect(result).toEqual(6498);
  });
});

describe.skip("2022-09-2", () => {
  test("must process example correctly", async () => {
    const input = await getExampleInput(__dirname);

    const result = await main2(input);

    expect(result).toEqual("X");
  });
  test("must process real input correct", async () => {
    const input = await getInput(__dirname);

    const result = await main2(input);

    expect(result).toEqual("X");
  });
});
