type Direction = "U" | "D" | "L" | "R";

type Move = {
  direction: Direction;
  count: number;
};

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

class Section {
  sectionNumber: string;
  x: number;
  y: number;
  _head?: Section | Head | null;
  child: Section | null;
  locations: { x: number; y: number }[];

  constructor(sectionNumber: string, x: number, y: number, head?: Section) {
    this.sectionNumber = String(sectionNumber);
    this.x = x;
    this.y = y;
    this._head = head || null;
    this.child = null;
    this.locations = [{ x, y }];
  }

  get head(): Section {
    if (!this._head) {
      throw new Error("head not initialized");
    }
    return this._head;
  }

  addSection(sectionNumber: string) {
    this.child = new Section(sectionNumber, this.x, this.y, this);
    return this.child;
  }

  get uniqueLocationsVisitedCount() {
    return new Set(this.locations.map((loc) => `${loc.x}/${loc.y}`)).size;
  }

  updatePosition(prevHeadX: number, prevHeadY: number) {
    console.log("updatePosition", this.sectionNumber, {
      prevHeadX,
      prevHeadY,
      x: this.x,
      y: this.y,
    });
    const prevX = this.x;
    const prevY = this.y;

    if (prevHeadX === this.x && prevHeadY === this.y) {
      this.locations.push({ x: this.x, y: this.y });
      return;
    }

    // leave tail in position if diagonal
    if (
      Math.abs(this.x - this.head.x) <= 1 &&
      Math.abs(this.head.y - this.y) <= 1
    ) {
      this.locations.push({ x: this.x, y: this.y });
      return;
    }

    // if was previously diagonal tail needs to catch up
    if (this.head.x !== this.x && this.head.y !== this.y) {
      this.x = prevHeadX;
      this.y = prevHeadY;
      this.locations.push({ x: this.x, y: this.y });
      this.child?.updatePosition(prevX, prevY);
      return;
    }

    // Right
    if (this.head.x > prevHeadX) {
      this.x += 1;
    }

    // Left
    if (this.head.x < prevHeadX) {
      this.x -= 1;
    }

    // Up
    if (this.head.y > prevHeadY) {
      this.y += 1;
    }

    // Down
    if (this.head.y < prevHeadY) {
      this.y -= 1;
    }

    this.locations.push({ x: this.x, y: this.y });
    this.child?.updatePosition(prevX, prevY);
  }
}
class Head extends Section {
  constructor(x: number, y: number) {
    super("H", x, y);
  }
  move(direction: Direction, count: number) {
    for (let step = 0; step < count; step++) {
      const prevX = this.x;
      const prevY = this.y;

      if (direction === "R") {
        this.x += 1;
      }
      if (direction === "U") {
        this.y += 1;
      }
      if (direction === "L") {
        this.x -= 1;
      }
      if (direction === "D") {
        this.y -= 1;
      }

      this.locations.push({ x: this.x, y: this.y });

      // once head has moved, trigger updates in the tail section(s)
      this.child?.updatePosition(prevX, prevY);
    }
  }
}

export class Rope {
  head: Head;
  constructor(length = 2, x = 0, y = 0) {
    this.head = new Head(x, y);
    // this pointer means we don't need to keep traversing to get the last section
    let tailPtr = this.tail;
    for (let i = 1; i < length; i++) {
      tailPtr = tailPtr.addSection(String(i));
    }
  }
  get tail() {
    const getLast = (section: Section): Section => {
      return section.child ? getLast(section.child) : section;
    };

    return getLast(this.head);
  }
  move(direction: Direction, count: number) {
    this.head.move(direction, count);
  }
}

export async function main1(data: string) {
  const rope = new Rope();

  for (const line of parseLines(data)) {
    rope.head.move(line.direction, line.count);
  }

  return rope.tail.uniqueLocationsVisitedCount;
}

export async function main2(data: string) {
  const rope = new Rope(3, 0, 0);

  for (const line of parseLines(data)) {
    rope.head.move(line.direction, line.count);
    const logPositions = (section: Section) => {
      console.log(section.sectionNumber, section.locations);
      if (section.child) {
        logPositions(section.child);
      }
    };
    logPositions(rope.head);
  }

  const collectLocations = (
    section: Section,
    locationsSet: Set<any>
  ): Set<any> => {
    if (!section.child) {
      return locationsSet;
    }

    section.locations.forEach((loc) => locationsSet.add(`${loc.x}/${loc.y}`));

    return collectLocations(section.child, locationsSet);
  };

  const locations = collectLocations(rope.head, new Set());

  // console.log(locations);

  return locations.size;
  // collect locations from all children

  // return rope.tail.uniqueLocationsVisitedCount;
}
