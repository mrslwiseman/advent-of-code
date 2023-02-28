import { describe, expect, test } from "@jest/globals";
import assert from "assert/strict";
import { getExampleInput, getInput } from "../util";
import { main1, main2 } from "./index";

// test("part 1", async (t) => {
//   await t.test("must return highest count", async () => {
//     const result = await main1(await getExampleInput(__dirname));
//     assert.equal(result, 24000);
//   });
//   await t.test("must return highest count", async () => {
//     const result = await main1(await getInput(__dirname));
//     assert.equal(result, 69177);
//   });
// });

describe("part 2", () => {
  test("must return sum of highest 3 counts", async () => {
    const result = await main2(await getExampleInput(__dirname));
    expect(result).toEqual(45000);
  });
  test("must return sum of highest 3 counts", async () => {
    const result = await main2(await getInput(__dirname));
    expect(result).toEqual(207456);
  });
});
