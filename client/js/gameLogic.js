import { locationsData } from "../../data/location.js";

const team = JSON.parse(localStorage.getItem("team"));
console.log("Team playing", team);

const currLocation = locationsData.find(l => l.locationID === team.currLocation);
console.log(currLocation);

const submitbtn = document.querySelector(".answer-card button");
const inputField = document.querySelector(".answer-card input");

submitbtn.addEventListener("click", () => {
    const answerType = submitbtn.id;
    const input = inputField.value;

    validateInput(answerType, input)
});

export function validateInput(answerType, userInput) {
    console.log("checking input");
    console.log(answerType);
    console.log(userInput);


    if (answerType === "challenge") {
        // Check userInput with challenge answer
        const correct = checkChallengeCode(userInput);
        if (correct) {
            alert("Correct Answer");
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
            alert("Correct Answer");
            endGame();
            // team.hintsUnlocked.push()
            // updateUI();    // Update game with new main clue and small clue
        } else {
            alert("wrong");
            return true;
        }

    }
    if (answerType === "destination") {
        // Check userInput with destination clue answer  
        const correct = checkClue(userInput);

        if (correct) {
            alert("Correct Answer");
            // team.hintsUnlocked.push()
            // updateUI();    // Update game with new main clue and small clue
        } else {
            alert("wrong");
        }

    }
}


function checkClue(guess) {
    const corrAnswers = currLocation.acceptableAnswers;

    for (let a of corrAnswers) {
        if (a.toLowerCase === guess.toLowerCase) return true;
    }
}

function checkMainClue(guess) {
    const corrMainAnwers = endLocation.acceptableAnswers

    return corrMainAnwers.some(a => a === guess.toLocaleLowerCase());

}


function checkChallengeCode(guess) {
    const corrAnswers = locationsData.map(d => d.challAnswer);
    console.log(corrAnswers);
    let locationN = team.currLocation - 1;

    return corrAnswers[locationN].toLocaleLowerCase() === guess.toLocaleLowerCase();
}