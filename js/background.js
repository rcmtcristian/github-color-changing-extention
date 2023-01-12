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

// function savingSelectedColor() {
//   let themeValue = currentSelectedTheme();
//   chrome.storage.local.setItem("favoriteColor", themeValue, function () {
//     if (chrome.runtime.error) {
//       console.log("Runtime error.");
//     } else {
//       console.log("Theme value is stored successfully.");
//     }
//   });
// }

function savingSelectedColor() {
  let themeValue = currentSelectedTheme();
  chrome.storage.local.set({
    favoriteColor: themeValue,
  });
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

// async function displayRadioValue() {
//   var ele = document.getElementsByName("theme");

//   // Display the selected theme in the result div
//   for (let i = 0; i < ele.length; i++) {
//     if (ele[i].checked) {
//       document.getElementById("result").innerHTML = "theme: " + ele[i].value;
//     }
//   }
// }

/**
 * returns The current theme that is selected.
 */

// function currentSelectedTheme() {
//   let currentTheme = document.getElementById("result").innerHTML;
//   return currentTheme.split(":")[1].trim();
// }

// async function savingSelectedColor() {
//   let themeValue = currentSelectedTheme();
//   try {
//     await chrome.storage.local.setItem("favoriteColor", themeValue);
//     console.log("Theme value is stored successfully.");
//   } catch (err) {
//     console.log("Error while storing theme value: ", err);
//   }
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const button = document.querySelector("#themeButton");
//   button.addEventListener("click", async () => {
//     await displayRadioValue();
//     await savingSelectedColor();
//   });
// });

// function savingSelectedColor() {
//   let themeValue = currentSelectedTheme();
//     chrome.storage.local.set({
//       favoriteColor: themeValue,
//     });
// }
// function saveOptions() {
//   var color = document.getElementById("color").value;
//   chrome.storage.local.set(
//     {
//       favoriteColor: color,
//     },
//     function () {
//       var status = document.getElementById("status");
//       status.textContent = "Options saved.";
//       setTimeout(function () {
//         status.textContent = "";
//       }, 750);
//     }
//   );
// }

// function restoreOptions() {
//   chrome.storage.local.get(
//     {
//       favoriteColor: "halloween",
//     },
//     function (items) {
//       document.getElementById("color").value = items.favoriteColor;
//     }
//   );
// }
