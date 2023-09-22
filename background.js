/* Getting the value of the radio button that is checked. */
// const colorArrays = [
//   [
//     "rgb(22, 27, 34)",
//     "rgb(99, 28, 3)",
//     "rgb(189, 86, 29)",
//     "rgb(250, 122, 24)",
//     "rgb(253, 223, 104)",
//   ],
//   [
//     "rgb(255, 238, 74)",
//     "rgb(255, 197, 1)",
//     "rgb(254, 150, 0)",
//     "rgb(3, 0, 28)",
//     "rgb(255, 0, 255)",
//   ],
//   [
//     "rgb(0, 0, 0)",
//     "rgb(127, 127, 127)",
//     "rgb(255, 255, 255)",
//     "rgb(200, 200, 200)",
//     "rgb(100, 100, 100)",
//   ],
// ];

const colorArrays = [
  [
    "rgb(22, 27, 34)",
    "rgb(99, 28, 3)",
    "rgb(189, 86, 29)",
    "rgb(250, 122, 24)",
    "rgb(253, 223, 104)",
  ],
];

const myTheme = () => {
  chrome.storage.local.get("favoriteColor", (themeValue) => {
    let chosenColor = themeValue.favoriteColor;

    const themes = {
      standard: colorArrays[0],
      classic: colorArrays[1],
      githubDark: colorArrays[2],
    };

    const colors = themes[chosenColor] || [];
    themeActivityOverview(colors);
    themeContributionGraph(colors);
  });
};

chrome.storage.onChanged.addListener((changes) => {
  if (changes.favoriteColor) {
    myTheme();
  }
});

function themeContributionGraph(colors) {
  console.log(colors, "maybe");
  const { style } = document.querySelector(":root");

  colors.forEach((color, i) => {
    style.setProperty(`--color-calendar-graph-day-L${i}-bg`, color);
  });
}

function themeActivityOverview(colors) {
  console.log(colors, "maybe");
  const { style } = document.querySelector(".js-highlight-blob");
  const color = colors[colors.length - 1];
  style.fill = color;
  style.stroke = color;
}

(function () {
  myTheme();
});
