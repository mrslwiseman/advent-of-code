import { describe, expect, test } from "@jest/globals";
import { getExampleInput, getInput } from "../util";
import { main1, main2 } from "./index";

describe.only("2022-08-1", () => {
  test("must process example correctly", async () => {
    const input = await getExampleInput(__dirname);

    const result = await main1(input.split("\n"));

    expect(result).toEqual(21);
  });
  test("must process real input correct", async () => {
    const input = await getInput(__dirname);

    const result = await main1(input.split("\n"));

    expect(result).toEqual(1812);
  });
});

// describe("2022-08-2", () => {
//   test("must process example correctly", async () => {
//     const input = await getExampleInput(__dirname);

//     const result = await main2(input);

//     expect(result).toEqual("X");
//   });
//   test("must process real input correct", async () => {
//     const input = await getInput(__dirname);

//     const result = await main2(input);

//     expect(result).toEqual("X");
//   });
// });
