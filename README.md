# Car Logo Puzzle Game

The **Car Logo Puzzle Game** is a fun and interactive web-based game where players guess the name of a car logo by piecing together incomplete puzzles. With a visually appealing design and engaging gameplay, the game offers an enjoyable experience for car enthusiasts and casual players alike.

---

## Features

- **Guess the Car Logo**: Players identify car logos from incomplete puzzle pieces.
- **Multiple Levels**: Progress through levels as you correctly guess car logos.
- **Hints System**: Get hints by revealing random missing puzzle pieces for incorrect guesses.
- **Navigation Options**: Use buttons to retry, move to the next level, or return to the home page.
- **Responsive Design**: Play seamlessly on desktop, tablet, and mobile devices.

---

## Files and Structure

### 1. HTML Files:
- **`index.html`**: Home page introducing the game and allowing navigation to the play or support pages.
- **`play.html`**: Main game page where players attempt to guess the car logo.
- **`play-completed.html`**: Displays the completed puzzle and car logo details after a correct guess.
- **`support.html`**: Instructions and tips for playing the game.

### 2. CSS:
- Styles the layout, typography, buttons, and other UI elements to create a visually appealing game.

### 3. JavaScript:
- **`main.js`**: Handles game logic, including puzzle rendering, guessing logic, and user interactions.
- **`completed.js`**: Manages the display of completed puzzles and navigation after completing a level.

---

## Installation and Setup

1. **Clone or Download**:
   Download or clone this repository to your local machine.

2. **Folder Structure**:
   Ensure the following folder structure is maintained:



3. **Open in Browser**:
Open `index.html` in your preferred web browser to start the game.

---

## How to Play

### Objective
The goal of the game is to correctly guess the car logo from the incomplete puzzle displayed.

### Game Instructions
1. **On the Play Page**:
- Examine the puzzle and use the visible pieces to identify the car logo.
- Enter your guess in the input box and click **Submit**.
- For every incorrect guess:
  - A random missing piece of the puzzle will be revealed.
  - You have 3 attempts per level to guess correctly.

2. **If You Guess Correctly**:
- Progress to the **Completed Page**, where the full puzzle and car details are displayed.

3. **If You Fail All Attempts**:
- The puzzle and the correct car name are revealed, and you can retry or move to the next level.

### Navigation
- **Play Button**: Start the game.
- **Support Button**: Access the instructions and tips for playing.
- **Prev Button**: Return to the previous page or level.
- **Next Button**: Proceed to the next level after completing a puzzle.

---

## File Details

### HTML
- **`index.html`**: Displays the home page with buttons to navigate to the game or support page.
- **`play.html`**: Displays the puzzle and guessing interface for each level.
- **`play-completed.html`**: Displays the completed puzzle and car name after a correct guess.
- **`support.html`**: Provides detailed instructions, tips, and objectives for playing the game.

### CSS
- Styles for buttons, headers, footers, puzzles, and other UI elements.
- Includes responsive design for a seamless experience across devices.

### JavaScript
1. **`main.js`**:
- Handles game logic, including:
  - Rendering puzzles dynamically based on level data.
  - Managing guessing attempts and feedback.
  - Updating the puzzle display with revealed pieces after incorrect guesses.

2. **`completed.js`**:
- Displays the completed puzzle and car details after a correct guess.
- Manages navigation between levels.

---

## Dependencies

- HTML5
- CSS3
- JavaScript (ES6+)
- JSON data file (`carData.json`) containing car details for each level.

---

## Contributing

Contributions are welcome! If you'd like to enhance the game or fix any issues, feel free to fork the repository and submit a pull request.

---

