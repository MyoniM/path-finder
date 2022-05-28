export interface INode {
  row: number;
  col: number;
  isWall: boolean;
  isSource: boolean;
  isTarget: boolean;
  distance: number;
  isVisited: boolean;
  previousNode: any;
}

export enum Mode {
  BUILD,
  CLEAN,
  MOVE,
}
