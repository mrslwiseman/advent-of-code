import { readFile } from "fs/promises";
import path from "node:path";

export type InputFileType = "example" | "real";

export async function getInput(part: number, file: InputFileType) {
  const filePath = file === "example" ? "input.example.txt" : "input.txt";
  const data = await readFile(path.join(__dirname, `${part}`, `${filePath}`), {
    encoding: "utf-8",
  });
  return data.toString();
}
