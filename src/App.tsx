import { useEffect, useState } from "react";
import Grid from "./components/grid/Grid";
import IntroModal from "./components/modal/IntroModal";

const App = () => {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    window.addEventListener("load", () => setOpened(true));
    return () => window.removeEventListener("load", () => {});
  });

  return (
    <>
      <Grid openHelp={setOpened}/>
      <IntroModal opened={opened} setOpened={setOpened} />
    </>
  );
};

export default App;
