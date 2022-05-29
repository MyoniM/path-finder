export const tutorialColors = [
  { color: "#3092e9", tag: "Visited" },
  { color: "#F7D716", tag: "Shortest Path" },
  { color: "#40e0d0", tag: "Source" },
  { color: "#d340e0", tag: "Target" },
];
export const algorithms = [
  { value: "dijkstra", label: "Dijkstra" },
  { value: "aStar", label: "A*" },
  { value: "bfs", label: "Breadth First Search" },
  { value: "dfs", label: "Depth First Search" },
];

export const gridTypes = [
  { value: "custom", label: "Custom Grid" },
  { value: "sMaze", label: "Simple Maze" },
];

export const intro = [
  {
    imgSrc: "/intro.png",
    body: " Before you get started we will walk you through a tutorial to get you familiar with the features of the website",
  },
  {
    imgSrc: "/grid-type-intro.png",
    body: "You can change between multiple grid types or even create your own layout satisfying your own need",
  },
  {
    imgSrc: "/algorithm-type-intro.png",
    body: "You can change between multiple algorithms to simulate what their key difference is when trying to find the shortest path",
  },
  {
    imgSrc: "/color-type-intro.png",
    body: "There are four main colors that differentiate every item on the grid",
  },
  {
    imgSrc: "/drag-drop-intro.png",
    body: "You can drag and move both source and target nodes to change their position on the layout",
  },
];
