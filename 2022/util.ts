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
