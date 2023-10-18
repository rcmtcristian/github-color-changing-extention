"use strict";

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
      standard: ["", "", "", "", ""],
      classic: ["#eeeeee", "#dcedc8", "#aed581", "#7cb342", "#33691e"],
      githubDark: ["#101217", "#005e35", "#00844a", "#00aa5f", "#00d074"],
      halloween: ["#212836", "#631c03", "#bd561d", "#fa7a18", "#fddf68"],
      teal: ["#044c46", "#098379", "#46e8d8", "#9cfcf0", "#b8fff7"],
      grayscale: ["#181818", "#646464", "#A5A5A5", "#DDDDDD", "#F6F6F6"],
      dracula: ["#49006a", "#ac0279", "#f669a0", "#faa0ba", "#fcc5c0"],
      blue: ["#eeeeee", "#bbdefb", "#64b5f6", "#1e88e5", "#0d47a1"],
      panda: ["#9c1b5b", "#ca1a50", "#f37651", "#f6bf9d", "#faebdd"],
      flame: ["#800826", " #bc0026", "#ff2e19", "#fc6e32", "#fed976"],
      pink: ["#eeeeee", "#faafe1", "#fb6dcc", "#fa3fbc", "#ff00ab"],
      sunny: ["#eeeeee", "#fff9c4", "#fff176", "#ffd835", "#f57f17"],
      solarizedD: ["#eeeeee", "#fed800", "#ff6f01", "#fd2f24", "#811d5e"],
      solarizedL: ["#fdf6e3", "#eee8d5", "#839496", "#586e75", "#073642"],
      // tritanopia: [
      //   "#3DCAC5",
      //   "#5FB4AE",
      //   "#7F9E96",
      //   "#E867F",
      //   "#B86E68",
      //   "#F2292C",
      //   "#F23433",
      //   "#F23E39",
      //   "#F74046",
      //   "#FB5860",
      // ],
      // rainbow: [
      //   "#FFFFFF",
      //   "#3A86FF",
      //   "#5F5FF6",
      //   "#8338EC",
      //   "#A22ACD",
      //   "#85607",
      //   "#FD2B3B",
      //   "#FD8A09",
      //   "#FF006E",
      //   "#FFBEOB",
      // ],
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
      document.getElementById("result").innerHTML = "Theme: " + ele[i].value;
    }
  }
}

/**
 * returns The current theme that is selected.
 */

let selectedColor = "";
function selectedRadioValue() {
  var ele = document.getElementsByName("theme");

  // Display the selected theme in the result div
  for (let i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      return (selectedColor = ele[i].value);
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

/**
 * This function saves the selected theme to the chrome storage.
 */
function savingSelectedColor() {
  let themeValue = selectedRadioValue();
  chrome.storage.local.set({
    favoriteColor: themeValue,
  });
}

// selectButton.addEventListener("click", () => {
//   displayRadioValue();
// });

applyButton.addEventListener("click", () => {
  savingSelectedColor();
  // reload();
});
