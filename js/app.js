/*-------------------------------- Constants --------------------------------*/

const initialFund = 2000 
const player1 = "Player 1"
const player2 = "Player 2"
const player3 = "Player 3"
const player4 = "Player 4"
const allPlayerArr =[player1,player2,player3,player4]


/*---------------------------- Variables (state) ----------------------------*/
let plCount, currentPlayer, player1plot, player2plot, player3plot, player4plot, turn, turnId, winner, diceNum, currentLocation; 
let BoardCellsArr =[]
let playerArr = []
let chanceCardsArr = []



/*------------------------ Cached Element References ------------------------*/
// Home selction screen
const PlayerNumSel = document.querySelector(".playerNumSelection");
const playBtn = document.getElementById('playGame');

// Game selction screen
const boardEl = document.getElementById('boardWrapper');
const homeBtn = document.getElementById('backToHome');

// Dice function screen
const diceBtn = document.getElementById('rollDiceBtn');
const confirmDiceBtn = document.getElementById('confirmDiceBtn');
const Die1El = document.getElementById('firstDie');
const Die2El = document.getElementById('secondDie');
const diceMsg = document.getElementById('rollDiceMsg');
const diceWrapper = document.getElementById('diceWrapper');

// But or rent function screen
const confirmBuyBtn = document.getElementById('confirmBuyBtn');
const denyBuyBtn = document.getElementById('denyBuyBtn');
const rentBtn = document.getElementById('rentBtn');


const homePage = document.querySelector("div.home");
const gamePage = document.querySelector(".gamePage");

const playerMsg = document.getElementById('playerMsg');





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
    showHideDice()
    console.log(diceWrapper)
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

