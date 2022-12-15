import { readFile } from "fs/promises";
import path from "node:path";

async function readInputFile(dirname: string, fileName: string) {
  const data = await readFile(path.join(dirname, `${fileName}`), {
    encoding: "utf-8",
  });
  return data.toString();
}

export async function getInput(dirname: string) {
  return readInputFile(dirname, "input.txt");
}

export async function getExampleInput(dirname: string) {
  return readInputFile(dirname, "input.example.txt");
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
