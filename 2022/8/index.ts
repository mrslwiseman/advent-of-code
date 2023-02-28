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

  const result = lines.reduce((acc, line, y) => {
    const count = line.reduce((lineAcc, _tree, x) => {
      const isVisible = hasTallerNeighbours(x, y, lines);
      return lineAcc + (isVisible ? 1 : 0);
    }, 0);
    return acc + count;
  }, 0);

  return result;
}

export async function main2(input: string[]) {
  const lines = input.map((line) => line.split("").map((s) => Number(s)));

  const xMax = lines[0].length;
  const yMax = lines.length;

  const results: number[][] = lines.map((line) => line.map(() => 0));
  let maxScenicScoreSeen = 0;

  for (let y = 1; y < yMax - 1; y++) {
    for (let x = 1; x < xMax - 1; x++) {
      const treeHeight = lines[y][x];
      let left = 0;
      let right = 0;
      let above = 0;
      let below = 0;

      // left
      for (let xLeft = x - 1; xLeft >= 0; xLeft--) {
        const neighbour = lines[y][xLeft];
        left += 1;
        if (neighbour >= treeHeight) {
          break;
        }
      }

      // right
      for (let xRight = x + 1; xRight < xMax; xRight++) {
        const neighbour = lines[y][xRight];
        right += 1;
        if (neighbour >= treeHeight) {
          break;
        }
      }

      // above
      for (let yAbove = y - 1; yAbove >= 0; yAbove--) {
        const neighbour = lines[yAbove][x];
        above += 1;
        if (neighbour >= treeHeight) {
          break;
        }
      }

      // below
      for (let yBelow = y + 1; yBelow < yMax; yBelow++) {
        const neighbour = lines[yBelow][x];
        below += 1;
        if (neighbour >= treeHeight) {
          break;
        }
      }

      const scenicScore = left * right * above * below;

      if (scenicScore > maxScenicScoreSeen) {
        maxScenicScoreSeen = scenicScore;
      }
      results[y][x] = scenicScore;
    }
  }

  return maxScenicScoreSeen;
}
