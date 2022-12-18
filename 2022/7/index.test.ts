import { describe, expect, test } from "@jest/globals";
import { inherits } from "util";
import { getExampleInput, getInput } from "../util";
import { main1, main2 } from "./index";

describe("2022-07-1", () => {
  test("must process example correctly", async () => {
    const input = await getExampleInput(__dirname);

    const result = main1(input);
    expect(result).toEqual(95437);
  });
  test("must process real input correctly", async () => {
    const input = await getInput(__dirname);

    const result = main1(input);
    expect(result).toEqual(1915606);
  });
});

describe("2022-07-2", () => {
  test("must process example correctly", async () => {
    const input = await getExampleInput(__dirname);

    const result = main2(input);
    console.log({ result });
  });
  test("must process example correctly", async () => {
    const input = await getInput(__dirname);

    const result = main2(input);
    console.log({ result });
  });
});
