import classes from "./node.module.css";
interface Prop {
  row: number;
  col: number;
  isWall: boolean;
  isSource: boolean;
  isTarget: boolean;
  handleClick: () => void;
  handleMouseUp: () => void;
  handleMouseDown: () => void;
  handleMouseEnter: () => void;
}
export default function Node({
  row,
  col,
  isWall,
  isSource,
  isTarget,
  handleClick,
  handleMouseUp,
  handleMouseDown,
  handleMouseEnter,
}: Prop) {
  let node = classes.node;
  let wall = isWall ? classes.wall : "";
  let source = isSource ? classes.source : "";
  let target = isTarget ? classes.target : "";
  return (
    <div
      id={`node-${row}-${col}`}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      className={`${node} ${wall} ${source} ${target}`}
    ></div>
  );
}
