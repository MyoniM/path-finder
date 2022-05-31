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
export interface NodeProp {
  START_NODE_ROW: number;
  START_NODE_COL: number;
  FINISH_NODE_ROW: number;
  FINISH_NODE_COL: number;
}

export enum Mode {
  BUILD,
  CLEAN,
  MOVE_SOURCE,
  MOVE_TARGET,
  MOVE_WEIGHT,
}
