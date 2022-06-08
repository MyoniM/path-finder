import { useEffect, useState } from "react";
import { AppShell, Button, ColorSwatch, Group, Select } from "@mantine/core";

import classes from "./grid.module.css";
import nodeClass from "../node/node.module.css";

import Node from "../node/Node";
import {
  getGridType,
  getNewGridWithWallToggled,
  getNodeProps,
  getNodesInShortestPathOrder,
  getVisitedNodes,
} from "../../helpers/helper";
import { INode, Mode, NodeProp } from "../../helpers/types";

import { algorithms, gridTypes, tutorialColors } from "../../helpers/constants";
import Logo from "../Logo";
import { resetGrid } from "../../helpers/maze/maze";

interface IProp {
  openHelp: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Grid({ openHelp }: IProp) {
  // console.log("====================");

  const [gridType, setGridType] = useState<string>("custom");
  const [grid, setGrid] = useState<INode[][]>(getGridType(gridType)!);

  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [mode, setMode] = useState<Mode>(Mode.BUILD);
  const [algorithmValue, setAlgorithmValue] = useState<string>("dijkstra");

  useEffect(() => {
    setGrid(getGridType(gridType)!);
  }, [gridType]);
  // check if user triggered mouse down on a wall
  // if yes, set clean mode. else set build mode
  const handleMouseDown = (row: number, col: number) => {
    if (!isAnimating) {
      let id = `node-${row}-${col}`;
      let node = document.getElementById(id);
      // if clicked node is source
      if (node?.classList.contains(nodeClass.source)) setMode(Mode.MOVE_SOURCE);
      else if (node?.classList.contains(nodeClass.target))
        setMode(Mode.MOVE_TARGET);
      // if the clicked node contains wall class change to clean mode
      else if (node?.classList.contains(nodeClass.wall)) setMode(Mode.CLEAN);
      else setMode(Mode.BUILD);

      setMouseDown(true);
    }
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
    if (!isAnimating) setGrid(getNewGridWithWallToggled(grid, mode, row, col));
  };

  const animateShortestPath = (nodesInShortestPathOrder: INode[]) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      if (i + 1 === nodesInShortestPathOrder.length) setIsAnimating(false);
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document
          .getElementById(`node-${node.row}-${node.col}`)!
          .classList.add(nodeClass.backtrack);
      }, 50 * i);
    }
  };
  const animateAlgorithm = (
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
  const visualizeAlgorithm = async (nodeProps: NodeProp) => {
    const startNode = grid[nodeProps.START_NODE_ROW][nodeProps.START_NODE_COL];
    const finishNode =
      grid[nodeProps.FINISH_NODE_ROW][nodeProps.FINISH_NODE_COL];

    const visitedNodesInOrder = getVisitedNodes(
      algorithmValue,
      grid,
      startNode,
      finishNode
    );
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateAlgorithm(visitedNodesInOrder!, nodesInShortestPathOrder);
  };

  const handleSubmit = () => {
    handleReset();
    setIsAnimating(true);
    visualizeAlgorithm(getNodeProps());
  };

  const handleReset = () => {
    // must reset node properties
    setGrid(resetGrid(grid));
    let nodes = document.getElementsByClassName(nodeClass.node);
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].classList.remove(nodeClass.searchAnimation, nodeClass.backtrack);
    }
  };

  const swatches = tutorialColors.map((e, i) => (
    <div className={classes.swatch} key={i}>
      <ColorSwatch color={e.color} />
      <p>{e.tag}</p>
    </div>
  ));
  return (
    <AppShell
      padding={0}
      style={{ width: "1920px" }}
      fixed
      header={
        <div className={classes.wrapper}>
          <Logo />
          <div className={classes.algorithm}>
            <Select
              value={gridType}
              data={gridTypes}
              disabled={isAnimating}
              onChange={(data) => {
                handleReset();
                setGridType(data!);
              }}
            />
            <Select
              value={algorithmValue}
              data={algorithms}
              disabled={isAnimating}
              onChange={(data) => {
                handleReset();
                setAlgorithmValue(data!);
              }}
            />
            <Button
              color="blue"
              variant="filled"
              onClick={handleSubmit}
              disabled={isAnimating}
            >
              Visualize{" "}
              {algorithms.find((e) => e.value === algorithmValue!)?.label}
            </Button>
            <Button
              color="red"
              variant="filled"
              onClick={handleReset}
              disabled={isAnimating}
            >
              Reset
            </Button>
          </div>
          <div className={classes.tutorial}>
            <Group position="center" spacing="xs">
              {swatches}
              <div className={classes.swatch}>
                <div className={`${nodeClass.node} ${nodeClass.source}`}>
                  <span></span>
                </div>
                Source Node
              </div>
              <div className={classes.swatch}>
                <div className={`${nodeClass.node} ${nodeClass.target}`}>
                  <span></span>
                </div>
                Target Node
              </div>
            </Group>
            <Button
              color="blue"
              variant="outline"
              style={{ marginRight: "10px" }}
              onClick={() => openHelp(true)}
              disabled={isAnimating}
            >
              Help?
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
