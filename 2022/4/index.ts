import { getInput } from "../util";

type Range = {
  start: number;
  end: number;
};

export function parseAssignments(line: string) {
  const parts = line.split(",");
  return parts.map((part) => {
    const [start, end] = part.split("-");
    return {
      start: Number(start),
      end: Number(end),
    };
  });
}

export function findEnclosedOverlap(a: Range, b: Range) {
  const bIsContained = b.start >= a.start && b.end <= a.end;
  const aIsContained = a.start >= b.start && a.end <= b.end;

  if (bIsContained || aIsContained) {
    return true;
  }
  return false;
}

export function findPartialOverlap(a: Range, b: Range) {
  const overlaps =
    (a.start >= b.start && a.start <= b.end) ||
    (b.start >= a.start && b.start <= a.end);

  if (overlaps) {
    return true;
  }
  return false;
}

export async function main1(data: string) {
  const input = data.split("\n");

  const result = input.reduce((overlapCount, curr) => {
    if (/done/i.test(curr)) {
      return overlapCount;
    }

    const [a, b] = parseAssignments(curr);
    const overlaps = findEnclosedOverlap(a, b);

    if (overlaps) {
      return (overlapCount += 1);
    }

    return overlapCount;
  }, 0);

  return result;
}

export async function main2(data: string) {
  const input = data.split("\n");

  const result = input.reduce((overlapCount, curr) => {
    if (/done/i.test(curr)) {
      return overlapCount;
    }

    const [a, b] = parseAssignments(curr);
    const overlaps = findPartialOverlap(a, b);

    if (overlaps) {
      return (overlapCount += 1);
    }

    return overlapCount;
  }, 0);

  return result;
}
