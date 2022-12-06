import { getInput } from "../util";
import type { InputFileType } from "../util";

export async function main1(file: InputFileType) {
  const data = await getInput(file);
  return data
    .split("\n\n")
    .reduce<number[]>((acc, elf) => {
      const currentElfCount = elf
        .split("\n")
        .reduce((acc, countStr) => Number(countStr || 0) + acc, 0);

      return [...acc, currentElfCount];
    }, [])
    .sort((a, b) => b - a)[0];
}

export async function main2(file: InputFileType) {
  const data = await getInput(file);
  const sortedCounts = data
    .split("\n\n")
    .reduce<number[]>((acc, elf) => {
      const currentElfCount = elf
        .split("\n")
        .reduce((acc, countStr) => Number(countStr || 0) + acc, 0);

      return [...acc, currentElfCount];
    }, [])
    .sort((a, b) => b - a);

  let sum = 0;

  for (let i = 0; i < 3; i++) {
    sum += sortedCounts[i];
  }

  return sum;
}
