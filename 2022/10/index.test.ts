import { describe, expect, test } from "@jest/globals";
import { getExampleInput, getInput } from "../util";
import { main1, main2 } from "./index";

describe.only("2022-XX-X", () => {
  // test("must process example correctly", async () => {
  //   const input = await getExampleInput(__dirname);

  //   const result = await main1(input);

  //   expect(result).toEqual(13140);
  // });
  test("must process real input correct", async () => {
    const input = await getInput(__dirname);

    const result = await main1(input);

    expect(result).toEqual(13140);
  });
});

describe("2022-XX-X", () => {
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
