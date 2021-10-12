
/*-------------------------------- Constants --------------------------------*/

const initialFund = 1000 
const player1 = "Driuq Z8"
const player2 = "Nurn XWI"
const player3 = "Strides X2W"
const player4 = "Gniea X8N"
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
    console.log(evt.target.id.charAt(0))
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
outOfGameBtn.addEventListener("click", () => {
  turn -= turnId-1
  outOfGameWrapper.classList.remove("show");
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
  constructor(cellEl, name, msgText, groupNumber, owner, rent1, rent2, rent3, price, price2, price3, level,playerLocEl,propertyEl) {
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
    this.propertyEl =propertyEl
  }
}

BoardCellsArr[0]=new BoardCells(document.getElementById('cell0'),"GO", "COLLECT ₿200 AS YOU PASS.",null, null, null, null, null, null, null, null,null,document.getElementById('cell0-playersLoc'),null)
BoardCellsArr[1]=new BoardCells(document.getElementById('cell1'),"Volla Z0T", "₿200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell1-playersLoc'),document.getElementById('cell1-property'))
BoardCellsArr[2]=new BoardCells(document.getElementById('cell2'),"Ewei", "₿200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell2-playersLoc'),document.getElementById('cell2-property'))
BoardCellsArr[3]=new BoardCells(document.getElementById('cell3'),"Yunuitera", "₿200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell3-playersLoc'),document.getElementById('cell3-property'))
BoardCellsArr[4]=new BoardCells(document.getElementById('cell4'),"Dugotune", "₿200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell4-playersLoc'),document.getElementById('cell4-property'))
BoardCellsArr[5]=new BoardCells(document.getElementById('cell5'),"Riagawa", "₿200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell5-playersLoc'),document.getElementById('cell5-property'))
BoardCellsArr[6]=new BoardCells(document.getElementById('cell6'),"Chance", "SELECT A CHANCE CARD",null, null, null, null, null, null, null, null, null,document.getElementById('cell6-playersLoc'),null)
BoardCellsArr[7]=new BoardCells(document.getElementById('cell7'),"Trao EYB1", "₿200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell7-playersLoc'),document.getElementById('cell7-property'))
BoardCellsArr[8]=new BoardCells(document.getElementById('cell8'),"Saaturn", "₿200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell8-playersLoc'),document.getElementById('cell8-property'))
BoardCellsArr[9]=new BoardCells(document.getElementById('cell9'),"Vumoclite", "₿200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell9-playersLoc'),document.getElementById('cell9-property'))
BoardCellsArr[10]=new BoardCells(document.getElementById('cell10'),"JAIL","GO TO JAIL",null, null, null, null, null, null, null, null, null,document.getElementById('cell10-playersLoc'),null)
BoardCellsArr[11]=new BoardCells(document.getElementById('cell11'),"Llorix 6B", "₿200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell11-playersLoc'),document.getElementById('cell11-property'))
BoardCellsArr[12]=new BoardCells(document.getElementById('cell12'),"Vumoclite", "₿200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell12-playersLoc'),document.getElementById('cell12-property'))
BoardCellsArr[13]=new BoardCells(document.getElementById('cell13'),"Benruna", "₿200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell13-playersLoc'),document.getElementById('cell13-property'))
BoardCellsArr[14]=new BoardCells(document.getElementById('cell14'),"Zitriuzuno", "₿200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell14-playersLoc'),document.getElementById('cell14-property'))
BoardCellsArr[15]=new BoardCells(document.getElementById('cell15'),"Bemebos", "₿200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell15-playersLoc'),document.getElementById('cell15-property'))
BoardCellsArr[16]=new BoardCells(document.getElementById('cell16'),"ILLEGAL PARKING", "₿200 fine",null, null, null, null, null, null, null, null, null,document.getElementById('cell16-playersLoc'),null)
BoardCellsArr[17]=new BoardCells(document.getElementById('cell17'),"Hitrarth", "₿200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell17-playersLoc'),document.getElementById('cell17-property'))
BoardCellsArr[18]=new BoardCells(document.getElementById('cell18'),"Ruehiri", "₿200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell18-playersLoc'),document.getElementById('cell18-property'))
BoardCellsArr[19]=new BoardCells(document.getElementById('cell19'),"Siranus", "₿200", null, null, 50, 70, 100, 200, 100, 200,0,document.getElementById('cell19-playersLoc'),document.getElementById('cell19-property'))
BoardCellsArr[20]=new BoardCells(document.getElementById('cell20'),"FREE PARKING", "₿0",null, null, null, null, null, null, null, null, null,document.getElementById('cell20-playersLoc'),null)
BoardCellsArr[21]=new BoardCells(document.getElementById('cell21'),"Trenibos", "₿200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell21-playersLoc'),document.getElementById('cell21-property'))
BoardCellsArr[22]=new BoardCells(document.getElementById('cell22'),"Sagua 0H", "₿200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell22-playersLoc'),document.getElementById('cell22-property'))
BoardCellsArr[23]=new BoardCells(document.getElementById('cell23'),"Crillon 639", "₿200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell23-playersLoc'),document.getElementById('cell23-property'))
BoardCellsArr[24]=new BoardCells(document.getElementById('cell24'),"Vehines", "₿200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell24-playersLoc'),document.getElementById('cell24-property'))
BoardCellsArr[25]=new BoardCells(document.getElementById('cell25'),"Duzivis", "₿200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell25-playersLoc'),document.getElementById('cell25-property'))
BoardCellsArr[26]=new BoardCells(document.getElementById('cell26'),"Zanahines", "₿200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell26-playersLoc'),document.getElementById('cell26-property'))
BoardCellsArr[27]=new BoardCells(document.getElementById('cell27'),"Chance", "SELECT A CHANCE CARD",null, null, null, null, null, null, null, null, null,document.getElementById('cell27-playersLoc'),null)
BoardCellsArr[28]=new BoardCells(document.getElementById('cell28'),"Dosie 7X5", "₿200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell28-playersLoc'),document.getElementById('cell28-property'))
BoardCellsArr[29]=new BoardCells(document.getElementById('cell29'),"Thichi H77", "₿200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell29-playersLoc'),document.getElementById('cell29-property'))
BoardCellsArr[30]=new BoardCells(document.getElementById('cell30'),"Go to Jail","GO TO JAIL",null, null, null, null, null, null, null, null, null,document.getElementById('cell30-playersLoc'),null)
BoardCellsArr[31]=new BoardCells(document.getElementById('cell31'),"Rolmuturn", "₿200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell31-playersLoc'),document.getElementById('cell31-property'))
BoardCellsArr[32]=new BoardCells(document.getElementById('cell32'),"Negnatune", "₿200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell32-playersLoc'),document.getElementById('cell32-property'))
BoardCellsArr[33]=new BoardCells(document.getElementById('cell33'),"Nudarvis", "₿200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell33-playersLoc'),document.getElementById('cell33-property'))
BoardCellsArr[34]=new BoardCells(document.getElementById('cell34'),"Lilniri", "₿200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell34-playersLoc'),document.getElementById('cell34-property'))
BoardCellsArr[35]=new BoardCells(document.getElementById('cell35'),"Chance", "SELECT A CHANCE CARD",null, null, null, null, null, null, null, null, null,document.getElementById('cell34-playersLoc'),null)
BoardCellsArr[36]=new BoardCells(document.getElementById('cell36'),"Inerth", "₿200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell36-playersLoc'),document.getElementById('cell36-property'))
BoardCellsArr[37]=new BoardCells(document.getElementById('cell37'),"Baunerth", "₿200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell37-playersLoc'),document.getElementById('cell37-property'))
BoardCellsArr[38]=new BoardCells(document.getElementById('cell38'),"Boconia", "₿200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell38-playersLoc'),document.getElementById('cell38-property'))
BoardCellsArr[39]=new BoardCells(document.getElementById('cell39'),"Phahoria", "₿200", null, null, 50, 70, 100, 200, 100, 200, 0,document.getElementById('cell39-playersLoc'),document.getElementById('cell39-property'))


// chances cards as objects:
class Cards {
  constructor(msg, action){
    this.msg = msg;
    this.action = action;

  }
}

chanceCardsArr[0] = new Cards("add ₿100",100)
chanceCardsArr[1] = new Cards("add ₿200",200)
chanceCardsArr[2] = new Cards("add ₿500",500)
chanceCardsArr[3] = new Cards("lost ₿100",-100)
chanceCardsArr[4] = new Cards("lost ₿200",-200)
chanceCardsArr[5] = new Cards("lost ₿300",-300)
chanceCardsArr[6] = new Cards("add ₿100",100)
chanceCardsArr[7] = new Cards("add ₿300",300)
chanceCardsArr[8] = new Cards("add ₿500",500)
chanceCardsArr[9] = new Cards("add ₿100",100)


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

  BoardCellsArr.forEach(el => {
    if (el.propertyEl){
      el.propertyEl.style.border = "#f0aa07 1px solid "
      el.propertyEl.classList.remove("level1")
      el.propertyEl.classList.remove("level2")
      el.propertyEl.classList.remove("level3")
    }
    if (el.playerLocEl){
      el.playerLocEl.classList.remove("player1Loc")
      el.playerLocEl.classList.remove("player2Loc")
      el.playerLocEl.classList.remove("player3Loc")
      el.playerLocEl.classList.remove("player4Loc")
    }
  });

  playersStatsArr.forEach(i => {
    i.classList.remove("show")
  });

  for (let i = 0; i < plCount; i++) {
    playerArr[i] = new players(allPlayerArr[i], initialFund,0,BoardCellsArr[0], [], "playing")
 
    playerArr[i].location.playerLocEl.classList.add("player" + (i+1) +"Loc")
    playersStatsArr[i].classList.add("show")
    playersEstateArr[i] = []
  }
  
  
  for (let i=0;i<playerArr.length;i++){
    if (playerArr[i].name == player1){
      playersStatsArr[i].style.border = "#b5179e 1px solid"
    } else if (playerArr[i].name == player2){
      playersStatsArr[i].style.border = "#1a936f 1px solid"
    } else if (playerArr[i].name == player3){
      playersStatsArr[i].style.border = "#e07a5f 1px solid"
    } else if (playerArr[i].name == player4){
      playersStatsArr[i].style.border = "#001f54 1px solid"
    } 

    playersStatsArr[i].innerText = "Name: " + playerArr[i].name + '\n'+ "Fund: " + playerArr[i].fund +'\n'+ "Current location: " + playerArr[i].location.name + '\n'+ "Estate: " + playersEstateArr[i]  + '\n'+ "Status: " + playerArr[i].status

  }
  turnId=turn%playerArr.length
  
  
}

function renderPlayerStats(){


  for (let i=0;i<playerArr.length;i++){
    if (playerArr[i].status == "in Jail" || playerArr[i].status == 'Jail Time - two more round' || playerArr[i].status == "Jail Time - one more round"){
      playersStatsArr[i].style.color = "red"
    } else if (playerArr[i].status == "playing"){
      playersStatsArr[i].style.color = "white"
    }
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

}

function endRound(){
  if (playerArr.length == 1){
    isWinner(playerArr[0].name)
  } else {
    turn += 1
    turnId=turn%playerArr.length;
    
    if(playerArr[turnId].status == "playing"){
      showDice()
    } else {
      hideDice()
      inJail()
    }
    renderPlayerStats()
    renderTurn()
  }
}

function outOfGame(){
  outOfGameWrapper.classList.toggle("show");
  outOfGameMsg.innerText = `${playerArr[turnId].name} is out of the game!`
  playerArr[turnId].status = "Out of Game"
  playersStatsArr[turnId].style.color = "grey"
  playersStatsArr[turnId].innerText = "Name: " + playerArr[turnId].name + '\n'+ "Fund: " + playerArr[turnId].fund +'\n'+ "Current location: " + playerArr[turnId].location.name + '\n'+ "Estate: " + playersEstateArr[turnId]  + '\n'+ "Status: " + playerArr[turnId].status
  playerArr.splice(turnId, 1)
  playersStatsArr.splice(turnId, 1)
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
  adjustFund(card.action)
  confirmCardBtn.classList.add("show");

}
function showChance(){
  chanceCardWrapper.classList.toggle("show");
  drawCardBtn.classList.add("show");
  confirmCardBtn.classList.remove("show");
  chanceCardMsg.innerText = "Please select a chance card!"
}
function hideChance(){
  chanceCardWrapper.classList.remove("show");
  drawCardBtn.classList.remove("show");
  confirmCardBtn.classList.remove("show");
}


function inJail(){
  if (playerArr[turnId].status == "playing") {
    showHideInJail()
    hideDice()
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
    if (playerArr[turnId].fund > playerArr[turnId].location.price){
      playerArr[turnId].estate.push(playerArr[turnId].location)
      playersEstateArr[turnId].push(playerArr[turnId].location.name)
      playerArr[turnId].location.owner = playerArr[turnId]
      adjustFund(-playerArr[turnId].location.price)
      playerArr[turnId].location.level = 1
      if (playerArr[turnId].name == player1){
        playerArr[turnId].location.propertyEl.style.border = "#b5179e 1px solid"
      } else if (playerArr[turnId].name == player2){
        playerArr[turnId].location.propertyEl.style.border = "#1a936f 1px solid"
      } else if (playerArr[turnId].name == player3){
        playerArr[turnId].location.propertyEl.style.border = "#e07a5f 1px solid"
      } else if (playerArr[turnId].name == player4){
        playerArr[turnId].location.propertyEl.style.border = "#001f54 1px solid"
      } 
      playerArr[turnId].location.propertyEl.classList.add("level1")
      endRound()
    } else {
      adjustFund(-playerArr[turnId].location.price)
    }
  } else if (playerArr[turnId].location.level = 1){
    if (playerArr[turnId].fund > playerArr[turnId].location.price2){
      adjustFund(-playerArr[turnId].location.price2)
      playerArr[turnId].location.level = 2
      playerArr[turnId].location.propertyEl.classList.add("level2")
      endRound()
    } else {
      adjustFund(-playerArr[turnId].location.price2)
    }
  } else if (playerArr[turnId].location.level = 2){
    if (playerArr[turnId].fund > playerArr[turnId].location.price2){
      adjustFund(-playerArr[turnId].location.price3)
      playerArr[turnId].location.level = 3
      playerArr[turnId].location.propertyEl.classList.add("level3")
      endRound()
    }else {
      adjustFund(-playerArr[turnId].location.price3)
    }

  }
  showHideBuy()
}


function adjustFund(x){
  playerArr[turnId].fund += x
  if (playerArr[turnId].fund < 0){
    outOfGame()
    buyWrapper.classList.remove("show");
    chanceCardWrapper.classList.remove("show");
  } 
}
