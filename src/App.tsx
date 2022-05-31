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
    <div className="main">
      <Grid openHelp={setOpened} />
      <IntroModal opened={opened} setOpened={setOpened} />
    </div>
  );
};

export default App;
