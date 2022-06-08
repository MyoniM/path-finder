import { createNode, getNodeProps } from "../helper";
import { INode } from "../types";

export const generateEmptyGrid = (): INode[][] => {
  const grid: INode[][] = [];
  for (let i = 0; i < 36; i++) {
    let row: INode[] = [];
    for (let j = 0; j < 72; j++) {
      row.push(createNode(i, j, {}));
    }
    grid.push(row);
  }
  return grid;
};
export const resetGrid = (prevGrid: INode[][]): INode[][] => {
  const grid: INode[][] = [];
  for (let i = 0; i < prevGrid.length; i++) {
    let row: INode[] = [];
    for (let j = 0; j < prevGrid[0].length; j++) {
      row.push({
        ...prevGrid[i][j],
        ...{
          distance: Infinity,
          isVisited: false,
          previousNode: null,
        },
      });
    }
    grid.push(row);
  }
  return grid;
};

export const generateQWalls = (q24: boolean) => {
  const nodeProps = getNodeProps();
  const grid: INode[][] = [];
  for (let i = 0; i < 36; i++) {
    let row: INode[] = [];
    for (let j = 0; j < 72; j++) {
      const nodeNotSource =
        i !== nodeProps.START_NODE_ROW || j !== nodeProps.START_NODE_COL;
      const nodeNotTarget =
        i !== nodeProps.FINISH_NODE_ROW || j !== nodeProps.FINISH_NODE_COL;

      let rowModTwo, colModThree;
      if (q24) {
        rowModTwo = (i - j) % 2 === 0;
        colModThree = (j - i) % 3 === 0;
      } else {
        rowModTwo = (i + j) % 2 === 0;
        colModThree = (j + i) % 3 === 0;
      }

      const shouldBeWall =
        nodeNotSource && nodeNotTarget && rowModTwo && colModThree;

      console.log(shouldBeWall);

      const extra = { isWall: shouldBeWall };
      row.push(createNode(i, j, extra));
    }
    grid.push(row);
  }
  return grid;
};
