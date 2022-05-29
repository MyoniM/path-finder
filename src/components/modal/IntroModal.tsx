import { useState } from "react";

import { Modal, Button } from "@mantine/core";
import Logo from "../Logo";

import classes from "./modal.module.css";
import { intro } from "../helpers/constants";
import Step from "./Step";

interface IProp {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function IntroModal({ opened, setOpened }: IProp) {
  const [index, setIndex] = useState(0);
  let lastIndex = index === intro.length - 1;
  const handleContinue = () => {
    if (index + 1 < intro.length) setIndex(index + 1);
    else setOpened(false);
  };
  return (
    <Modal size={"650px"} opened={opened} onClose={() => setOpened(false)}>
      <div>
        <img className={classes.img} src={intro[index].imgSrc} alt="" />
        <h1 className={classes.title}>
          Welcome to <Logo />
        </h1>
        <p className={classes.bodyText}>{intro[index].body}</p>
      </div>
      <div className={classes.steps}>
        {intro.map((_, i) => (
          <Step key={i} index={i} currentIndex={index} />
        ))}
      </div>
      <div className={classes.actions}>
        <Button
          color="blue"
          variant="filled"
          size="lg"
          style={{ width: "50%" }}
          onClick={handleContinue}
        >
          {lastIndex ? "GO TO WEBSITE" : "CONTINUE"}
        </Button>
      </div>
    </Modal>
  );
}
