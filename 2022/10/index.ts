import { resourceLimits } from "worker_threads";

type Command = "noop" | "addx";
interface Line {
  command: Command;
  amount: number;
}

function isDirection(str: string): asserts str is Command {
  if (!/noop|addx/.test(str)) {
    throw new Error(`invalid command ${str}`);
  }
}

function parseLine(line: string): Line {
  const [command, amount] = line.split(" ");
  isDirection(command);
  return {
    command,
    amount: Number(amount),
  };
}

let results: { tick: number; x: number; result: number }[] = [];
// 20th cycle and every 40 cycles after that (that is, during the 20th, 60th, 100th, 140th, 180th, and 220th
const ticksToCollect = [20, 60, 100, 140, 180, 220];

function collectResult(ticks: number, x: number) {
  console.log({ ticks, x });

  const o = ticksToCollect[0];
  if (ticks === o) {
    ticksToCollect.shift();
    results.push({ tick: o, x, result: x * o });
  }
}
export async function main1(data: string) {
  //
  const stack = data.split("\n").map((line) => parseLine(line));
  let ticks = 0;
  let x = 1;

  while (stack.length > 0) {
    const op = stack.shift();
    console.log({ op });

    if (!op) {
      break;
    }

    // 1 tick
    if (op.command === "noop") {
      ticks += 1;
      collectResult(ticks, x);
    }

    // 2 ticks
    if (op.command === "addx") {
      for (let i = 0; i < 2; i++) {
        ticks += 1;
        collectResult(ticks, x);
        if (i === 1) {
          x += op.amount;
        }
      }
    }
  }
  console.log(results);
  const sum = results.reduce((acc, curr) => {
    return curr.result + acc;
  }, 0);
  console.log(sum);
  return sum;
}

export async function main2(data: string) {
  //
}
