/*-------------------------------- Constants --------------------------------*/

const initialFund = 2000 
const player1 = "Player 1"
const player2 = "Player 2"
const player3 = "Player 3"
const player4 = "Player 4"


/*---------------------------- Variables (state) ----------------------------*/
let plCount, player1fund, player2fund, player3fund, player4fund, player1plot, player2plot, player3plot, player4plot, turn, winner; 


/*------------------------ Cached Element References ------------------------*/
const boardEl = document.getElementById('board');
const playBtn = document.getElementById('playGame');
const homeBtn = document.getElementById('backToHome');
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



/*--------------------------------- Objects ---------------------------------*/
// 40 plots as objects:

// chances cards as objects:

// dice as objects:



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

}