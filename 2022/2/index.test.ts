import test from "node:test";
import assert from "assert/strict";
import { main1, main2 } from "./index";

test("part 1", async (t) => {
  await t.test("must return score of winner", async () => {
    const result = await main1("example");
    assert.equal(result, 15);
  });
  await t.test("must return score of winner 2", async () => {
    const result = await main1("real");
    assert.equal(result, 14069);
  });
});