confirmDiceBtn.addEventListener("click", () => {
  showHideDice()
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
  constructor(cellEl, name, msgText, groupNumber, owner, rent1, rent2, rent3, price, price2, price3) {
    this.cellEl = cellEl;
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

BoardCellsArr[0]=new BoardCells(document.getElementById('cell0'),"GO", "COLLECT $200 AS YOU PASS.")
BoardCellsArr[1]=new BoardCells(document.getElementById('cell1'),"Avenue 1", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[2]=new BoardCells(document.getElementById('cell2'),"Avenue 2", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[3]=new BoardCells(document.getElementById('cell3'),"Avenue 3", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[4]=new BoardCells(document.getElementById('cell4'),"Avenue 4", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[5]=new BoardCells(document.getElementById('cell5'),"Avenue 5", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[6]=new BoardCells(document.getElementById('cell6'),"Chance", "SELECT A CHANCE CARD")
BoardCellsArr[7]=new BoardCells(document.getElementById('cell7'),"Avenue 7", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[8]=new BoardCells(document.getElementById('cell8'),"Avenue 8", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[9]=new BoardCells(document.getElementById('cell9'),"Avenue 9", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[10]=new BoardCells(document.getElementById('cell10'),"JAIL")
BoardCellsArr[11]=new BoardCells(document.getElementById('cell11'),"Avenue 11", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[12]=new BoardCells(document.getElementById('cell12'),"Avenue 12", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[13]=new BoardCells(document.getElementById('cell13'),"Avenue 13", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[14]=new BoardCells(document.getElementById('cell14'),"Avenue 14", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[15]=new BoardCells(document.getElementById('cell15'),"Avenue 15", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[16]=new BoardCells(document.getElementById('cell16'),"ILLEGAL PARKING", "$200 fine")
BoardCellsArr[17]=new BoardCells(document.getElementById('cell17'),"Avenue 17", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[18]=new BoardCells(document.getElementById('cell18'),"Avenue 18", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[19]=new BoardCells(document.getElementById('cell19'),"Avenue 19", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[20]=new BoardCells(document.getElementById('cell20'),"FREE PARKING", "$0")
BoardCellsArr[21]=new BoardCells(document.getElementById('cell21'),"Avenue 21", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[22]=new BoardCells(document.getElementById('cell22'),"Avenue 22", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[23]=new BoardCells(document.getElementById('cell23'),"Avenue 23", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[24]=new BoardCells(document.getElementById('cell24'),"Avenue 24", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[25]=new BoardCells(document.getElementById('cell25'),"Avenue 25", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[26]=new BoardCells(document.getElementById('cell26'),"Avenue 26", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[27]=new BoardCells(document.getElementById('cell27'),"Chance", "SELECT A CHANCE CARD")
BoardCellsArr[28]=new BoardCells(document.getElementById('cell28'),"Avenue 28", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[29]=new BoardCells(document.getElementById('cell29'),"Avenue 29", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[30]=new BoardCells(document.getElementById('cell30'),"Go to Jail")
BoardCellsArr[31]=new BoardCells(document.getElementById('cell31'),"Avenue 31", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[32]=new BoardCells(document.getElementById('cell32'),"Avenue 32", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[33]=new BoardCells(document.getElementById('cell33'),"Avenue 33", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[34]=new BoardCells(document.getElementById('cell34'),"Avenue 34", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[35]=new BoardCells(document.getElementById('cell35'),"Chance", "SELECT A CHANCE CARD")
BoardCellsArr[36]=new BoardCells(document.getElementById('cell36'),"Avenue 36", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[37]=new BoardCells(document.getElementById('cell37'),"Avenue 37", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[38]=new BoardCells(document.getElementById('cell38'),"Avenue 38", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[39]=new BoardCells(document.getElementById('cell39'),"Avenue 39", "$200", null, null, 50, 70, 100, 200, 100, 200)


// chances cards as objects:
class Cards {
  constructor(msg, action){
    this.msg = msg;
    this.action = action;

  }
}

chanceCardsArr[0] = new Cards("add $100",function(){ adjustFund(100);})
chanceCardsArr[1] = new Cards("add $200",function(){ adjustFund(200);})
chanceCardsArr[2] = new Cards("add $500",function(){ adjustFund(500);})
chanceCardsArr[3] = new Cards("lost $100",function(){ adjustFund(-100);})
chanceCardsArr[4] = new Cards("lost $200",function(){ adjustFund(-200);})
chanceCardsArr[5] = new Cards("lost $300",function(){ adjustFund(-300);})
chanceCardsArr[6] = new Cards("add $100",function(){ adjustFund(100);})
chanceCardsArr[7] = new Cards("add $300",function(){ adjustFund(300);})
chanceCardsArr[8] = new Cards("add $500",function(){ adjustFund(500);})
chanceCardsArr[9] = new Cards("Go to Jail",function(){ inJail();})
chanceCardsArr[10] = new Cards("Go to Jail",function(){ inJail();})


/*-------------------------------- Functions --------------------------------*/
// init()

function init(){


  // player1plot = [];
  // player2plot = [];
  // player3plot = [];
  // player4plot = [];

  turn = 0;
  winner = null;
  diceNum = null;
  currentLocation = BoardCellsArr[0]

  for (let i = 0; i < plCount; i++) {
    playerArr[i] = new players(allPlayerArr[i], initialFund,0,BoardCellsArr[0], [], "playing")
 
    playerArr[i].location.cellEl.classList.add("player" + (i+1) +"Loc")
  }
  

  turnId=turn%playerArr.length
  // currentPlayer = playerArr[turnId].name

  console.log(playerArr)
  console.log(BoardCellsArr)

}

function showHideDice(){
  let popup = document.getElementById("diceWrapper");
  popup.classList.toggle("show");

}


function rollDice() {
  diceBtn.classList.toggle("show");

  let die1=Math.ceil(Math.random()*6)
  let die2=Math.ceil(Math.random()*6)
  Die1El.className = "dice"+die1
  Die2El.className = "dice"+die2

  diceNum = die1 + die2

  diceMsg.innerText = `Your roll is ${diceNum}.`
  
  playerArr[turnId].steps += diceNum
  confirmDiceBtn.classList.toggle("show");

}


function takeTurn(){
  currentPlayer = playerArr[turnId].name
  playerMsg.innerText = `It's ${currentPlayer}'s turn now`
  
}


function play() {
  playerArr[turnId].location.cellEl.classList.remove("player"+(turnId+1)+"Loc")

  playerArr[turnId].location = BoardCellsArr[playerArr[turnId].steps%40]
  currentLocation = BoardCellsArr[playerArr[turnId].steps%40]

  playerArr[turnId].location.cellEl.classList.add("player"+(turnId+1)+"Loc")



  if (playerArr[turnId].steps%40 == 0){
    playerArr[turnId].fund += 200
    passGo()
  } else if (playerArr[turnId].steps%40 == 6 || playerArr[turnId].steps%40%40 == 27 || playerArr[turnId].steps%40== 0){
    drawChance()
  } else if (playerArr[turnId].steps%40==10 || playerArr[turnId].steps%40 == 30){
    inJail()
  } else if (playerArr[turnId].steps%40==16){
    playerArr[turnId].fund -= 200
    illegalParking()
  } else if (playerArr[turnId].steps%40==20){
    playerArr[turnId].fund = playerArr[turnId].fund
    freeParking()
  } else {
    buyOrRent()
  }

  console.log(playerArr)

  turn += 1
  turnId=turn%playerArr.length;

  takeTurn()
}



function passGo(){

}



function drawChance(){
  
}

function inJail(){
  if (playerArr[turnId].status = "playing") {
    playerArr[turnId].status = "in Jail"
    playerArr[turnId].steps=10
  } else if (playerArr[turnId].status = "in Jail"){
    playerArr[turnId].status = "Jail Time - two more round"
    playerArr[turnId].steps=10
  } else if (playerArr[turnId].status = "Jail Time - two more round"){
    playerArr[turnId].status = "Jail Time - one more round"
    playerArr[turnId].steps=10
  } else {
    playerArr[turnId].status = "playing"
  }
}

function illegalParking(){

}

function freeParking(){

}


function buyOrRent(){
  let popup = document.getElementById("buyOrRentWrapper");
  popup.classList.toggle("show");
  

}


function adjustFund(x){
  playerArr[turnId].fund += x
}
