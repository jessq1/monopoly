/*-------------------------------- Constants --------------------------------*/

const initialFund = 2000 
const player1 = "Player 1"
const player2 = "Player 2"
const player3 = "Player 3"
const player4 = "Player 4"


/*---------------------------- Variables (state) ----------------------------*/
let plCount, player1fund, player2fund, player3fund, player4fund, player1plot, player2plot, player3plot, player4plot, turn, winner, diceNum; 
let BoardCellsArr =[]


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

BoardCellsArr[0]=new BoardCells("GO", "COLLECT $100 AS YOU PASS.")
BoardCellsArr[1]=new BoardCells("Avenue A", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[2]=new BoardCells("Avenue B", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[3]=new BoardCells("Avenue C", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[4]=new BoardCells("Avenue D", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[5]=new BoardCells("Avenue E", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[6]=new BoardCells("Chance", "SELECT A CHANCE CARD", )
BoardCellsArr[7]=new BoardCells("Avenue A", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[8]=new BoardCells("Avenue B", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[9]=new BoardCells("Avenue C", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[10]=new BoardCells("Avenue D", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[11]=new BoardCells("Avenue E", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[12]=new BoardCells("Avenue D", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[13]=new BoardCells("Avenue E", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[14]=new BoardCells("Avenue D", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[15]=new BoardCells("Avenue E", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[16]=new BoardCells("Avenue D", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[17]=new BoardCells("Avenue E", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[18]=new BoardCells("Avenue D", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[19]=new BoardCells("Avenue E", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[20]=new BoardCells("Avenue D", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[21]=new BoardCells("Avenue E", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[22]=new BoardCells("Avenue D", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[23]=new BoardCells("Avenue E", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[24]=new BoardCells("Avenue D", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[25]=new BoardCells("Avenue E", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[26]=new BoardCells("Avenue D", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[27]=new BoardCells("Avenue E", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[28]=new BoardCells("Avenue D", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[29]=new BoardCells("Avenue E", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[30]=new BoardCells("Avenue D", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[31]=new BoardCells("Avenue E", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[32]=new BoardCells("Avenue D", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[33]=new BoardCells("Avenue E", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[34]=new BoardCells("Avenue D", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[35]=new BoardCells("Avenue E", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[36]=new BoardCells("Avenue D", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[37]=new BoardCells("Avenue E", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[38]=new BoardCells("Avenue D", "$200", null, null, 50, 70, 100, 200, 100, 200)
BoardCellsArr[39]=new BoardCells("Avenue E", "$200", null, null, 50, 70, 100, 200, 100, 200)

console.log(BoardCellsArr)

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

