type FileTreeNode = FileNode | RootDirNode | DirNode;

class FileNode {
  parent: DirNode | RootDirNode;
  name: string;
  size: number;
  constructor(parent: DirNode | RootDirNode, name: string, size: number) {
    this.name = name;
    this.size = size;
    this.parent = parent;
  }
}

class DirNode {
  parent: RootDirNode | DirNode;
  children: Array<FileTreeNode>;
  name: string;
  size = 0;

  constructor(parent: RootDirNode | DirNode, name: string) {
    this.name = name;
    this.children = [];
    this.parent = parent;
  }

  addNode(node: FileTreeNode) {
    this.children.push(node);
    return this;
  }
}

class RootDirNode {
  children: Array<FileTreeNode>;
  name = "/";
  size = 0;

  constructor() {
    this.children = [];
  }

  addNode(node: FileTreeNode) {
    this.children.push(node);
    return this;
  }
}
class FileTree {
  root: RootDirNode;
  currentDirNode: RootDirNode | DirNode;
  constructor() {
    this.root = new RootDirNode();
    this.currentDirNode = this.root;
  }

  addNode(node: FileTreeNode) {
    this.root.addNode(node);

    return this.root;
  }

  calculateDirectorySizes(head = this.root) {
    if (head.children.length === 0) {
      return head.size;
    }

    for (const child of head.children) {
      head.size += child.size;
      if (child instanceof DirNode) {
        head.size += this.calculateDirectorySizes(child);
      }
    }
    return head.size;
  }

  // traverses all directories returning the name and size
  getDirList(head: RootDirNode | DirNode, dirs: Array<RootDirNode | DirNode>) {
    if (head.children.length === 0) {
      return [...dirs, head];
    }

    for (const child of head.children) {
      if (child instanceof DirNode) {
        dirs = this.getDirList(child, [...dirs, child]);
      }
    }

    return dirs;
  }
}

function init(lines: string[]) {
  const fileTree = new FileTree();

  for (const line of lines) {
    // file
    if (/^(\d+)\s(.+)/.test(line)) {
      const [, size, fileName] = line.match(/^(\d+)\s(.+)/) || [];
      fileTree.currentDirNode.addNode(
        new FileNode(fileTree.currentDirNode, fileName, Number(size))
      );
      continue;
    }
    // dir
    if (/^\$\sdir/.test(line)) {
      const [, dirName] = line.match(/^dir\s(.+)/) || [];
      fileTree.currentDirNode.addNode(
        new DirNode(fileTree.currentDirNode, dirName)
      );
      continue;
    }
    // $ ls
    if (/^\$\sls/.test(line)) {
      continue;
    }
    // $ cd
    if (/^\$\scd/.test(line)) {
      const [, nextDir] = line.match(/^\$\scd\s(.*)/) || [];

      if (nextDir === "..") {
        // move up one
        if (fileTree.currentDirNode instanceof RootDirNode) {
          continue;
        }
        fileTree.currentDirNode = fileTree.currentDirNode.parent;
        continue;
      }
      // if directory with same name exists in current directory, set as current
      // otherwise create
      if (nextDir === "/") {
        fileTree.currentDirNode = fileTree.root;
        continue;
      }
      const existingDirNode = fileTree.currentDirNode.children.find(
        (child) => child.name === nextDir
      );
      if (existingDirNode instanceof DirNode) {
        // go into it
        fileTree.currentDirNode = existingDirNode;
      } else {
        // create new directory
        const nextDirNode = new DirNode(fileTree.currentDirNode, nextDir);
        fileTree.currentDirNode.addNode(nextDirNode);
        fileTree.currentDirNode = nextDirNode;
      }
      continue;
    }
  }

  fileTree.calculateDirectorySizes();

  return fileTree;
}

export function main1(data: string) {
  const fileTree = init(data.split("\n").map((v) => v.trim()));

  const dirs = fileTree.getDirList(fileTree.root, []);

  const sumLessThan1000000 = dirs.reduce((sum, dir) => {
    if (dir.size <= 100000) {
      return sum + dir.size;
    }
    return sum;
  }, 0);

  return sumLessThan1000000;
}

export function main2(data: string) {
  const fileTree = init(data.split("\n").map((v) => v.trim()));

  const dirs = fileTree.getDirList(fileTree.root, []);

  const REQUIRED_SPACE = 30000000;

  const totalSpaceUsed = fileTree.root.size;

  const remainingOnDisk = 70000000 - totalSpaceUsed;
  const diff = REQUIRED_SPACE - remainingOnDisk;

  const [result] = dirs
    .filter((dir) => dir.size > diff)
    .sort((a, b) => a.size - b.size);

  return result.size;
}
