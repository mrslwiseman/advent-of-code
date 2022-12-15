import { describe, expect, test } from "@jest/globals";
import { getExampleInput, getInput } from "../util";
import { findMarker, main1, main2 } from "./index";

describe("2022-06-1", () => {
  test("must find start of packet markers for example inputs", async () => {
    const input = await getExampleInput(__dirname);

    const result = await main1(input);
    expect(result).toEqual([5, 6, 10, 11]);
  });
  test("must find start of packet markers for real input", async () => {
    const input = await getInput(__dirname);

    const result = await main1(input);
    expect(result).toEqual([1802]);
  });
});

describe("2022-06-2", () => {
  test("must find message markers for example inputs", async () => {
    const result = await main2("mjqjpqmgbljsphdztnvjfqwrcgsmlb");
    expect(result).toEqual([19]);
  });
  test("must find message markers for example inputs", async () => {
    const input = await getExampleInput(__dirname);

    const result = await main2(input);

    expect(result).toEqual([23, 23, 29, 26]);
  });
  test("must find message markers for real inputs", async () => {
    const input = await getInput(__dirname);

    const result = await main2(input);

    expect(result).toEqual([3551]);
  });
});
