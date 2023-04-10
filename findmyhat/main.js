const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');


const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 10;
const col = 10;

// Create a 2D array (10 x 10)for the field
/* 
░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░
*/
const field = [];
for (let i = 0; i < row; i++) {
  let rowArr = [];
  for (let j = 0; j < col; j++) {
    rowArr.push(fieldCharacter);
  }
  field.push(rowArr);
}


// Place the pathCharacter at the starting position (0,0)
/* 
* ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░
*/
field[0][0] = pathCharacter;


// Randomise the hat placement on the field represented by ^
/* 
* ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ^ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░
*/
const hatRow = Math.floor(Math.random() * row);
const hatCol = Math.floor(Math.random() * col);
field[hatRow][hatCol] = hat;


// Randomise 15-20 holes on the field represented by 0
/*
* ░ ░ ░ ░ ░ ░ O O ░
░ O ░ ░ ░ ░ ░ ░ ░ ░
O ░ ░ O ░ ░ ░ O ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ O ░
░ ░ ░ ░ ░ ^ ░ ░ ░ ░
░ ░ O ░ ░ ░ ░ O O ░
░ O ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ O ░ ░ O ░
O ░ O ░ O ░ ░ O ░ O
*/
const numHoles = Math.floor(Math.random() * (20 - 15 + 1)) + 15;
for (let i = 0; i < numHoles; i++) {
  const holeRow = Math.floor(Math.random() * row);
  const holeCol = Math.floor(Math.random() * col);
  field[holeRow][holeCol] = hole;
}


// Function to display the initial state of the field
/*
* ░ ░ ░ ░ ░ ░ O O ░
░ O ░ ░ ░ ░ ░ ░ ░ ░
O ░ ░ O ░ ░ ░ O ░ ░
░ ░ ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ ░ ░ ░ O ░
░ ░ ░ ░ ░ ^ ░ ░ ░ ░
░ ░ O ░ ░ ░ ░ O O ░
░ O ░ ░ ░ ░ ░ ░ ░ ░
░ ░ ░ ░ ░ O ░ ░ O ░
O ░ O ░ O ░ ░ O ░ O
*/
function startGame() {
    for (let i = 0; i < row; i++) {
        console.log(field[i].join(''));
      }
}


// Starting position of the pathCharacter
let currentRow = 0;
let currentCol = 0;
// Switch function to move the pathCharacter in the specified direction with +/-
function movePathCharacter(direction) {
    switch (direction) {
      case 'U':
      case 'u':
        currentRow--;
        break;
      case 'D':
      case 'd':
        currentRow++;
        break;
      case 'L':
      case 'l':
        currentCol--;
        break;
      case 'R':
      case 'r':
        currentCol++;
        break;
      default:
        prompt('Enter (u, d, l or r)');
    }
}


// Get user input for the direction to move
while (true) {
    // Display the current state of the field
    clear();
    startGame();


// Prompt user for direction
const direction = prompt('Which way?');


// move the pathCharacter in the specified direction
movePathCharacter(direction);


// Check if new position is on hole/cap/out of playing field, else update new position and play on
if (currentCol < 0 || currentCol >= col || currentRow < 0 || currentRow >= row) {
    console.log('Out of bounds - Game End!');
    break;
  } else if (field[currentRow][currentCol] === hole) {
    console.log('Sorry, you fell down a hole!');
    break;
  } else if (field[currentRow][currentCol] === hat) {
    console.log('Congrats, you found your hat!');
    break;
  } else {
    field[currentRow][currentCol] = pathCharacter;
  }
}