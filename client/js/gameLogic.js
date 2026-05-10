import { locationsData, endLocation } from "../../data/location.js";
import { startCooldown, calculateTimeTaken } from "./timerLogic.js";
import { unlockMap, updateUI, closePopup } from "./game.js";

const team = JSON.parse(localStorage.getItem("team"));
const cooldownStart = localStorage.getItem("cooldownStart");
console.log("Team playing", team);

const currLocation = locationsData.find(l => l.locationID === team.currLocation);
console.log(currLocation);

const guessEndBtn = document.querySelector("#guessEndBtn");
const confirmBtn = document.querySelector(".answer-card button");
const inputField = document.querySelector(".answer-card input");

confirmBtn.addEventListener("click", () => {
    const answerType = confirmBtn.id;
    const input = inputField.value;

    validateInput(answerType, input)


});

export function validateInput(answerType, userInput) {
    console.log("checking input");
    console.log("answerType:", answerType);
    console.log("user guess:", userInput);


    if (answerType === "challenge") {
        // Check userInput with challenge answer
        const correct = checkChallengeCode(userInput);
        if (correct) {
            team.currLocation++;
            // team.hintsUnlocked.push()
            // updateUI();    // Update game with new main clue and small clue
        } else {
            alert("wrong");
        }
    }
    if (answerType === "main") {
        // Check userInput with main clue answer
        const correct = checkMainClue(userInput);

        if (correct) {
            clearInterval(timer)
            const result = calculateTimeTaken();
            team.finalTime = result;
            localStorage.setItem("team", JSON.stringify(team));//Uppdaterar objektet i localstorage
            console.log(team.finalTime);
            window.location.href = "../pages/gameEnd.html"
        } else {
            document.querySelector(".overlay-popup").style.display = "none";
            console.log("wrong guess");
            guessEndBtn.classList.add("inactive");
            guessEndBtn.disabled = true;
            startCooldown(guessEndBtn, () => {
                guessEndBtn.disabled = false;
                guessEndBtn.classList.remove("inactive");
                guessEndBtn.textContent = "Svara";

            })
        }

    }
    if (answerType === "destination") {
        // Check userInput with destination clue answer  
        const correct = checkClue(userInput);

        if (correct) {
            console.log("correct guess");

            if (team.currLocation === 1) {
                unlockMap();
                updateUI();
                closePopup();

                // setTimeout(() => {
                // }, 1500)
            }
            team.currLocation++;
            // updateUI();    // Update game with new main clue and small clue
        } else {
            alert("wrong");
        }

    }
}


function checkClue(guess) {
    const corrAnswers = currLocation.acceptableAnswers;

    for (let a of corrAnswers) {
        if (a.toLowerCase() === guess.toLowerCase()) return true;
    }
}

function checkMainClue(guess) {
    const corrMainAnwers = endLocation.acceptableAnswers
    console.log(`Main answers: ${corrMainAnwers}`);
    console.log("Guess:", guess);

    return corrMainAnwers.some(a => a === guess.toLocaleLowerCase());

}


function checkChallengeCode(guess) {
    const corrAnswers = locationsData.map(d => d.challAnswer);
    console.log(corrAnswers);
    let locationN = team.currLocation - 1;

    return corrAnswers[locationN].toLocaleLowerCase() === guess.toLocaleLowerCase();
}