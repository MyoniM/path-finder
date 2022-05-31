import { simpleMaze } from "./maze";
import { INode, Mode } from "./types";

let START_NODE_ROW = 14;
let START_NODE_COL = 10;
let FINISH_NODE_ROW = 14;
let FINISH_NODE_COL = 50;

export const getNodeProps = () => ({
  START_NODE_ROW,
  START_NODE_COL,
  FINISH_NODE_ROW,
  FINISH_NODE_COL,
});

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
  let node = newGrid[row][col];
  let isWall = node.isWall;
  let isSource = node.isSource;
  let isTarget = node.isTarget;
  let isNormalNode = !node.isSource && !node.isTarget;
  let newRow = node.row;
  let newCol = node.col;
  if (mode === Mode.BUILD) {
    if (isNormalNode) {
      isWall = true;
    }
  } else if (mode === Mode.CLEAN) {
    if (isNormalNode) {
      isWall = false;
    }
  } else if (mode === Mode.MOVE_SOURCE) {
    newGrid[START_NODE_ROW][START_NODE_COL] = {
      ...node,
      row: START_NODE_ROW,
      col: START_NODE_COL,
      isWall: false,
    };
    START_NODE_ROW = row;
    START_NODE_COL = col;
    newRow = START_NODE_ROW;
    newCol = START_NODE_COL;
    isSource = true;
  } else if (mode === Mode.MOVE_TARGET) {
    newGrid[FINISH_NODE_ROW][FINISH_NODE_COL] = {
      ...node,
      row: FINISH_NODE_ROW,
      col: FINISH_NODE_COL,
      isWall: false,
    };
    FINISH_NODE_ROW = row;
    FINISH_NODE_COL = col;
    isTarget = true;
  }
  const newNode = {
    ...node,
    row: newRow,
    col: newCol,
    isWall,
    isSource,
    isTarget,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export const getGridType = (selectedType: any) => {
  switch (selectedType) {
    case "custom":
      return generateEmptyGrid();
    case "sMaze":
      return simpleMaze;
  }
};
