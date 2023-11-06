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
    // progressbarStyle.setProperty("background-color", color);
    //make it based on the first number of the width instead
    // for each width, change the color of the progress bar
    // loop through the li in the ul and get the width of each
    // if width is 25%, change the color of the progress bar to the first color
    // if width is 50%, change the color of the progress bar to the second color
    // if width is 75%, change the color of the progress bar to the third color
    // if width is 100%, change the color of the progress bar to the fourth color
    const progressbarStyle =
      document.getElementsByClassName(".Progress-item").style;
    progressbarStyle.backgroundColor = "red";
    // progressbarStyle.setProperty("background-color", color);
  }

  async function init() {
    const randomTheme = [
      "#ffbe0b",
      "#fd8a09",
      "#fb5607",
      "#fd2b3b",
      "#c11cad",
      "#a22acd",
      "#83d483",
      "#06d6a0",
      "#118ab2",
      "#0c637f ",
    ];

    const theme = await getTheme();
    const numberOfColors = randomTheme.length;
    const rainbowTheme = Array.from(
      { length: numberOfColors },
      () => randomTheme[Math.floor(Math.random() * numberOfColors)]
    );

    const themes = {
      standard: ["", "", "", "", ""],
      classic: ["#eeeeee", "#dcedc8", "#aed581", "#7cb342", "#33691e"],
      githubDark: ["#101217", "#005e35", "#00844a", "#00aa5f", "#00d074"],
      halloween: ["#212836", "#631c03", "#bd561d", "#fa7a18", "#fddf68"],
      teal: ["#044c46", "#098379", "#46e8d8", "#9cfcf0", "#b8fff7"],
      random: rainbowTheme,
      dracula: ["#49006a", "#ac0279", "#f669a0", "#faa0ba", "#fcc5c0"],
      blue: ["#eeeeee", "#bbdefb", "#64b5f6", "#1e88e5", "#0d47a1"],
      // deepBlue: ["#eeeeee", "#9ba8e9", "#4063c4", "#304ea1", "#21396e"],
      panda: ["#9c1b5b", "#ca1a50", "#f37651", "#f6bf9d", "#faebdd"],
      flame: ["#800826", " #bc0026", "#ff2e19", "#fc6e32", "#fed976"],
      pink: ["#eeeeee", "#faafe1", "#fb6dcc", "#fa3fbc", "#ff00ab"],
      sunny: ["#eeeeee", "#fff9c4", "#fff176", "#ffd835", "#f57f17"],
      solarizedD: ["#eeeeee", "#fed800", "#ff6f01", "#fd2f24", "#811d5e"],
      solarizedL: ["#fdf6e3", "#eee8d5", "#839496", "#586e75", "#073642"],
      heatmap: ["#2aa8f2", "#8bd448", "#fae442", "#fba949", "#ff6355"],
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
  applyTheme();

  // Observe DOM modifications
  var container = document.getElementById("js-pjax-container");

  if (container) {
    var observer = new MutationObserver(function (mutations) {
      var graph = document.getElementsByClassName("js-yearly-contributions")[0];

      if (graph) {
        applyTheme();
      }
    });

    var config = { subtree: true, childList: true };

    observer.observe(container, config);
  }
});

// Call applyOptions after document load

// (function () {
//   // Call applyOptions after document load
//   applyTheme();

//   // Observe DOM modifications
//   var container = document.getElementById("js-pjax-container");

//   if (container) {
//     var observer = new MutationObserver(function (mutations) {
//       var graph = document.getElementsByClassName(
//         "js-yearly-contributions"
//       )[0];

//       if (graph) {
//         applyTheme();
//       }
//     });

//     var config = { subtree: true, childList: true };

//     observer.observe(container, config);
//   }
// })();
