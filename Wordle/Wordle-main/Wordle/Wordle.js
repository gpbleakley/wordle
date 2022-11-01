//Varaibles 
const game = document.getElementById('game');
const gameMessege = document.getElementById("output")
var secret = []
var attempt = []

//randomly selects one of the words in the array
function newWord(words) {
  const random = Math.floor(Math.random() * words.length);
  let secret = words[random];
  console.log(secret);
  
  return secret
}

function newGame() {
  gameMessege.innerHTML = "<br>"
  secret = newWord(words);
  attempt = 0
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      updateGrid(game,"","lightgrey",x,y)
      }
    }
}

//on buttton click
//Carries out game flow 
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
    
  //User Feedback in grid
  for (let x = 0; x < 5; x++) {
    updateGrid(game,guessSplit[x],colourMe[x],x,attempt);
  }
  
  //User Feedback
  gameMessege.innerHTML = feedback(guess,secret,attempt);

  attempt += 1
}

function feedback(guess,secret,attempt){
  let txt = ""
  let result= ""
  if (guess == secret) {
    result = "Winner Winner Chicken Dinner"
  }
  else if (attempt != 4) {
    txt = "you have attempt lives left"
    result = txt.replace("attempt", ((attempt-4)*-1));
  }
  else {
    txt = "Game Over <br> Correct word is secret"
    result = txt.replace("secret",secret)
  }
  return result
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
  for (let y = 4; y >= 0; y--) {
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

function openForm() {
  document.getElementById("Help").style.display = "block";
}

function closeForm() {
  document.getElementById("Help").style.display = "none";
}