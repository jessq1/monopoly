/*-------------------------------- Constants --------------------------------*/
// const plCount, player1, player2, player3, player4;

const initialFund = 2000 
// const plCount

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
})

homeBtn.addEventListener("click", ()=>{
  homePage.style.display = 'flex'
  gamePage.style.display = 'none'
  playBtn.style.display = "none"

})
// optionsList.forEach(opt => {
//     opt.addEventListener("click", () => {
//       selected.innerHTML = opt.querySelector("label").innerHTML;
//       optContainer.classList.remove("active");
//     });
// });



/*--------------------------------- Objects ---------------------------------*/



/*-------------------------------- Functions --------------------------------*/
