import { describe, expect, test } from "@jest/globals";
import assert from "assert/strict";
import { getExampleInput, getInput } from "../util";
import { getInferiorHand, getSuperiorHand, main1, main2 } from "./index";

/* 

Rock A,X
Paper B,Y
Scissors C,Z

X Lose
Y Draw
Z Win

*/

describe("part 1", () => {
  test("must return score of winner", async () => {
    const result = await main1(await getExampleInput(__dirname));
    assert.equal(result, 15);
  });
  test("must return score of winner 2", async () => {
    const result = await main1(await getInput(__dirname));
    assert.equal(result, 14069);
  });
});

describe("get superior hand", () => {
  test("paper beats rock", async () => {
    const { result } = getSuperiorHand("A");
    assert.equal(result, "paper");
  });
  test("rock beats scissors", async () => {
    const { result } = getSuperiorHand("B");
    assert.equal(result, "scissors");
  });
  test("must return rock to beat scissors", async () => {
    const { result } = getSuperiorHand("C");
    assert.equal(result, "rock");
  });
});

// /*

// Rock A,X
// Paper B,Y
// Scissors C,Z

// */

describe("get inferior hand", () => {
  test("must return ", async () => {
    const { result } = getInferiorHand("A");
    assert.equal(result, "scissors");
  });
  test("must return scissors to lose to rock", async () => {
    const { result } = getInferiorHand("B");
    assert.equal(result, "rock");
  });
  test("must return paper to lose to scissors", async () => {
    const { result } = getInferiorHand("C");
    assert.equal(result, "paper");
  });
});

describe("part 2", () => {
  test("must return total score", async () => {
    const result = await main2(await getExampleInput(__dirname));
    assert.equal(result, 12);
  });
  test("must return total score", async () => {
    const result = await main2(await getInput(__dirname));
    assert.equal(result, 12411);
  });
});
