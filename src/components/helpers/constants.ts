export const tutorialColors = [
  { color: "#40cee3", tag: "Visited" },
  { color: "#f1f511", tag: "Shortest Path" },
];
export const algorithms = [
  { value: "dijkstra", label: "Dijkstra" },
  // { value: "aStar", label: "A*" },
  // { value: "bfs", label: "Breadth First Search" },
  // { value: "dfs", label: "Depth First Search" },
];

export const gridTypes = [
  { value: "custom", label: "Custom Grid" },
  { value: "q13", label: "Diagonal Q1 - Q3" },
  { value: "q24", label: "Diagonal Q2 - Q4" },
];

export const intro = [
  {
    imgSrc: "/intro.png",
    body: "Before you get started we will walk you through a tutorial to get you familiar with the features of the website",
  },
  {
    imgSrc: "/grid.png",
    body: "You can change between multiple grid types or even create your own layout satisfying your own need",
  },
  {
    imgSrc: "/algorithm.png",
    body: "You can change between multiple algorithms to simulate what their key difference is when trying to find the shortest path",
  },
  {
    imgSrc: "/color.png",
    body: "There are colors and shapes that differentiate every item on the grid",
  },
  {
    imgSrc: "/drag.png",
    body: "You can drag and move both source and target nodes to change their position on the layout",
  },
];
