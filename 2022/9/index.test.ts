import { describe, expect, test } from "@jest/globals";
import { getExampleInput, getInput } from "../util";
import { main1, main2, Rope } from "./index";

describe("2022-09-1", () => {
  test("tail position calculation function", () => {
    const rope = new Rope(1, 0, 0);

    rope.head.move("R", 4);

    expect(rope.head.x).toEqual(4);
    expect(rope.head.y).toEqual(0);
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

describe.only("2022-09-2", () => {
  test("must process example correctly", async () => {
    const input = await getExampleInput(__dirname);

    const result = await main2(input);

    expect(result).toEqual(36);
  });
  // test("must process real input correct", async () => {
  //   const input = await getInput(__dirname);

  //   const result = await main2(input);

  //   expect(result).toEqual("X");
  // });
});
