const game = document.getElementById('game');
const gameMessege = document.getElementById("output")
var lives = []
console.log(lives)
var secert = []
var attempt = 0
//randomly selects one of the words in the array

function newWord(words) {
  const random = Math.floor(Math.random() * words.length);
  let secret = words[random];
  console.log(secret);
  return secret
}
function newGame() {
 secret = newWord(words);
 lives = 5;
 console.log(lives)
}
//on buttton click 
function Attempt() {
  let guess = document.getElementById("GuessButton").value.toLowerCase();

  //checks if guess is the same length as secret
  if (guess.length != secret.length) {
        alert("Please Enter " + secret.length + " Letters");
        return
    }
  
  let secretSplit = secret.split("");
  let guessSplit = guess.split("");
  let colourMe = isLetter(secretSplit,guessSplit);
  
  for (let x = 0; x < 5; x++) {
    updateGrid(game,guessSplit[x],colourMe[x],x,attempt);
  }
  
  let txt = ""
  if (guess == secret) {
    txt = "Winner Winner Chicken Dinner"
    gameMessege.innerHTML = txt;
  }
  else if (lives =! 0) {
    txt = "you have lives left"
    gameMessege.innerHTML = txt.replace("lives", lives);;
  }
  else {
    txt = "Game Over"
    gameMessege = txt
  }

  console.log(attempt)
  attempt += 1
}

//checks if guess is the same secert for each letter
//adds result to an list fo updateGrid()
function isLetter(secretSplit,guessSplit) {
  let colourMe = [];
  for (let x = 0; x < 5; x++) {
    if (guessSplit[x] == secretSplit[x]){
      colourMe.push("MediumSeaGreen");
    }
    else if (secretSplit.includes(guessSplit[x])){
      colourMe.push("yellow");
    }
    else {
      colourMe.push("Tomato");
    }
  }
 return colourMe
}

//creates an element to display output
function drawGrid(container){
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      const box = document.createElement('div');
      box.className = "box"
      box.textContent = "";
      box.id = `box${x}${y}`;
      container.appendChild(box);
    }
  }
}

drawGrid(game);

//updates boxs with parameters 
function updateGrid(container,letter,colour,locationX,locationY){
    const box = document.getElementById(`box${locationX}${locationY}`);
    box.textContent = letter;
    box.style.backgroundColor = colour;
    container.appendChild(box);
}