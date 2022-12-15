import { describe, expect, test } from "@jest/globals";
import { getExampleInput, getInput } from "../util";
import { main1, parseInput, parseStacks, parseSteps } from "./index";

describe("2022-05-1", () => {
  test("must parse steps input", async () => {
    const input = `move 1 from 2 to 1
    move 3 from 1 to 3
    move 2 from 2 to 1
    move 1 from 1 to 2`;

    const result = parseSteps(input);
    expect(result).toEqual([
      { dest: 1, quantity: 1, source: 2 },
      { dest: 3, quantity: 3, source: 1 },
      { dest: 1, quantity: 2, source: 2 },
      { dest: 2, quantity: 1, source: 1 },
    ]);
  });

  test("must parse stacks input", async () => {
    const input = `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 
    `;

    const result = parseStacks(input);

    /* 

    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

Is repesented by [["Z", "N"], ["M", "C", "D"], ["P"]]
    
*/

    expect(result).toEqual([["Z", "N"], ["M", "C", "D"], ["P"]]);
  });

  test("must parse input", async () => {
    const input = await getExampleInput(__dirname);

    expect(parseInput(input)).toEqual({
      stacks: [["Z", "N"], ["M", "C", "D"], ["P"]],
      steps: [
        { quantity: 1, source: 2, dest: 1 },
        { quantity: 3, source: 1, dest: 3 },
        { quantity: 2, source: 2, dest: 1 },
        { quantity: 1, source: 1, dest: 2 },
      ],
    });
  });

  test("must move items around according to steps", async () => {
    const input = await getInput(__dirname);

    const result = await main1(input);

    expect(result).toEqual("PTWLTDSJV");
  });
});
