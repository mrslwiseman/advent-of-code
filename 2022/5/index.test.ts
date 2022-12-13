import { describe, expect, test } from "@jest/globals";
import { getExampleInput } from "../util";
import { main1, main2 } from "./index";

describe("part 1", () => {
  test("must work", async () => {
    const x = await main1(await getExampleInput(__dirname));
  });
});
