import { useState } from "react";
import { AppShell, Button, ColorSwatch, Group } from "@mantine/core";

import classes from "./grid.module.css";
import nodeClass from "../node/node.module.css";

import Node from "../node/Node";
import {
  FINISH_NODE_COL,
  FINISH_NODE_ROW,
  generateEmptyGrid,
  getNewGridWithWallToggled,
  START_NODE_COL,
  START_NODE_ROW,
} from "../helpers/helper";
import { INode, Mode } from "../helpers/types";
import {
  dijkstra,
  getNodesInShortestPathOrder,
} from "../helpers/algorithms/dijkstra";
import { simpleMaze } from "../helpers/maze";
import { tutorialColors } from "../helpers/constants";

export default function Grid() {
  console.log("====================");

  const [grid, setGrid] = useState<INode[][]>(
    // generateEmptyGrid()
    simpleMaze
  );

  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [mode, setMode] = useState<Mode>(Mode.BUILD);

  // check if user triggered mouse down on a wall
  // if yes, set clean mode. else set build mode
  const handleMouseDown = (row: number, col: number) => {
    let id = `node-${row}-${col}`;
    let node = document.getElementById(id);
    // if clicked node is source or target
    if (
      node?.classList.contains(nodeClass.source) ||
      node?.classList.contains(nodeClass.target)
    ) {
      // setIsMainNode(true);
      setMode(Mode.MOVE);
    }
    // if the clicked node contains wall class
    // change to clean mode
    else if (node?.classList.contains(nodeClass.wall)) setMode(Mode.CLEAN);
    else setMode(Mode.BUILD);

    setMouseDown(true);
  };
  const handleMouseUp = () => {
    setMouseDown(false);
  };
  const handleMouseEnter = (row: number, col: number) => {
    if (mouseDown) {
      setGrid(getNewGridWithWallToggled(grid, mode, row, col));
    }
  };
  const handleClick = (row: number, col: number) => {
    setGrid(getNewGridWithWallToggled(grid, mode, row, col));
  };

  const animateShortestPath = (nodesInShortestPathOrder: INode[]) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document
          .getElementById(`node-${node.row}-${node.col}`)!
          .classList.add(nodeClass.backtrack);
      }, 50 * i);
    }
  };
  const animateDijkstra = (
    visitedNodesInOrder: INode[],
    nodesInShortestPathOrder: INode[]
  ) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document
          .getElementById(`node-${node.row}-${node.col}`)!
          .classList.add(nodeClass.searchAnimation);
      }, 10 * i);
    }
  };
  const visualizeDijkstra = async () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder!, nodesInShortestPathOrder);
  };

  const handleSubmit = () => {
    visualizeDijkstra();
  };
  // const handleReset = () => {
  //   let nodes = document.getElementsByClassName(nodeClass.node);
  //   for (let i = 0; i < nodes.length; i++) {
  //     nodes[i].classList.remove(nodeClass.searchAnimation, nodeClass.backtrack);
  //   }
  // };

  const swatches = tutorialColors.map((e, i) => (
    <div className={nodeClass.swatch}>
      <ColorSwatch key={i} color={e.color} />
      <p>{e.tag}</p>
    </div>
  ));
  return (
    <AppShell
      padding={0}
      fixed
      header={
        <div className={classes.wrapper}>
          <div></div>
          <div>
            <Button
              color="blue"
              variant="filled"
              style={{ marginRight: "10px" }}
              onClick={handleSubmit}
            >
              Animate {"Dijkstra"}
            </Button>
            {/* <Button
              color="red"
              variant="light"
              style={{ marginRight: "10px" }}
              onClick={handleReset}
            >
              Reset
            </Button> */}
          </div>
          <div className={nodeClass.tutorial}>
            <Group position="center" spacing="xs">
              {swatches}
            </Group>
            <Button
              color="blue"
              variant="outline"
              style={{ marginRight: "10px" }}
            >
              Tutorial
            </Button>
          </div>
        </div>
      }
    >
      <div className={classes.gridContainer}>
        {grid.map((row, i) => (
          <div key={i} className={classes.row}>
            {row.map((node) => (
              <Node
                key={`${node.row}${node.col}`}
                row={node.row}
                col={node.col}
                isSource={node.isSource}
                isTarget={node.isTarget}
                isWall={node.isWall}
                handleClick={() => handleClick(node.row, node.col)}
                handleMouseDown={() => handleMouseDown(node.row, node.col)}
                handleMouseUp={handleMouseUp}
                handleMouseEnter={() => handleMouseEnter(node.row, node.col)}
              />
            ))}
          </div>
        ))}
      </div>
    </AppShell>
  );
}
