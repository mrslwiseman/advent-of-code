import { describe, expect, test } from "@jest/globals";
import assert from "assert/strict";
import { getExampleInput, getInput } from "../util";
import {
  chunk,
  findCommonGroupItems,
  findCommonItems,
  getPriority,
  main1,
  main2,
  splitCompartments,
} from "./index";

describe("part 1", () => {
  test("must split compartments of even length", async () => {
    const items = "abc123";
    const [a, b] = splitCompartments(items);
    expect(a).toEqual(["a", "b", "c"]);
    expect(b).toEqual(["1", "2", "3"]);
  });

  test("must return common items between compartments", async () => {
    const input = "vJrwpWtwJgWrhcsFMMfFFhFp";
    const [partA, partB] = splitCompartments(input);

    const commonItem = findCommonItems(partA, partB);
    expect(commonItem).toEqual("p");
  });

  test("must return common items between compartments", async () => {
    const input = "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL";
    const [partA, partB] = splitCompartments(input);

    const commonItem = findCommonItems(partA, partB);
    expect(commonItem).toEqual("L");
  });

  test("must return char code 0 for a", async () => {
    const priority = getPriority("a");
    expect(priority).toEqual(1);
  });

  test("must return char code 26 for z", async () => {
    const priority = getPriority("z");
    expect(priority).toEqual(26);
  });

  test("must return char code 27 for A", async () => {
    const priority = getPriority("A");
    expect(priority).toEqual(27);
  });

  test("must return char code 52 for Z", async () => {
    const priority = getPriority("Z");
    expect(priority).toEqual(52);
  });

  test("must return char code 16 for p", async () => {
    const priority = getPriority("p");
    expect(priority).toEqual(16);
  });

  test("example: must calculate total sum for all backpacks", async () => {
    const toatl = await main1(await getExampleInput(__dirname));
    expect(toatl).toEqual(157);
  });

  test("must group backbacks by 3", async () => {
    const input = ["a", "b", "c", "d", "e", "f"];

    const result = chunk(input, 3);
    expect(result).toEqual([
      ["a", "b", "c"],
      ["d", "e", "f"],
    ]);
  });

  test("must find common item in group of 3", async () => {
    const input = `vJrwpWtwJgWrhcsFMMfFFhFp
    jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
    PmmdzqPrVvPwwTWBwg
    wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`
      .split("\n")
      .map((s) => s.trim());

    const [a, b] = chunk(input, 3);

    expect(findCommonGroupItems(a)).toEqual("r");
    expect(findCommonGroupItems(b)).toEqual("Z");
  });

  test("example: must calculate total sum for all backpacks", async () => {
    const total = await main2(await getExampleInput(__dirname));
    expect(total).toEqual(70);
  });

  test("real: must calculate total sum for all backpacks", async () => {
    const total = await main2(await getInput(__dirname));
    expect(total).toEqual(2805);
  });
});
