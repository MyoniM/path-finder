import { INode, Mode } from "./types";

export const START_NODE_ROW = 14;
export const START_NODE_COL = 10;
export const FINISH_NODE_ROW = 14;
export const FINISH_NODE_COL = 47;

const createNode = (row: number, col: number): INode => ({
  row,
  col,
  isSource: row === START_NODE_ROW && col === START_NODE_COL,
  isTarget: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
  isWall: false,
  distance: Infinity,
  isVisited: false,
  previousNode: null,
});

export const generateEmptyGrid = (): INode[][] => {
  const grid: INode[][] = [];
  for (let i = 0; i < 36; i++) {
    let row: INode[] = [];
    for (let j = 0; j < 72; j++) {
      row.push(createNode(i, j));
    }
    grid.push(row);
  }
  return grid;
};

export const getNewGridWithWallToggled = (
  grid: INode[][],
  mode: Mode,
  row: number,
  col: number
) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  let isWall = node.isWall;
  let isNormalNode = !node.isSource && !node.isTarget;
  if (mode === Mode.BUILD) {
    if (isNormalNode) {
      isWall = true;
    }
  } else if (mode === Mode.CLEAN) {
    if (isNormalNode) {
      isWall = false;
    }
  } else if (mode === Mode.MOVE) {
    //
  }
  const newNode = {
    ...node,
    isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
