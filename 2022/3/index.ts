import { getInput } from "../util";
import type { InputFileType } from "../util";

type HandType = "rock" | "paper" | "scissors";

// Represents which hand beats which hand eg rock: beats scissors
export const ranks: Record<string, HandType[]> = {
  rock: ["scissors"],
  paper: ["rock"],
  scissors: ["paper"],
};

const scores: Record<string, number> = {
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

// Todo: refactor by limiting the amount of iteration here ( im sleepy )
export async function main1(file: InputFileType) {
  const data = await getInput(2, file);

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

export function getSuperiorHand(losingTurn: string) {
  const result = Object.keys(ranks).find((rank) =>
    ranks[rank].includes(getHand(losingTurn))
  );

  if (!result) {
    throw Error(`couldnt find superior hand to ${losingTurn}`);
  }

  // console.log(`superior: ${result} beats: ${losingTurn}`);

  return {
    outcome: "win",
    result,
    score: scores[result] + 6,
  };
}

export function getInferiorHand(winningHand: string) {
  const result = ranks[getHand(winningHand)][0];

  if (!result) {
    throw Error(`couldnt find losing hand to ${winningHand}`);
  }

  // console.log(`inferior: ${winningHand} beats: ${result}`);

  return {
    outcome: "lose",
    result,
    score: scores[result] + 0,
  };
}

export function getDrawHand(drawHand: string) {
  const result = getHand(drawHand);

  if (!result) {
    throw Error(`couldnt find losing hand to ${drawHand}`);
  }

  // console.log(`draw: ${result} is a draw hand to ${drawHand}`);

  return {
    outcome: "draw",
    result,
    score: scores[result] + 3,
  };
}

function getResponse(turn: string, response: string) {
  switch (response) {
    // lose
    case "X":
      return getInferiorHand(turn);
    // draw
    case "Y":
      return getDrawHand(turn);
    // win
    case "Z":
      return getSuperiorHand(turn);
    default:
      throw new Error(
        `cannot get response to ${turn} with response ${response}`
      );
  }
}

export async function main2(file: InputFileType) {
  const input = await getInput(2, file);
  const totalScore = input.split("\n").reduce((acc, line) => {
    if (!/[ABCXYZ]/.test(line)) {
      return acc;
    }

    const [turn, response] = line.split(" ");

    const nextResponse = getResponse(turn, response);

    return acc + nextResponse.score;
  }, 0);

  return totalScore;
}
