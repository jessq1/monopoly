/*-------------------------------- Constants --------------------------------*/

const initialFund = 2000 
const player1 = "Player 1"
const player2 = "Player 2"
const player3 = "Player 3"
const player4 = "Player 4"


/*---------------------------- Variables (state) ----------------------------*/
let plCount, player1fund, player2fund, player3fund, player4fund, player1plot, player2plot, player3plot, player4plot, turn, winner, diceNum; 


/*------------------------ Cached Element References ------------------------*/
const boardEl = document.getElementById('boardWrapper');
const playBtn = document.getElementById('playGame');
const homeBtn = document.getElementById('backToHome');

const diceBtn = document.getElementById('rollDiceBtn');
const Die1El = document.getElementById('firstDie');
const Die2El = document.getElementById('secondDie');
const diceMsg = document.getElementById('rollDiceMsg');


const homePage = document.querySelector("div.home");
const gamePage = document.querySelector(".gamePage");

// Home selction screen
const PlayerNumSel = document.querySelector(".playerNumSelection");



/*----------------------------- Event Listeners -----------------------------*/


PlayerNumSel.addEventListener("click", (evt) => {
    plCount = evt.target.id.charAt(0)
    playBtn.style.display = "flex"
  });
  
playBtn.addEventListener("click", () => {
    homePage.style.display = 'none'
    gamePage.style.display = 'grid'
    init()
})

homeBtn.addEventListener("click", ()=>{
  homePage.style.display = 'flex'
  gamePage.style.display = 'none'
  playBtn.style.display = "none"
  init()
})

diceBtn.addEventListener("click", () => {
  rollDice()
})



/*--------------------------------- Objects ---------------------------------*/
// 40 plots as objects:

// chances cards as objects:




/*-------------------------------- Functions --------------------------------*/

function init(){
  player1fund = initialFund;
  player2fund = initialFund;
  player3fund = initialFund;
  player4fund = initialFund;
  player1plot = [];
  player2plot = [];
  player3plot = [];
  player4plot = [];
  turn = null;
  winner = null;
  diceNum = null;

}

function rollDice() {
  let die1=Math.ceil(Math.random()*6)
  let die2=Math.ceil(Math.random()*6)
  Die1El.className = "dice"+die1
  Die2El.className = "dice"+die2

  diceNum = die1 + die2

  diceMsg.innerText = `Your roll is ${diceNum}.`
  
}

