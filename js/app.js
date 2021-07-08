/*-------------------------------- Constants --------------------------------*/

const initialFund = 2000 
const player1 = "Player 1"
const player2 = "Player 2"
const player3 = "Player 3"
const player4 = "Player 4"
const allPlayerArr =[player1,player2,player3,player4]


/*---------------------------- Variables (state) ----------------------------*/
let plCount, currentPlayer, turn, turnId, winner, diceNum, currentLocation,player1plot,player2plot,player13lot,player4plot; 
let BoardCellsArr =[]
let playerArr = []
let chanceCardsArr = []
let playersEstateArr = []



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

// Buy or rent function screen
const confirmBuyBtn = document.getElementById('confirmBuyBtn');
const denyBuyBtn = document.getElementById('denyBuyBtn');
const rentBtn = document.getElementById('rentBtn');
const buyWrapper = document.getElementById('buyWrapper');
const RentWrapper = document.getElementById('RentWrapper');
const buyMsg = document.getElementById('buyMsg');
const RentMsg = document.getElementById('RentMsg');

// Pass go function screen
const PassGoBtn = document.getElementById('PassGoBtn');
const PassGoWrapper = document.getElementById('PassGoWrapper');

// Illegal Parking function screen
const illegalParkingWrapper = document.getElementById('illegalParkingWrapper');
const illegalParkingBtn = document.getElementById('illegalParkingBtn');

// Free Parking function screen
const freeParkingWrapper = document.getElementById('freeParkingWrapper');
const freeParkingBtn = document.getElementById('freeParkingBtn');

// In Jail function screen
const inJailWrapper = document.getElementById('inJailWrapper');
const inJailMsg = document.getElementById('inJailMsg');
const inJailBtn = document.getElementById('inJailBtn');
const outOfJailWrapper = document.getElementById('outOfJailWrapper');
const outOfJailBtn = document.getElementById('outOfJailBtn');

// Winner function screen
const winnerWrapper = document.getElementById('winnerWrapper');
const WinnerMsg = document.getElementById('WinnerMsg');
const winnerBtn = document.getElementById('winnerBtn');

// Out of game function screen
const outOfGameWrapper = document.getElementById('outOfGameWrapper');
const outOfGameMsg = document.getElementById('outOfGameMsg');
const outOfGameBtn = document.getElementById('outOfGameBtn');

// Chance card function screen
const chanceCardWrapper = document.getElementById('chanceCardWrapper');
const chanceCardMsg = document.getElementById('chanceCardMsg');
const drawCardBtn = document.getElementById('drawCardBtn');
const chanceCardImg = document.getElementById('chanceCardImg');
const confirmCardBtn = document.getElementById('confirmCardBtn');

//player stats tab:
const player1Stats = document.getElementById('player1Stats');
const player2Stats = document.getElementById('player2Stats');
const player3Stats = document.getElementById('player3Stats');
const player4Stats = document.getElementById('player4Stats');

let playersStatsArr = [player1Stats,player2Stats,player3Stats,player4Stats]

//Summary tab:
const gameSum = document.getElementById('gameSum');

// overall items
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
    renderTurn()
    showDice()
  })
  
  homeBtn.addEventListener("click", ()=>{
    homePage.style.display = 'flex'
    gamePage.style.display = 'none'
    playBtn.style.display = "none"
    init()
    hideDice()
    hideChance()
    buyWrapper.classList.remove('show')
    RentWrapper.classList.remove('show')
    PassGoWrapper.classList.remove('show')
    illegalParkingWrapper.classList.remove('show')
    freeParkingWrapper.classList.remove('show')
    outOfJailWrapper.classList.remove('show')
    winnerWrapper.classList.remove('show')
    outOfGameWrapper.classList.remove('show')
    chanceCardWrapper.classList.remove('show')

  })
  
  diceBtn.addEventListener("click", () => {
    rollDice()
  })
  
  confirmDiceBtn.addEventListener("click", () => {
    hideDice()
    confirmDiceBtn.classList.remove("show");
    play()
  })
  
  confirmBuyBtn.addEventListener("click", () => {
    buyLand()
    showDice()
})

