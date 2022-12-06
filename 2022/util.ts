import { readFile } from "fs/promises";

export type InputFileType = "example" | "real";

export async function getInput(file: InputFileType) {
  const filePath = file === "example" ? "input.example.txt" : "input.txt";
  const data = await readFile(`./${filePath}`, { encoding: "utf-8" });
  return data.toString();
}
