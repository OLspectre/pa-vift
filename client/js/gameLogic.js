// Main logic for checking anwers and results.

import { use } from "react";
import { locationsData } from "../../data/location";

const currLocation = locationsData.find(l => l.locationID === currentTeam.currLocation);

// localstorage team:::::

// const currentTeam = x;

const submitbtn = document.querySelector(".answer-card button");






function validateInput(answerType, userInput) {

    if (answerType === "challenge") {
        // Check userInput with challenge answer

        const correct = checkChallengeCode(userInput);

        if (correct) {
            console.log("Correct Answer");

            // updateTeam();  // Update team location
            // updateUI();    // Update game with new main clue and small clue
        }
    }
    if (answerType === "main") {
        // Check userInput with main clue answer
        checkMainClue(userInput);

    }
    if (answerType === "destination") {
        // Check userInput with destination clue answer  
        checkClue(userInput);

    }
}


function checkClue(answer) {

    const corrAnswers = currLocation.acceptableAnswers;

    for (let a of corrAnswers) {
        if (a.toLowerCase === answer.toLowerCase) return true;
    }
}

function checkMainClue(answer) {
    const corrMainAnwers = endLocation.acceptableAnswers

    for (let a of corrAnswers) {
        if (a.toLowerCase() === answer.toLowerCase()) return true;
    }
}


function checkChallengeCode(answer) {
    const corrMainAnwers = endLocation.acceptableAnswers
    const corrAnswers = currLocation.acceptableAnswers;

    for (let a of corrAnswers) {
        if (a.toLowerCase === answer.toLowerCase) return true;
    }
}