import { INode } from "../types";
import { BinaryHeap } from "./binaryHeap";

export const aStar = (grid: INode[][], startNode: INode, finishNode: INode) => {

  startNode.distanceFromStart = 0;
  startNode.estimatedDistanceToEnd = calculateManhattanDistance(
    startNode,
    finishNode
  );

  const visitedNodesInOrder: INode[] = [];
  let nodesToVisit = new BinaryHeap([startNode]);

  while (!nodesToVisit.isEmpty()) {
    
    let currentMinDistanceNode = nodesToVisit.remove();


    currentMinDistanceNode!.isVisited = true;
    visitedNodesInOrder.push(currentMinDistanceNode!);
    if (currentMinDistanceNode === finishNode) return visitedNodesInOrder;

    let neighbors = getUnvisitedNeighbors(currentMinDistanceNode!, grid);
    console.log(neighbors.length);
    
    for (const neighbor of neighbors) {
      if (neighbor.isWall) continue;

      let tentativeDistanceToNeighbor =
        currentMinDistanceNode!.distanceFromStart + 1;
      // this means the neighbor has short G-store (distance from start)
      console.log(tentativeDistanceToNeighbor >= neighbor.distanceFromStart);
      
      if (tentativeDistanceToNeighbor >= neighbor.distanceFromStart) continue;

      neighbor.previousNode = currentMinDistanceNode;
      // update G-store
      neighbor.distanceFromStart = tentativeDistanceToNeighbor;
      // F-Store = G + H
      neighbor.estimatedDistanceToEnd =
        tentativeDistanceToNeighbor +
        calculateManhattanDistance(neighbor, finishNode);

      if (nodesToVisit.containsNode(neighbor)) {
        console.log(neighbor);
        nodesToVisit.update(neighbor);
      } else {
        console.log("====", neighbor);
        nodesToVisit.insert(neighbor);
      }
    }
  }
  // If we reach this line, the heap should be empty!
  // May result when neighbors are wall
  return visitedNodesInOrder
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
