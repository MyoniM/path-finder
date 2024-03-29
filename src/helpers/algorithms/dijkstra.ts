import { getAllNodes } from "../helper";
import { INode } from "../types";
export const dijkstra = (
  grid: INode[][],
  startNode: INode,
  finishNode: INode
) => {
  const visitedNodesInOrder: INode[] = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    // well, this is a dumb way to get the node with the shortest distance
    // should later be changed with heap(also for A*) 
    sortNodesByDistance(unvisitedNodes);
    // pop from the front
    const closestNode = unvisitedNodes.shift();
    // If we encounter a wall, we skip it.
    if (closestNode!.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode!.distance === Infinity) return visitedNodesInOrder;
    closestNode!.isVisited = true;
    visitedNodesInOrder.push(closestNode!);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode!, grid);
  }
};

const sortNodesByDistance = (unvisitedNodes: INode[]) => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};
// update the neighbors distance for the next loop
const updateUnvisitedNeighbors = (node: INode, grid: INode[][]) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
};

const getUnvisitedNeighbors = (node: INode, grid: INode[][]) => {
  // get top, right, bottom, left neighbors
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
};
