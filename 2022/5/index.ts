type Column = number;

export type Step = {
  quantity: number;
  source: Column;
  dest: Column;
};

export type Stack = string[];

export type ParsedInput = {
  stacks: Stack[];
  steps: Step[];
};

export function parseStacks(input: string): string[][] {
  function getStack(position: number) {
    return Math.ceil(position / 4) - 1;
  }

  const stacks = input.split("\n").reduce<string[][]>((acc, line) => {
    if (line.length <= 1) {
      return acc;
    }
    const layer = line.split("");
    layer.forEach((value, position) => {
      const stack = getStack(position);
      if (/[\s\d\[\]]/g.test(value)) {
        return;
      }

      if (!acc[stack]) {
        acc[stack] = [];
      }
      acc[stack].unshift(value);
    });

    return acc;
  }, []);
  return stacks;
}

export function parseSteps(rawStackInput: string): Step[] {
  const lines = rawStackInput
    .split("\n")
    .filter((line) => /done|\s+/i.test(line))
    .map((line) => {
      const [, quantity, , source, , dest] = line
        .trim()
        .split(" ")
        .map((n) => Number(n));
      return { quantity, source, dest };
    });
  return lines;
}

export function parseInput(input: string): ParsedInput {
  const [a, b] = input.split("\n\n");
  const stacks = parseStacks(a);
  const steps = parseSteps(b);
  return { stacks, steps };
}

function mutateStacks(input: ParsedInput) {
  const next = input.steps.reduce((acc, { quantity, source, dest }) => {
    const removed = acc[source - 1].splice(acc[source - 1].length - quantity);
    acc[dest - 1] = [...acc[dest - 1], ...removed.reverse()];
    return acc;
  }, input.stacks);

  return next;
}

export async function main1(data: string) {
  const result = mutateStacks(parseInput(data));

  const topCrates = result
    .reduce((acc, curr) => {
      return [...acc, curr[curr.length - 1]];
    }, [])
    .join("");

  return topCrates;
}

export async function main2(data: string) {
  //
}
