export interface INode {
  id: string;
  row: number;
  col: number;
  isWall: boolean;
  isSource: boolean;
  isTarget: boolean;
  isVisited: boolean;
  previousNode: any;
  // specific to dijkstra
  distance: number;
  // End dijkstra
  // specific to A*
  distanceFromStart: number;
  estimatedDistanceToEnd: number;
  // End A*
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
