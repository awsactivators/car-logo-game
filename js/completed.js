document.addEventListener("DOMContentLoaded", () => {
  // Variables
  
  var backgroundMusic = new Audio("./sounds/car.mp3");
  var soundIcon = document.getElementById("sound-icon");
  var muteIcon = document.getElementById("mute-icon");
  var infoIcon = document.getElementById("info-icon");
  var infoBox = document.getElementById("info-box");
  var settingsIcon = document.getElementById("settings-icon");
  var settingsModal = document.getElementById("settings-modal");
  var overlay = document.getElementById("overlay");
  var darkModeToggle = document.getElementById("dark-mode-toggle");
  var closeSettings = document.getElementById("close-settings");
  var homeIcon = document.getElementById("home-icon");

  var levelNumberElement = document.querySelector(".level-number");
  var carNameElement = document.querySelector(".superhero-name"); // Element for car name
  var completedPuzzleElement = document.querySelector(".completed-jigsaw-puzzle");
  var backgroundMusic = new Audio("./sounds/car.mp3");
  var soundIcon = document.getElementById("sound-icon");
  var muteIcon = document.getElementById("mute-icon");
  var levelNumberElement = document.querySelector(".level-number");
  var carNameElement = document.querySelector(".car-name");
  var completedPuzzleElement = document.querySelector(".completed-jigsaw-puzzle");
  var prevButton = document.querySelector(".prev-btn a");
  var nextButton = document.querySelector(".next-btn a");

  // Fetch car data
  fetch("./carData.json")
    .then((response) => response.json())
    .then((cars) => {
      const urlParams = new URLSearchParams(window.location.search);
      const level = parseInt(urlParams.get("level")) || 1;
      const car = cars[level];

      if (!car) {
        alert("No data available for this level!");
        window.location.href = "./index.html";
        return;
      }

      if (levelNumberElement) levelNumberElement.textContent = level;
      if (carNameElement) carNameElement.textContent = car.name;

      if (completedPuzzleElement) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const targetWidth = 300;
        const targetHeight = 358;

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const image = new Image();
        image.src = car.image;
        image.onload = () => {
          context.drawImage(image, 0, 0, image.width, image.height, 0, 0, targetWidth, targetHeight);
        };

        completedPuzzleElement.appendChild(canvas);
      }

      // Prev and Next buttons
      if (prevButton) {
        prevButton.addEventListener("click", (e) => {
          e.preventDefault();
          const previousLevel = level > 1 ? level - 1 : 1;
          window.location.href = `./play.html?level=${previousLevel}`;
        });
      }

      if (nextButton) {
        nextButton.addEventListener("click", () => {
          const nextLevel = level + 1;
          window.location.href = `./play.html?level=${nextLevel}`;
        });
      }
    })
    .catch((error) => console.error("Error fetching car data:", error));


  // Sound Control
  backgroundMusic.loop = true; // Ensure the background music loops

  soundIcon.addEventListener("click", () => {
    backgroundMusic.play(); // Play music
    soundIcon.style.display = "none"; 
    muteIcon.style.display = "block"; 
  });


  muteIcon.addEventListener("click", () => {
    backgroundMusic.pause(); // Pause music
    muteIcon.style.display = "none"; 
    soundIcon.style.display = "block"; 
  });


  // Info Icon
  if (!infoBox) {
    // Create the info box dynamically if it doesn't already exist
    infoBox = document.createElement("div");
    infoBox.id = "info-box";
    infoBox.textContent = "Try and guess the superhero's name from the unfinished puzzle.";
    document.body.appendChild(infoBox);
  }


  // Position the info box relative to the info icon
  var positionInfoBox = () => {
    var iconRect = infoIcon.getBoundingClientRect();
    infoBox.style.top = `${iconRect.bottom + 25}px`; // Position below the icon
    infoBox.style.left = `${iconRect.left + iconRect.width / 2}px`; // Center align
    infoBox.style.transform = "translateX(-50%)"; // Adjust position to be centered
  };


  infoIcon.addEventListener("click", () => {
    if (infoBox.style.display === "none" || infoBox.style.display === "") {
      positionInfoBox(); // Calculate and set the position of the info box
      infoBox.style.display = "block"; 
    } else {
      infoBox.style.display = "none"; 
    }
  });


  document.addEventListener("click", (e) => {
    if (e.target !== infoIcon && e.target !== infoBox) {
      infoBox.style.display = "none"; // Hide the info box if clicking outside of it
    }
  });


  // Settings Icon
  settingsIcon.addEventListener("click", () => {
    settingsModal.style.display = "block"; 
    overlay.style.display = "block"; 
  });


  closeSettings.addEventListener("click", () => {
    settingsModal.style.display = "none"; 
    overlay.style.display = "none"; 
  });


  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode"); // Toggle dark mode class on the body
    darkModeToggle.textContent = document.body.classList.contains("dark-mode")
      ? "Toggle Light Mode" // Update button text for light mode
      : "Toggle Dark Mode"; // Update button text for dark mode
  });


  overlay.addEventListener("click", () => {
    settingsModal.style.display = "none"; 
    overlay.style.display = "none"; 
  });


  // Home Icon
  homeIcon.addEventListener("click", () => {
    window.location.href = "./index.html"; 
  });
});

