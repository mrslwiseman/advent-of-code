function difference(a: number, b: number) {
  return Math.abs(a - b);
}

export function calculateTailPosition(
  prevHeadX: number,
  prevHeadY: number,
  headX: number,
  headY: number,
  tailX: number,
  tailY: number
) {
  // if they were overlapping, leave it as is
  if (prevHeadX === tailX && prevHeadY === tailY) {
    return { tailX, tailY };
  }

  // leave tail in position if diagonal
  if (Math.abs(tailX - headX) <= 1 && Math.abs(headY - tailY) <= 1) {
    return { tailX, tailY };
  }

  // if was previously diagonal tail needs to catch up
  if (headX !== tailX && headY !== tailY) {
    return { tailX: prevHeadX, tailY: prevHeadY };
  }

  // Right
  if (headX > prevHeadX) {
    tailX += 1;
  }

  // Left
  if (headX < prevHeadX) {
    tailX -= 1;
  }

  // Up
  if (headY > prevHeadY) {
    tailY += 1;
  }

  // Down
  if (headY < prevHeadY) {
    tailY -= 1;
  }
  return { tailX, tailY };
}

type Direction = "U" | "D" | "L" | "R";

type Move = {
  direction: Direction;
  count: number;
};

type MoveState = {
  headX: number;
  headY: number;
  tailX: number;
  tailY: number;
};

type State = MoveState[];

function assertIsDirection(direction: string): asserts direction is Direction {
  if (!/^U|D|L|R$/.test(direction)) {
    throw new Error("Invalid direction");
  }
}

function parseLines(data: string): Move[] {
  const parsedLines = data.split("\n").map((line) => {
    const [direction, count] = line.split(" ");
    assertIsDirection(direction);

    return { direction, count: Number(count) };
  });

  return parsedLines;
}

function moveHead(state: State, move: Move): State {
  const nextMoveState = {
    ...state[state.length - 1],
  };

  const moves: MoveState[] = [];

  for (let step = 0; step < move.count; step++) {
    const prevHeadX = nextMoveState.headX;
    const prevHeadY = nextMoveState.headY;

    if (move.direction === "R") {
      nextMoveState.headX += 1;
    }
    if (move.direction === "U") {
      nextMoveState.headY += 1;
    }
    if (move.direction === "L") {
      nextMoveState.headX -= 1;
    }
    if (move.direction === "D") {
      nextMoveState.headY -= 1;
    }

    const nextTailPos = calculateTailPosition(
      prevHeadX,
      prevHeadY,
      nextMoveState.headX,
      nextMoveState.headY,
      nextMoveState.tailX,
      nextMoveState.tailY
    );

    nextMoveState.tailX = nextTailPos.tailX;
    nextMoveState.tailY = nextTailPos.tailY;

    moves.push({ ...nextMoveState });
  }
  return moves;
}

export async function main1(data: string) {
  let state: State = [
    {
      headX: 0,
      headY: 0,
      tailX: 0,
      tailY: 0,
    },
  ];

  for (const { count, direction } of parseLines(data)) {
    const nextState = moveHead(state, { direction, count });
    state = state.concat(...nextState);
  }

  const tailVisitSet = new Set(
    state.map((move) => `${move.tailX}/${move.tailY}`)
  );

  return tailVisitSet.size;
}

export async function main2(data: string) {
  let state: State = [
    {
      headX: 0,
      headY: 0,
      tailX: 0,
      tailY: 0,
    },
  ];
}
