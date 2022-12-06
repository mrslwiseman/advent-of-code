import { getInput } from "../util";
import type { InputFileType } from "../util";

type HandType = "rock" | "paper" | "scissors";

const ranks: Record<HandType, HandType[]> = {
  rock: ["scissors"],
  paper: ["rock"],
  scissors: ["paper"],
};

const scores: Record<HandType, number> = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

function getHand(hand: string): HandType {
  switch (hand) {
    case "A":
    case "X":
      return "rock";
    case "B":
    case "Y":
      return "paper";
    case "C":
    case "Z":
      return "scissors";
    default:
      throw Error(`unknown hand type ${hand}`);
  }
}

export async function main1(file: InputFileType) {
  const data = await getInput(file);
  const turns = data
    .split("\n")
    .filter((line) => /[ABCXYZ]/.test(line))
    .map((line) => {
      const turns = line.split(" ");
      const [p1Score, p2Score] = turns.map((turn) => scores[getHand(turn)]);
      const [p1Wins, p2Wins] = turns.map((turn, i) =>
        ranks[getHand(turn)].includes(getHand(turns[i + 1] || turns[0]))
      );

      const isDraw = p1Score === p2Score;

      const result = {
        p1Score: p1Score + (p1Wins ? 6 : isDraw ? 3 : 0),
        p2Score: p2Score + (p2Wins ? 6 : isDraw ? 3 : 0),
      };

      return result;
    })
    .reduce(
      (acc, curr) => {
        acc.p1Score += curr.p1Score;
        acc.p2Score += curr.p2Score;

        return acc;
      },
      { p1Score: 0, p2Score: 0 }
    );
  return turns.p2Score;
}

export async function main2(file: InputFileType) {}
