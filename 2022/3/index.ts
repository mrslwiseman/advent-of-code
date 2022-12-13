import { getInput } from "../util";

export function splitCompartments(items: string) {
  return [
    items.slice(0, items.length / 2).split(""),
    items.substring(items.length / 2).split(""),
  ];
}

export function findCommonItems(a: string[], b: string[]) {
  const bSet = new Set(b);
  for (const item of a) {
    if (bSet.has(item)) {
      return item;
    }
  }
  throw new Error("no common item found");
}

export function getPriority(character: string) {
  return character.charCodeAt(0) - (/[A-Z]/.test(character) ? 38 : 96);
}

export async function main1(data: string) {
  const sum = data.split("\n").reduce((acc, line) => {
    if (/done/i.test(line)) {
      return acc;
    }

    const [p1, p2] = splitCompartments(line);
    const commonItem = findCommonItems(p1, p2);
    const itemPriority = getPriority(commonItem);
    return acc + itemPriority;
  }, 0);

  return sum;
}

export function findCommonGroupItems(backpackGroups: string[]) {
  const allChars = new Set(backpackGroups.join(""));
  const characterSets = backpackGroups.map(
    (backpackChars) => new Set(backpackChars)
  );

  let commonChar;
  for (const [item] of allChars.entries()) {
    let count = 0;
    for (const charSet of characterSets) {
      if (charSet.has(item)) {
        count += 1;
      } else {
        continue;
      }
    }
    if (count == 3) {
      commonChar = item;
      break;
    }
  }

  return commonChar;
}

export function chunk(input: any[], count: number) {
  return input.reduce<string[][]>((acc, current) => {
    let currentBatch = acc[acc.length - 1] || [];
    if (currentBatch.length < count) {
      currentBatch.push(current);
      acc[acc.length - 1 < 0 ? 0 : acc.length - 1] = currentBatch;
    } else {
      acc.push([current]);
    }
    return acc;
  }, []);
}

export async function main2(data: string) {
  const lines = data.split("\n");
  const chunkedLines = chunk(lines, 3);

  const sum = chunkedLines.reduce((total, groupArray) => {
    const commonItem = findCommonGroupItems(groupArray);

    if (!commonItem) return total;

    return total + getPriority(commonItem);
  }, 0);

  return sum;
}