denyBuyBtn.addEventListener("click", () => {
  showHideBuy()
  endRound()
})

rentBtn.addEventListener("click", () => {
  showHideRent()
  endRound()
})

PassGoBtn.addEventListener("click", () => {
  showHidePassGo()
  endRound()
})

illegalParkingBtn.addEventListener("click", () => {
  showHideillegalParking()
  endRound()
})

freeParkingBtn.addEventListener("click", () => {
  showHideFreeParking()
  endRound()
})

inJailBtn.addEventListener("click", () => {
  showHideInJail()
  endRound()
})
outOfJailBtn.addEventListener("click", () => {
  showHideOutOfJail()
  showDice()
})

winnerBtn.addEventListener("click", () => {

})
outOfGameBtn.addEventListener("click", () => {
  turn -= 1
  outOfGame()
  endRound()
})
drawCardBtn.addEventListener("click", () => {
  drawChance()
})
confirmCardBtn.addEventListener("click", () => {
  hideChance()
  endRound()
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
  constructor(cellEl, name, msgText, groupNumber, owner, rent1, rent2, rent3, price, price2, price3, level,playerLocEl) {
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
    this.level = level;
    this.playerLocEl = playerLocEl;
  }
}

BoardCellsArr[0]=new BoardCells(document.getElementById('cell0'),"GO", "COLLECT $200 AS YOU PASS.",null, null, null, null, null, null, null, null,null,document.getElementById('cell0-playersLoc'))
BoardCellsArr[1]=new BoardCells(document.getElementById('cell1'),"Avenue 1", "$200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell1-playersLoc'))
BoardCellsArr[2]=new BoardCells(document.getElementById('cell2'),"Avenue 2", "$200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell2-playersLoc'))
BoardCellsArr[3]=new BoardCells(document.getElementById('cell3'),"Avenue 3", "$200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell3-playersLoc'))
BoardCellsArr[4]=new BoardCells(document.getElementById('cell4'),"Avenue 4", "$200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell4-playersLoc'))
BoardCellsArr[5]=new BoardCells(document.getElementById('cell5'),"Avenue 5", "$200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell5-playersLoc'))
BoardCellsArr[6]=new BoardCells(document.getElementById('cell6'),"Chance", "SELECT A CHANCE CARD",null, null, null, null, null, null, null, null, null,document.getElementById('cell6-playersLoc'))
BoardCellsArr[7]=new BoardCells(document.getElementById('cell7'),"Avenue 7", "$200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell7-playersLoc'))
BoardCellsArr[8]=new BoardCells(document.getElementById('cell8'),"Avenue 8", "$200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell8-playersLoc'))
BoardCellsArr[9]=new BoardCells(document.getElementById('cell9'),"Avenue 9", "$200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell9-playersLoc'))
BoardCellsArr[10]=new BoardCells(document.getElementById('cell10'),"JAIL","GO TO JAIL",null, null, null, null, null, null, null, null, null,document.getElementById('cell10-playersLoc'))
BoardCellsArr[11]=new BoardCells(document.getElementById('cell11'),"Avenue 11", "$200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell11-playersLoc'))
BoardCellsArr[12]=new BoardCells(document.getElementById('cell12'),"Avenue 12", "$200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell12-playersLoc'))
BoardCellsArr[13]=new BoardCells(document.getElementById('cell13'),"Avenue 13", "$200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell13-playersLoc'))
BoardCellsArr[14]=new BoardCells(document.getElementById('cell14'),"Avenue 14", "$200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell14-playersLoc'))
BoardCellsArr[15]=new BoardCells(document.getElementById('cell15'),"Avenue 15", "$200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell15-playersLoc'))
BoardCellsArr[16]=new BoardCells(document.getElementById('cell16'),"ILLEGAL PARKING", "$200 fine",null, null, null, null, null, null, null, null, null,document.getElementById('cell16-playersLoc'))
BoardCellsArr[17]=new BoardCells(document.getElementById('cell17'),"Avenue 17", "$200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell17-playersLoc'))
BoardCellsArr[18]=new BoardCells(document.getElementById('cell18'),"Avenue 18", "$200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell18-playersLoc'))
BoardCellsArr[19]=new BoardCells(document.getElementById('cell19'),"Avenue 19", "$200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell19-playersLoc'))
BoardCellsArr[20]=new BoardCells(document.getElementById('cell20'),"FREE PARKING", "$0",null, null, null, null, null, null, null, null, null,document.getElementById('cell20-playersLoc'))
BoardCellsArr[21]=new BoardCells(document.getElementById('cell21'),"Avenue 21", "$200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell21-playersLoc'))
BoardCellsArr[22]=new BoardCells(document.getElementById('cell22'),"Avenue 22", "$200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell22-playersLoc'))
BoardCellsArr[23]=new BoardCells(document.getElementById('cell23'),"Avenue 23", "$200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell23-playersLoc'))
BoardCellsArr[24]=new BoardCells(document.getElementById('cell24'),"Avenue 24", "$200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell24-playersLoc'))
BoardCellsArr[25]=new BoardCells(document.getElementById('cell25'),"Avenue 25", "$200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell25-playersLoc'))
BoardCellsArr[26]=new BoardCells(document.getElementById('cell26'),"Avenue 26", "$200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell26-playersLoc'))
BoardCellsArr[27]=new BoardCells(document.getElementById('cell27'),"Chance", "SELECT A CHANCE CARD",null, null, null, null, null, null, null, null, null,document.getElementById('cell27-playersLoc'))
BoardCellsArr[28]=new BoardCells(document.getElementById('cell28'),"Avenue 28", "$200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell28-playersLoc'))
BoardCellsArr[29]=new BoardCells(document.getElementById('cell29'),"Avenue 29", "$200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell29-playersLoc'))
BoardCellsArr[30]=new BoardCells(document.getElementById('cell30'),"Go to Jail","GO TO JAIL",null, null, null, null, null, null, null, null, null,document.getElementById('cell30-playersLoc'))
BoardCellsArr[31]=new BoardCells(document.getElementById('cell31'),"Avenue 31", "$200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell31-playersLoc'))
BoardCellsArr[32]=new BoardCells(document.getElementById('cell32'),"Avenue 32", "$200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell32-playersLoc'))
BoardCellsArr[33]=new BoardCells(document.getElementById('cell33'),"Avenue 33", "$200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell33-playersLoc'))
BoardCellsArr[34]=new BoardCells(document.getElementById('cell34'),"Avenue 34", "$200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell34-playersLoc'))
BoardCellsArr[35]=new BoardCells(document.getElementById('cell35'),"Chance", "SELECT A CHANCE CARD",null, null, null, null, null, null, null, null, null,document.getElementById('cell34-playersLoc'))
BoardCellsArr[36]=new BoardCells(document.getElementById('cell36'),"Avenue 36", "$200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell36-playersLoc'))
BoardCellsArr[37]=new BoardCells(document.getElementById('cell37'),"Avenue 37", "$200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell37-playersLoc'))
BoardCellsArr[38]=new BoardCells(document.getElementById('cell38'),"Avenue 38", "$200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell38-playersLoc'))
BoardCellsArr[39]=new BoardCells(document.getElementById('cell39'),"Avenue 39", "$200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell39-playersLoc'))


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


/*-------------------------------- Functions --------------------------------*/
// init()

function init(){


  player1plot = [];
  player2plot = [];
  player3plot = [];
  player4plot = [];

  turn = 0;
  winner = null;
  diceNum = null;
  currentLocation = BoardCellsArr[0]

  for (let i = 0; i < plCount; i++) {
    playerArr[i] = new players(allPlayerArr[i], initialFund,0,BoardCellsArr[0], [], "playing")
 
    playerArr[i].location.playerLocEl.classList.add("player" + (i+1) +"Loc")
    playersStatsArr[i].classList.add("show")
    playersEstateArr[i] = []
  }
  
  renderPlayerStats()
  turnId=turn%playerArr.length
  
  // console.log(playerArr)
  console.log(playerArr[0].location.playerLocEl)
  
}

function renderPlayerStats(){
  let currentPlayers = []
  for (let i=0;i<playerArr.length;i++){
    
    playersStatsArr[i].innerText = "Name: " + playerArr[i].name + '\n'+ "Fund: " + playerArr[i].fund +'\n'+ "Current location: " + playerArr[i].location.name + '\n'+ "Estate: " + playersEstateArr[i]  + '\n'+ "Status: " + playerArr[i].status
 
  }
}

function showDice(){
  diceWrapper.classList.add("show");
  diceBtn.classList.add("show");
  diceMsg.innerText = ""
}
function hideDice(){
  diceWrapper.classList.remove("show");
  confirmDiceBtn.classList.remove("show");
  diceBtn.classList.remove("show");
}


function rollDice() {
  diceBtn.classList.remove("show");

  let die1=Math.ceil(Math.random()*6)
  let die2=Math.ceil(Math.random()*6)
  Die1El.className = "dice"+die1
  Die2El.className = "dice"+die2

  diceNum = die1 + die2

  diceMsg.innerText = `Your roll is ${diceNum}.`
  
  playerArr[turnId].steps += diceNum
  confirmDiceBtn.classList.add("show");

}


function renderTurn(){
  currentPlayer = playerArr[turnId].name
  playerMsg.innerText = `It's ${currentPlayer}'s turn now`
  gameSum.innerText = `${currentPlayer} is playing`
}


function play() {
  
  playerArr[turnId].location.playerLocEl.classList.remove("player"+(turnId+1)+"Loc")

  playerArr[turnId].location = BoardCellsArr[playerArr[turnId].steps%40]
  currentLocation = BoardCellsArr[playerArr[turnId].steps%40]

  playerArr[turnId].location.playerLocEl.classList.add("player"+(turnId+1)+"Loc")
console.log(playerArr[turnId].location.playerLocEl)


  if (playerArr[turnId].steps%40 == 0){
    playerArr[turnId].fund += 200
    passGo()
  } else if (playerArr[turnId].steps%40 == 6 || playerArr[turnId].steps%40%40 == 27 || playerArr[turnId].steps%40== 0){
    showChance()
  } else if (playerArr[turnId].steps%40==10 || playerArr[turnId].steps%40 == 30){
    inJail()
  } else if (playerArr[turnId].steps%40==16){
    illegalParking()
  } else if (playerArr[turnId].steps%40==20){
    playerArr[turnId].fund = playerArr[turnId].fund
    freeParking()
  } else {
    buyOrRent()
  }

  // console.log(playerArr)

}

function endRound(){
  if (playerArr.length == 1){
    isWinner(playerArr[0])
  } else {
    turn += 1
    turnId=turn%playerArr.length;
    
    if(playerArr[turnId].status == "playing"){
      showDice()
    } else {
      inJail()
    }
  }
  renderPlayerStats()
  renderTurn()
}

function outOfGame(){
  outOfGameWrapper.classList.toggle("show");
  outOfGameMsg.innerText = `${playerArr[turnId].name} is out of the game!`
  playerArr[turnId].status = "Out of Game"
}
function isWinner(x){
  winnerWrapper.classList.toggle("show");
  WinnerMsg.innerText = `${x} is the winner!`
}

function passGo(){
  showHidePassGo()
  adjustFund(200)
}

function showHidePassGo(){
  PassGoWrapper.classList.toggle("show");
}



function drawChance(){
  drawCardBtn.classList.remove("show");
  let cardIndex= Math.floor(Math.random()*10)
  let card = chanceCardsArr[cardIndex]
  
  chanceCardImg.className = "card"+cardIndex
  chanceCardMsg.innerText = `You selected card number ${cardIndex}. ${card.msg}`
  card.action
  confirmCardBtn.classList.add("show");

}
function showChance(){
  chanceCardWrapper.classList.toggle("show");
  drawCardBtn.classList.add("show");
  confirmCardBtn.classList.remove("show");
}
function hideChance(){
  chanceCardWrapper.classList.remove("show");
  drawCardBtn.classList.remove("show");
  confirmCardBtn.classList.remove("show");
}


function inJail(){
  if (playerArr[turnId].status == "playing") {
    showHideInJail()
    playerArr[turnId].status = "in Jail"
    playerArr[turnId].steps=10
    inJailMsg.innerText = "You are in Jail! Have to pause for 3 rounds"
  } else if (playerArr[turnId].status == "in Jail"){
    hideDice()
    showHideInJail()
    playerArr[turnId].status = "Jail Time - two more round"
    playerArr[turnId].steps=10
    inJailMsg.innerText = "You are in Jail! Have to pause for 2 more rounds"
  } else if (playerArr[turnId].status == "Jail Time - two more round"){
    hideDice()
    showHideInJail()
    playerArr[turnId].status = "Jail Time - one more round"
    playerArr[turnId].steps=10
    inJailMsg.innerText = "You are in Jail! Have to pause for 1 more rounds"
  } else {
    hideDice()
    showHideOutOfJail()
    playerArr[turnId].status = "playing"
  }
}
function showHideInJail(){
  inJailWrapper.classList.toggle("show");
}
function showHideOutOfJail(){
  outOfJailWrapper.classList.toggle("show");
}


function illegalParking(){
  showHideillegalParking()
  adjustFund(-200)

}
function showHideillegalParking(){
  illegalParkingWrapper.classList.toggle("show");
}

function freeParking(){
  showHideFreeParking()
}
function showHideFreeParking(){
  freeParkingWrapper.classList.toggle("show");
}


function showHideBuy(){
  buyWrapper.classList.toggle("show");
}
function showHideRent(){
  RentWrapper.classList.toggle("show");
}

function buyOrRent(){
  if (playerArr[turnId].location.owner == null){
    showHideBuy();
    buyMsg.innerText = `This lot is for sale! Do you want to buy it for ${playerArr[turnId].location.price}?`
  } else if (playerArr[turnId].location.owner == playerArr[turnId].name){
    showHideBuy();
    if (playerArr[turnId].location.level == 1){
      buyMsg.innerText = `Do you want to add a building for ${playerArr[turnId].location.price2}?`
    } if (playerArr[turnId].location.level == 2){
      buyMsg.innerText = `Do you want to add a highrise for ${playerArr[turnId].location.price3}?`
    }
  } else {
    showHideRent();
    if (playerArr[turnId].location.level == 1){
      RentMsg.innerText = `This lot is owned by ${playerArr[turnId].location.owner.name}, you have to pay ${playerArr[turnId].location.rent1}.`
      adjustFund(-playerArr[turnId].location.rent1)
      playerArr[turnId].location.owner.fund += playerArr[turnId].location.rent1
    } else if (playerArr[turnId].location.level == 2){
      RentMsg.innerText = `This lot is owned by ${playerArr[turnId].location.owner.name}, you have to pay ${playerArr[turnId].location.rent2}.`
      adjustFund(-playerArr[turnId].location.rent2)
      playerArr[turnId].location.owner.fund += playerArr[turnId].location.rent2


    } else if (playerArr[turnId].location.level == 3){
      RentMsg.innerText = `This lot is owned by ${playerArr[turnId].location.owner.name}, you have to pay ${playerArr[turnId].location.rent3}.`
      adjustFund(-playerArr[turnId].location.rent3)
      playerArr[turnId].location.owner.fund += playerArr[turnId].location.rent3

    }

  }
  

}

function buyLand(){
  if (playerArr[turnId].location.level == 0){
    playerArr[turnId].estate.push(playerArr[turnId].location)
    playersEstateArr[turnId].push(playerArr[turnId].location.name)
    playerArr[turnId].location.owner = playerArr[turnId]
    adjustFund(-playerArr[turnId].location.price)
    playerArr[turnId].location.level = 1
  } else if (playerArr[turnId].location.level = 1){
    adjustFund(-playerArr[turnId].location.price2)
    playerArr[turnId].location.level = 2
  } else if (playerArr[turnId].location.level = 2){
    adjustFund(-playerArr[turnId].location.price3)
    playerArr[turnId].location.level = 3
  }
  console.log(playerArr)
  endRound()
  showHideBuy()
}


function adjustFund(x){
  playerArr[turnId].fund += x
  if (playerArr[turnId].fund < 0){
    outOfGame()
    playerArr.splice(turnId, 1)
  } 
}
