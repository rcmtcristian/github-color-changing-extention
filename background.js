"use strict";
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
}

/**
 * This function saves the selected theme to the chrome storage.
 */
function savingSelectedColor() {
  let themeValue = currentSelectedTheme();
  chrome.storage.sync.set(
    {
      favoriteColor: themeValue,
    },
    function () {
      console.log("Value is set to " + themeValue);
    }
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("#themeButton");
  button.addEventListener("click", () => {
    displayRadioValue();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const buttonTwo = document.querySelector("#setButton");
  buttonTwo.addEventListener("click", () => {
    savingSelectedColor();
  });
});
