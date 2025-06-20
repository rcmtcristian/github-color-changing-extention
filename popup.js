"use strict";

// popup.js - Script for the extension popup.

document.addEventListener('DOMContentLoaded', function() {
  // Get the saved theme from storage.
  chrome.storage.local.get("favoriteColor", (result) => {
    if (result.favoriteColor) {
      // Select the radio button for the saved theme.
      const savedThemeRadio = document.querySelector(`input[name="theme"][value="${result.favoriteColor}"]`);
      if (savedThemeRadio) {
        savedThemeRadio.checked = true;
        displayRadioValue();
      }
    }
  });

  // Add event listeners for theme selection.
  const themeRadios = document.getElementsByName("theme");
  themeRadios.forEach(radio => {
    radio.addEventListener('change', displayRadioValue);
  });

  // Add event listener for the save button.
  const saveButton = document.getElementById("setButton");
  if (saveButton) {
    saveButton.addEventListener("click", () => {
      savingSelectedColor();
    });
  }
});

function displayRadioValue() {
  var ele = document.getElementsByName("theme");

  // Display the selected theme in the result div.
  for (let i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      const resultDiv = document.getElementById("result");
      if (resultDiv) {
        resultDiv.innerHTML = "Theme: " + ele[i].value;
      }
    }
  }
}

/**
 * returns The current theme that is selected.
 */
function selectedRadioValue() {
  var ele = document.getElementsByName("theme");

  // Return the selected theme value.
  for (let i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      return ele[i].value;
    }
  }
}

/**
 * This function saves the selected theme to the chrome storage.
 */
function savingSelectedColor() {
  let themeValue = selectedRadioValue();
  if (themeValue) {
    chrome.storage.local.set({
      favoriteColor: themeValue,
    }, () => {
      console.log("Theme saved:", themeValue);
      // Optionally close the popup after saving.
      // window.close();
    });
  }
}
