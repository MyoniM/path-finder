import { INode, Mode } from "./types";
import { generateEmptyGrid, generateQWalls } from "./maze/maze";
import { aStar } from "./algorithms/aStar";
import { dijkstra } from "./algorithms/dijkstra";

let START_NODE_ROW = 14;
let START_NODE_COL = 10;
let FINISH_NODE_ROW = 14;
let FINISH_NODE_COL = 30;

export const getNodeProps = () => ({
  START_NODE_ROW,
  START_NODE_COL,
  FINISH_NODE_ROW,
  FINISH_NODE_COL,
});

export const getAllNodes = (grid: INode[][]) => {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};

export const createNode = (row: number, col: number, extra: any): INode => ({
  row,
  col,
  isSource: row === START_NODE_ROW && col === START_NODE_COL,
  isTarget: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
  isWall: false,
  isVisited: false,
  previousNode: null,
  // dijkstra
  distance: Infinity,
  // a*
  distanceFromStart: Infinity,
  estimatedDistanceToEnd: Infinity,
  ...extra,
});

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
    case "q13":
      return generateQWalls(false);
    case "q24":
      return generateQWalls(true);
  }
};

export const getVisitedNodes = (
  algorithmType: string,
  grid: INode[][],
  startNode: INode,
  finishNode: INode
) => {
  switch (algorithmType) {
    case "dijkstra":
      return dijkstra(grid, startNode, finishNode);
    case "aStar":
      return aStar(grid, startNode, finishNode);
  }
};

// Backtracks from the finishNode to find the shortest path.
// Works if called after getVisitedNodes
export const getNodesInShortestPathOrder = (finishNode: INode) => {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
};
