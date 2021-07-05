/*-------------------------------- Constants --------------------------------*/

const initialFund = 2000 
const player1 = "Player 1"
const player2 = "Player 2"
const player3 = "Player 3"
const player4 = "Player 4"
const allPlayerArr =[player1,player2,player3,player4]


/*---------------------------- Variables (state) ----------------------------*/
let plCount, currentPlayer, player1fund, player2fund, player3fund, player4fund, player1plot, player2plot, player3plot, player4plot, player1Steps, player2Steps, player3Steps, player4Steps, turn, turnId, winner, diceNum, currentLocation; 
let BoardCellsArr =[]
let  playerArr = []
let  playersSteps = []
let playersLocations = []
let playersFund = []




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

const playerMsg = document.getElementById('playerMsg');


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
    takeTurn()
})

homeBtn.addEventListener("click", ()=>{
  homePage.style.display = 'flex'
  gamePage.style.display = 'none'
  playBtn.style.display = "none"
  init()
})

diceBtn.addEventListener("click", () => {
  rollDice()
  play()
})



/*--------------------------------- Objects ---------------------------------*/
// players as objects:
class players {
  constructor(name, fund, steps,location, estate, status){
    this.name = name;
    this.fund = fund;
    this.steps = steps;
    this.location = location;
    this.estate = estate;
    this.status = status;
  }
}


// 40 plots as classes and objects:

class BoardCells {
  constructor(name, msgText, groupNumber, owner, rent1, rent2, rent3, price, price2, price3) {
    this.name = name;
    this.msgText = msgText;
    this.groupNumber = groupNumber;
    this.owner = owner;
    this.rent1 = rent1;
    this.rent2 = rent2;
    this.rent3 = rent3;
    this.price = price;
    this.price2 = price2;
    this.price3 = price3;

  }
}

BoardCellsArr[0]=new BoardCells("GO", "COLLECT $200 AS YOU PASS.")
BoardCellsArr[1]=new BoardCells("Avenue 1", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[2]=new BoardCells("Avenue 2", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[3]=new BoardCells("Avenue 3", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[4]=new BoardCells("Avenue 4", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[5]=new BoardCells("Avenue 5", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[6]=new BoardCells("Chance", "SELECT A CHANCE CARD")
BoardCellsArr[7]=new BoardCells("Avenue 7", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[8]=new BoardCells("Avenue 8", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[9]=new BoardCells("Avenue 9", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[10]=new BoardCells("JAIL")
BoardCellsArr[11]=new BoardCells("Avenue 11", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[12]=new BoardCells("Avenue 12", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[13]=new BoardCells("Avenue 13", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[14]=new BoardCells("Avenue 14", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[15]=new BoardCells("Avenue 15", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[16]=new BoardCells("ILLEGAL PARKING", "$200 fine")
BoardCellsArr[17]=new BoardCells("Avenue 17", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[18]=new BoardCells("Avenue 18", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[19]=new BoardCells("Avenue 19", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[20]=new BoardCells("FREE PARKING", "$0")
BoardCellsArr[21]=new BoardCells("Avenue 21", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[22]=new BoardCells("Avenue 22", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[23]=new BoardCells("Avenue 23", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[24]=new BoardCells("Avenue 24", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[25]=new BoardCells("Avenue 25", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[26]=new BoardCells("Avenue 26", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[27]=new BoardCells("Chance", "SELECT A CHANCE CARD")
BoardCellsArr[28]=new BoardCells("Avenue 28", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[29]=new BoardCells("Avenue 29", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[30]=new BoardCells("Go to Jail")
BoardCellsArr[31]=new BoardCells("Avenue 31", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[32]=new BoardCells("Avenue 32", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[33]=new BoardCells("Avenue 33", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[34]=new BoardCells("Avenue 34", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[35]=new BoardCells("Chance", "SELECT A CHANCE CARD")
BoardCellsArr[36]=new BoardCells("Avenue 36", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[37]=new BoardCells("Avenue 37", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[38]=new BoardCells("Avenue 38", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[39]=new BoardCells("Avenue 39", "$200", null, null, 50, 70, 100, 200, 100, 200)

// console.log(BoardCellsArr)

// chances cards as objects:




/*-------------------------------- Functions --------------------------------*/
init()

function init(){
  // player1fund = initialFund;
  // player2fund = initialFund;
  // player3fund = initialFund;
  // player4fund = initialFund;
  player1plot = [];
  player2plot = [];
  player3plot = [];
  player4plot = [];
  // player1Steps = 0
  // player2Steps = 0
  // player3Steps = 0
  // player4Steps = 0
  turn = 0;
  winner = null;
  diceNum = null;
  playersLocationsArr = []
  currentLocation = BoardCellsArr[0]

  for (let i = 0; i < plCount; i++) {
    playerArr[i] = allPlayerArr[i];
    playersSteps[i] = 0
    playersLocationsArr[i]=BoardCellsArr[0]
    playersFund[i] = initialFund
  }
  
  turnId=turn%playerArr.length
  currentPlayer = playerArr[turnId]

}

function rollDice() {
  let die1=Math.ceil(Math.random()*6)
  let die2=Math.ceil(Math.random()*6)
  Die1El.className = "dice"+die1
  Die2El.className = "dice"+die2

  diceNum = die1 + die2

  diceMsg.innerText = `Your roll is ${diceNum}.`
  
  playersSteps[turnId] += diceNum
  
}


function takeTurn(){
  
  playerMsg.innerText = `It's ${currentPlayer}'s turn now`
  
}


function play() {
  playersLocationsArr[turnId] = BoardCellsArr[playersSteps[turnId]%40]
  currentLocation = BoardCellsArr[playersSteps[turnId]%40]

  if (playersSteps[turnId]%40 == 0){
    playersFund[turnId] += 200
  } else if (playersSteps[turnId]%40 == 6 || playersSteps[turnId]%40 == 27 || playersSteps[turnId]%40 == 0){
    drawChance()
  } else if (playersSteps[turnId]%40==10 || playersSteps[turnId]%40 == 30){
    inJail()
  } else if (playersSteps[turnId]%40==16){
    playersFund[turnId] -= 200
  } else if (playersSteps[turnId]%40==20){
    playersFund[turnId] = playersFund[turnId]
  } else {
    buyOrRent()
  }

  console.log(playersLocationsArr)
  console.log(playersFund)

  turn += 1
  turnId=turn%playerArr.length;
}

function drawChance(){

}

function inJail(){
  playersSteps[turnId]=10
}

function buyOrRent(){

}

