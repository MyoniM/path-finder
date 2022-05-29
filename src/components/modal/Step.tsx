import classes from "./modal.module.css";

interface IProp {
  index: number;
  currentIndex: number;
}

export default function Step({ index, currentIndex }: IProp) {
  return (
    <div
      className={`${classes.step} ${
        index === currentIndex ? classes.current : ""
      }`}
    ></div>
  );
}
