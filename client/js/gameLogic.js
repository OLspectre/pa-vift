import { locationsData, endLocation } from "../../data/location.js"
import { startCooldown, calculateTimeTaken } from "./timerLogic.js"

export function validateInput(answerType, userInput, callbacks) {
    const team = JSON.parse(localStorage.getItem("team"))
    const currLocation = locationsData.find(l => l.locationID === team.currLocation)

    if (answerType === "challenge") {
        const correct = checkChallengeCode(userInput, team);
        correct ? callbacks.onCorrect() : callbacks.onWrong();
    }
    if (answerType === "main") {
        const correct = checkMainClue(userInput);
        correct ? callbacks.onCorrect() : callbacks.onWrong();
    }
    if (answerType === "destination") {
        const correct = checkClue(userInput, currLocation);
        correct ? callbacks.onCorrect() : callbacks.onWrong();
    }
}

function checkClue(guess, currLocation) {
    return currLocation.acceptableAnswers.some(a => a.toLowerCase() === guess.toLowerCase());
}

function checkMainClue(guess) {
    return endLocation.acceptableAnswers.some(a => a === guess.toLowerCase());
}

function checkChallengeCode(guess, team) {
    const corrAnswers = locationsData.map(d => d.challAnswer);
    return corrAnswers[team.currLocation - 1].toLowerCase() === guess.toLowerCase();
}
