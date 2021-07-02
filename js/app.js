/*-------------------------------- Constants --------------------------------*/
// const plCount, player1, player2, player3, player4;

const initialFund = 2000

/*---------------------------- Variables (state) ----------------------------*/
let player1fund, player2fund, player3fund, player4fund, player1plot, player2plot, player3plot, player4plot, turn, winner; 


/*------------------------ Cached Element References ------------------------*/
const boardEl = document.getElementById('board');
const playBtn = document.getElementById('playGame');
// const playBtn = document.getElementById('playGame');

// Home selction screen
const selected = document.querySelector(".selected");
const optContainer = document.querySelector(".options-container");
const optionsList = document.querySelectorAll(".option");


/*----------------------------- Event Listeners -----------------------------*/

selected.addEventListener("click", () => {
    optContainer.classList.toggle("active");
    console.log('hi')
  });
  
optionsList.forEach(opt => {
    opt.addEventListener("click", () => {
      selected.innerHTML = opt.querySelector("label").innerHTML;
      optContainer.classList.remove("active");
    });
});



/*--------------------------------- Objects ---------------------------------*/



/*-------------------------------- Functions --------------------------------*/
