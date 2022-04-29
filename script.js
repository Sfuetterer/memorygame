const gameContainer = document.getElementById("game");
let firstCard;
let secondCard;
let hasFlippedCard = false;
let openedCards = false;
let matches = 0;
const value=document.querySelector("#score");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);


    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }

}

// TODO: Implement this function!
function handleCardClick(event) {
  if (openedCards) return;
  // you can use event.target to see which element was clicked
  let selectedColor = event.target.className;
  event.target.style.backgroundColor = selectedColor;
  // console.log("you just clicked", event.target);
  this.classList.add('flip');

  if (!hasFlippedCard) {
   hasFlippedCard = true;
   firstCard = this;
   firstClassName = (firstCard.className); 
   return;
  }
  else {
    hasFlippedCard = false;
    secondCard = this;
    secondClassName = (secondCard.className);

    isItAMatch();
  }
  
function isItAMatch() {
    if (firstClassName === secondClassName) {
      matches++;
      disable();
      value.textContent=matches;
      return;
    }
    unflip();
  }

function disable() {
  firstCard.removeEventListener("click", handleCardClick);
  secondCard.removeEventListener("click", handleCardClick);
}

    function unflip() {
      openedCards = true;
      setTimeout(() => {
    firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      firstCard.style.backgroundColor= null;
      secondCard.style.backgroundColor= null;
      openedCards = false;
      }, 1000);
    }


  if (matches === COLORS.length/2){
    setTimeout(() =>{
    alert('You did it!')}, 1000);
    const reset = document.getElementById('reset');
    reset.disabled = false;
    reset.onclick = function resetGame() {
      window.location.reload(true);
    }
  }
}

// when the DOM loads
const btn = document.getElementById('button');
btn.onclick = function() {
    btn.disabled = true;
    return createDivsForColors(shuffledColors);
  }


