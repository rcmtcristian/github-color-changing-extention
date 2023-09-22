"use strict";

// const colorArrays = [
//   [
//     "rgb(22, 27, 34)",
//     "rgb(99, 28, 3)",
//     "rgb(189, 86, 29)",
//     "rgb(250, 122, 24)",
//     "rgb(253, 223, 104)",
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
  ["#ffffff", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  ["#ffffff", "#c6e48b", "#7bc96f", "#239a3b", "#196127"],
  ["#101217", "#003820", "#00602d", "#10983d", "#27d545"],
  ["#212836", "#631c03", "#bd561d", "#fa7a18", "#fddf68"],
  ["#ffffff", "#7FFFD4", "#76EEC6", "#66CDAA", "#458B74"],
  ["#181818", "#646464", "#A5A5A5", "#DDDDDD", "#F6F6F6"],
  ["#49006a", "#ac0279", "#f669a0", "#faa0ba", "#fcc5c0"],
  ["#181818", "#263342", " #344E6C", " #416895", " #4F83BF"],
  ["#2B2C2F", "#34353B", " #6FC1FF", " #19f9d8", " #FF4B82"],
  ["#800826", " #bc0026", " #ff2e19", "#fc6e32", "#fed976"],
  ["#ffffff", "#e48bdc", "#ca5bcc", "#a74aa8", "#61185f"],
  ["#ffffff", "#a1dab4", "#41b6c4", "#2c7fb8", "#253494"],
  ["#002b36", "#268bd2", "#2aa198", "#b58900", "#d33682"],
  ["#fdf6e3", " #eee8d5", " #839496", " #586e75", " #073642"],
];

(async () => {
  function getTheme() {
    return new Promise((resolve) => {
      chrome.storage.local.get("favoriteColor", (themeValue) => {
        resolve(themeValue.favoriteColor);
      });
    });
  }

  function applyTheme(colors) {
    const { style } = document.querySelector(":root");

    colors.forEach((color, i) => {
      style.setProperty(`--color-calendar-graph-day-L${i}-bg`, color);
    });

    const blobStyle = document.querySelector(".js-highlight-blob").style;
    const color = colors[colors.length - 1];
    blobStyle.fill = color;
    blobStyle.stroke = color;
  }

  async function init() {
    const theme = await getTheme();
    const themes = {
      standard: colorArrays[0],
      classic: colorArrays[1],
      githubDark: colorArrays[2],
      halloween: colorArrays[3],
      teal: colorArrays[4],
      leftPad: colorArrays[5],
      dracula: colorArrays[6],
      blue: colorArrays[7],
      panda: colorArrays[8],
      flame: colorArrays[9],
      pink: colorArrays[10],
      YlGnBu: colorArrays[11],
      solarizedDark: colorArrays[12],
      solarizedLight: colorArrays[13],
    };

    const colors = themes[theme] || [];
    applyTheme(colors);
  }

  chrome.storage.onChanged.addListener((changes) => {
    if (changes.favoriteColor) {
      init();
    }
  });

  // Initialize on page load
  init();
})();

const selectButton = document.querySelector("#themeButton");
const applyButton = document.querySelector("#setButton");

function displayRadioValue() {
  var ele = document.getElementsByName("theme");

  // Display the selected theme in the result div
  for (let i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      document.getElementById("result").innerHTML = "theme: " + ele[i].value;
    }
  }
}

/**
 * returns The current theme that is selected.
 */

function currentSelectedTheme() {
  let currentTheme = document.getElementById("result").innerHTML;
  return currentTheme.split(":")[1].trim();
  // console.log(currentTheme);
}

const githubUrl = "github.com";

const reload = () => {
  chrome.tabs.query({ url: `*://${githubUrl}/*` }, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.reload(tab.id);
    });
  });
};

/**
 * This function saves the selected theme to the chrome storage.
 */
function savingSelectedColor() {
  let themeValue = currentSelectedTheme();
  chrome.storage.local.set({
    favoriteColor: themeValue,
  });
}

selectButton.addEventListener("click", () => {
  displayRadioValue();
});

applyButton.addEventListener("click", () => {
  savingSelectedColor();
  // reload();
});
