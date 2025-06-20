"use strict";

// content.js

// When updating this file, make sure to
// RELOAD THE EXTENSION in Chrome to apply the changes.

// const bodyElem = document.querySelector("body");
const targetNode = document.body; // Or the closest common ancestor of the element.
const config = { childList: true, subtree: true };

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
    style.setProperty(`--contribution-default-bgColor-${i}`, color);
    // style.setProperty(`--color-calendar-graph-day-L${i}-bg`, color); // Pre-2025

    // # Contribution Cells
    //
    // .ContributionCalendar-day[data-level="2"] {
    //   fill: var(--contribution-default-bgColor-2);
    //   background-color: var(--contribution-default-bgColor-2);
    //   border-color: var(--contribution-default-borderColor-2);

    // # Default Root Cell Styles
    //
    // --contribution-default-bgColor-0: #010409;
    // --contribution-default-bgColor-1: #007728;
    // --contribution-default-bgColor-2: #02a232;
    // --contribution-default-bgColor-3: #0ac740;
    // --contribution-default-bgColor-4: #4ae168;
    //
    // --contribution-default-borderColor-0: #ffffff;
    // --contribution-default-borderColor-1: var(--contribution-default-borderColor-0);
    // --contribution-default-borderColor-2: var(--contribution-default-borderColor-0);
    // --contribution-default-borderColor-3: var(--contribution-default-borderColor-0);
    // --contribution-default-borderColor-4: var(--contribution-default-borderColor-0);
  });

  const blobStyle = document.querySelector(".js-highlight-blob")?.style;
  if (blobStyle && colors.length > 0) {
    const color = colors[colors.length - 1];
    blobStyle.fill = color;
    blobStyle.stroke = color;
  }
  // progressbarStyle.setProperty("background-color", color);
  // make it based on the first number of the width instead
  // for each width, change the color of the progress bar
  // loop through the li in the ul and get the width of each
  // if width is 25%, change the color of the progress bar to the first color
  // if width is 50%, change the color of the progress bar to the second color
  // if width is 75%, change the color of the progress bar to the third color
  // if width is 100%, change the color of the progress bar to the fourth color
  const progressbarStyle = document.getElementsByClassName(".Progress-item")?.style;
  if (progressbarStyle) {
    progressbarStyle.backgroundColor = "red";
  }
  // progressbarStyle.setProperty("background-color", color);
}

function getThemes() {
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

  const numberOfColors = randomTheme.length;
  const rainbowTheme = Array.from(
    { length: numberOfColors },
    () => randomTheme[Math.floor(Math.random() * numberOfColors)]
  );

  return {
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
}

async function init() {
  // Apply theme immediately when init is called.
  const currentTheme = await getTheme();
  const availableThemes = getThemes();
  const themeColors = availableThemes[currentTheme] || [];
  applyTheme(themeColors);

  // Observe DOM modifications for GitHub's PJAX navigation.
  var container = document.getElementById("js-pjax-container");

  if (container) {
    var observer = new MutationObserver(function (mutations) {
      var graph = document.getElementsByClassName("js-yearly-contributions")[0];

      if (graph) {
        // Re-apply theme when GitHub navigation occurs.
        init();
      }
    });

    var config = { subtree: true, childList: true };

    observer.observe(container, config);
  }
}

(async () => {
  // --- Mutation Observer Setup ---

  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        // Check if the element exists in the added nodes or in the whole document.
        const graphElement = document.querySelector(".graph-before-activity-overview");
        if (graphElement) {
          console.log("Graph element found via MutationObserver");

          init();

          observer.disconnect(); // Disconnect if you only need to run it once.
        }
      }
    }
  });

  // Start observing the DOM.
  observer.observe(targetNode, config);

  // --- Listen for theme changes from storage ---
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.favoriteColor) {
      // Re-initialize theme application on storage change.
      console.log("Theme changed, re-initializing...");
      init();
    }
  });
})();
