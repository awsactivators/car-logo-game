document.addEventListener("DOMContentLoaded", async () => {
  console.log("Page loaded");

  // Sound Control
  var backgroundMusic = new Audio("./sounds/car.mp3");
  backgroundMusic.loop = true;

  var soundIcon = document.getElementById("sound-icon");
  var muteIcon = document.getElementById("mute-icon");

  // Info Box
  var infoIcon = document.getElementById("info-icon");
  var infoBox = document.getElementById("info-box");

  // Settings Modal
  var settingsIcon = document.getElementById("settings-icon");
  var settingsModal = document.getElementById("settings-modal");
  var overlay = document.getElementById("overlay");
  var darkModeToggle = document.getElementById("dark-mode-toggle");
  var closeSettings = document.getElementById("close-settings");

  // Home Icon
  var homeIcon = document.getElementById("home-icon");

  // Like and Dislike Icons
  var likeIcon = document.getElementById("thumbs-up");
  var dislikeIcon = document.getElementById("thumbs-down");
  var images = {
    likeDefault: "./images/thumbs-up.png",
    likeActive: "./images/thumbs-up-clicked.png",
    dislikeDefault: "./images/thumbs-down.png",
    dislikeActive: "./images/thumbs-down-clicked.png",
  };

  // Fetch the JSON data from the local file
  let cars = {}; // Store car data
  const urlParams = new URLSearchParams(window.location.search);
  const level = parseInt(urlParams.get("level")) || 1; // Default to level 1
  const canvas = document.getElementById("my_canvas");
  const context = canvas.getContext("2d");
  const levelNumberElement = document.querySelector(".level-number");
  const messageContainer = document.getElementById("message-container");
  let trials = 3; // Number of attempts allowed for the user
  let pieces = [];
  let missingPieces = [];
  const rows = 5;
  const cols = 5;

  // Fetch car data from carData.json
  fetch("./carData.json")
    .then((response) => response.json())
    .then((data) => {
      cars = data;

      // Get current level's car data
      const car = cars[level];
      if (!car) {
        console.error("No data found for this level");
        window.location.href = "./index.html";
        return;
      }

      // Update level number
      if (levelNumberElement) {
        levelNumberElement.textContent = level;
      }

      // Load the car image
      const image = new Image();
      image.src = car.image;
      image.onload = () => {
        console.log("Car image loaded:", car.image);
        initializePuzzle(image);
      };
    })
    .catch((error) => console.error("Error fetching car data:", error));

  // Initialize puzzle
  function initializePuzzle(image) {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        pieces.push({
          x: col * (image.width / cols),
          y: row * (image.height / rows),
          width: image.width / cols,
          height: image.height / rows,
        });
      }
    }

    // Mark 12 pieces as missing
    while (missingPieces.length < 2) {
      const randomIndex = Math.floor(Math.random() * pieces.length);
      if (!missingPieces.includes(randomIndex)) {
        missingPieces.push(randomIndex);
      }
    }

    drawPuzzle(image);
  }

  // Draw puzzle on the canvas
  function drawPuzzle(image) {
    const targetWidth = 300; 
    const targetHeight = 358; 

    // Set canvas size to fixed dimensions
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Scale the image to fit the entire canvas
    context.drawImage(image, 0, 0, image.width, image.height, 0, 0, targetWidth, targetHeight);

    // Calculate scaled puzzle piece dimensions
    const scaledPieceWidth = targetWidth / cols;
    const scaledPieceHeight = targetHeight / rows;

    // Redraw the scaled puzzle grid with missing pieces
    pieces.forEach((piece, index) => {
      const destX = piece.x * scaledPieceWidth / piece.width; // Scale position to canvas
      const destY = piece.y * scaledPieceHeight / piece.height;

      if (!missingPieces.includes(index)) {
        // Draw the piece from the scaled image
        context.drawImage(
          image,
          piece.x, piece.y, piece.width, piece.height, // Source (original dimensions)
          destX, destY, scaledPieceWidth, scaledPieceHeight // Destination (canvas)
        );

        // Draw borders around each puzzle piece
        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.strokeRect(destX, destY, scaledPieceWidth, scaledPieceHeight);
      }
    });
  }

  function revealRandomMissingPiece(image) {
    if (missingPieces.length > 0) {
      const randomIndex = Math.floor(Math.random() * missingPieces.length);
      missingPieces.splice(randomIndex, 1); // Remove revealed piece from missing list
      drawPuzzle(image); // Redraw the puzzle
    }
  }

  // Handle form submission for guessing the car name
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userInput = document.querySelector("input[name='name']").value.trim().toLowerCase();
    const car = cars[level];

    if (userInput === car.name.toLowerCase()) {
      updateMessage("Correct! Redirecting...", "green");
      setTimeout(() => navigateToCompletedPage(level), 1000);
    } else {
      trials--;
      if (trials > 0) {
        updateMessage(`Wrong answer! You have ${trials} attempt(s) left.`, "red");
        const image = new Image();
        image.src = car.image;
        image.onload = () => {
          revealRandomMissingPiece(image); // Reveal a missing piece after incorrect guess
        };
      } else {
        updateMessage("Game over! Redirecting...", "red");
        setTimeout(() => navigateToCompletedPage(level), 1000);
      }
    }
  });

  // Update feedback message
  function updateMessage(message, color) {
    messageContainer.textContent = message;
    messageContainer.style.color = color;
  }

  // Navigate to the completed page
  function navigateToCompletedPage(level) {
    window.location.href = `./play-completed.html?level=${level}`; // Ensure correct path
  }

  // Sound Control
  soundIcon.addEventListener("click", () => {
    backgroundMusic.play();
    soundIcon.style.display = "none";
    muteIcon.style.display = "block";
  });

  muteIcon.addEventListener("click", () => {
    backgroundMusic.pause();
    muteIcon.style.display = "none";
    soundIcon.style.display = "block";
  });

  // Info Box functionality
  if (!infoBox) {
    infoBox = document.createElement("div");
    infoBox.id = "info-box";
    infoBox.textContent = "Try and guess the superhero's name from the unfinished puzzle.";
    document.body.appendChild(infoBox);
  }


  var positionInfoBox = () => {
    var iconRect = infoIcon.getBoundingClientRect();
    infoBox.style.top = `${iconRect.bottom + 25}px`;
    infoBox.style.left = `${iconRect.left + iconRect.width / 2}px`;
    infoBox.style.transform = "translateX(-50%)";
  };


  infoIcon.addEventListener("click", () => {
    if (infoBox.style.display === "none" || infoBox.style.display === "") {
      positionInfoBox();
      infoBox.style.display = "block";
    } else {
      infoBox.style.display = "none";
    }
  });


  document.addEventListener("click", (e) => {
    if (e.target !== infoIcon && e.target !== infoBox) {
      infoBox.style.display = "none";
    }
  });


  // Settings Modal functionality
  settingsIcon.addEventListener("click", () => {
    settingsModal.style.display = "block";
    overlay.style.display = "block";
  });


  closeSettings.addEventListener("click", () => {
    settingsModal.style.display = "none";
    overlay.style.display = "none";
  });


  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkModeToggle.textContent = document.body.classList.contains("dark-mode")
      ? "Toggle Light Mode"
      : "Toggle Dark Mode";
  });


  overlay.addEventListener("click", () => {
    settingsModal.style.display = "none";
    overlay.style.display = "none";
  });


  // Home Icon functionality
  homeIcon.addEventListener("click", () => {
    window.location.href = "./index.html";
  });


  // Like and Dislike Icon functionality
  likeIcon.addEventListener("click", (e) => {
    e.preventDefault();

    var likeImg = likeIcon.querySelector("img");
    var dislikeImg = dislikeIcon.querySelector("img");

    if (likeImg.src.includes("thumbs-up")) {
      likeImg.src = images.likeActive;
      dislikeImg.src = images.dislikeDefault;
    } else {
      likeImg.src = images.likeDefault;
    }
  });


  dislikeIcon.addEventListener("click", (e) => {
    e.preventDefault();

    var likeImg = likeIcon.querySelector("img");
    var dislikeImg = dislikeIcon.querySelector("img");

    if (dislikeImg.src.includes("thumbs-down")) {
      dislikeImg.src = images.dislikeActive;
      likeImg.src = images.likeDefault;
    } else {
      dislikeImg.src = images.dislikeDefault;
    }
  });
  
});
