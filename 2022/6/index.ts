export function findMarker(input: string, increment: number) {
  let buffer: string[] = [];
  let position = 0;
  for (const item of input) {
    // console.log({ item });
    const items = new Set(buffer);
    const size = items.size;
    if (position > increment && size >= increment) {
      // console.log("stop here?", position);
      break;
    }
    buffer.push(item);
    if (buffer.length > increment) {
      buffer.shift();
    }
    position += 1;
  }
  return position;
}

export async function main1(data: string) {
  const result = data.split("\n").map((line) => findMarker(line, 4));
  return result;
}

export async function main2(data: string) {
  const result = data.split("\n").map((line) => findMarker(line, 14));
  return result;
  //
}
