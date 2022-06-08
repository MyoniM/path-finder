import { getAllNodes } from "../helper";
import { INode } from "../types";

export const aStar = (grid: INode[][], startNode: INode, finishNode: INode) => {
  startNode.distanceFromStart = 0;
  startNode.estimatedDistanceToEnd = calculateManhattanDistance(
    startNode,
    finishNode
  );

  const visitedNodesInOrder: INode[] = [];
  let nodesToVisit = getAllNodes(grid);
  while (!!nodesToVisit.length) {
    sortNodesByHeuristicValue(nodesToVisit);

    let currentMinDistanceNode = nodesToVisit.shift();
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (currentMinDistanceNode!.distanceFromStart === Infinity)
      return visitedNodesInOrder;
    currentMinDistanceNode!.isVisited = true;
    visitedNodesInOrder.push(currentMinDistanceNode!);
    if (currentMinDistanceNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(currentMinDistanceNode!, finishNode, grid);
  }
};

// update the neighbors distance for the next loop
const updateUnvisitedNeighbors = (
  node: INode,
  finishNode: INode,
  grid: INode[][]
) => {
  let neighbors = getUnvisitedNeighbors(node!, grid);

  for (const neighbor of neighbors) {
    if (neighbor.isWall) continue;

    let tentativeDistanceToNeighbor = node!.distanceFromStart + 1;
    // this means the neighbor has short G-store (distance from start)
    if (tentativeDistanceToNeighbor >= neighbor.distanceFromStart) continue;

    neighbor.previousNode = node;
    // update G-store
    neighbor.distanceFromStart = tentativeDistanceToNeighbor;
    // F-Store = G + H
    neighbor.estimatedDistanceToEnd =
      tentativeDistanceToNeighbor +
      calculateManhattanDistance(neighbor, finishNode);
  }
};

// heuristic value
const calculateManhattanDistance = (currentNode: INode, finishNode: INode) => {
  return (
    Math.abs(currentNode.row - finishNode.row) +
    Math.abs(currentNode.col - finishNode.col)
  );
};

const getUnvisitedNeighbors = (node: INode, grid: INode[][]) => {
  // get top, right, bottom, left neighbors
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors;
};

const sortNodesByHeuristicValue = (unvisitedNodes: INode[]) => {
  unvisitedNodes.sort(
    (nodeA, nodeB) =>
      nodeA.estimatedDistanceToEnd - nodeB.estimatedDistanceToEnd
  );
};
