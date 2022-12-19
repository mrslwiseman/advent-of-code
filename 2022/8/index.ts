function hasTallerNeighbours(x: number, y: number, grid: number[][]) {
  const xMax = grid[0].length;
  const yMax = grid.length;
  // edge pieces
  if (y === 0 || y === yMax - 1) {
    return true;
  }
  if (x === 0 || x === xMax - 1) {
    return true;
  }

  const treeInQuestion = grid[y][x];
  // check x

  let visibleLeft;
  let visibleRight;
  let visibleAbove;
  let visibleBelow;

  // loop over the x axis / row
  for (let i = 0; i < xMax; i++) {
    const treeToCompare = grid[y][i];
    // console.log({ i, x, y, treeInQuestion, treeToCompare });
    if (i === x) {
      continue;
    }

    // check to the left
    if (i < x) {
      // check visible to left
      if (treeToCompare < treeInQuestion) {
        visibleLeft =
          visibleLeft === undefined || visibleLeft === true ? true : false;
      } else {
        visibleLeft = false;
      }
    }

    if (i > x) {
      // check to the right
      if (treeToCompare < treeInQuestion) {
        visibleRight =
          visibleRight === undefined || visibleRight === true ? true : false;
      } else {
        visibleRight = false;
      }
    }
  }

  // loop over the y axis / above and below tree
  for (let i = 0; i < yMax; i++) {
    const treeToCompare = grid[i][x];
    // console.log({ i, x, y, treeInQuestion, treeToCompare });
    if (i === y) {
      continue;
    }

    // check above
    if (i < y) {
      if (treeToCompare < treeInQuestion) {
        visibleAbove =
          visibleAbove === undefined || visibleAbove === true ? true : false;
      } else {
        visibleAbove = false;
      }
    }

    if (i > y) {
      // check below
      if (treeToCompare < treeInQuestion) {
        visibleBelow =
          visibleBelow === undefined || visibleBelow === true ? true : false;
      } else {
        visibleBelow = false;
      }
    }
  }
  return Boolean(visibleLeft || visibleRight || visibleAbove || visibleBelow);
}

export function main1(input: string[]) {
  const lines = input.map((line) => line.split("").map((s) => Number(s)));

  const tempResult = lines.map((line, y) =>
    line.map((_d, x) => hasTallerNeighbours(x, y, lines))
  );

  console.log(tempResult);

  const result = lines.reduce((acc, line, y) => {
    const count = line.reduce((lineAcc, _tree, x) => {
      const isVisible = hasTallerNeighbours(x, y, lines);
      return lineAcc + (isVisible ? 1 : 0);
    }, 0);
    return acc + count;
  }, 0);

  console.log(lines);
  return result;
}

export async function main2(data: string) {
  //
}
