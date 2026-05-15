import { teams } from "../../data/teams.js";
import { getTimeLeft } from "./timerLogic.js";

let team = JSON.parse(localStorage.getItem("team"));

const leaderboard = document.querySelector("#leaderboard");
const showEndTime = document.querySelector("#winOrLoseSection p");

console.log(team.finalTime);
console.log("team:", team);

function calculateScore(team) {
    const bonusPoints = { 1: 1000, 2: 800, 3: 600, 4: 400, 5: 200, 6: 0 }
    const bonus = bonusPoints[team.mainGuessedAt] // vilket försök de gissade rätt
    const timeUsed = 10800 - getTimeLeft()
    const timeScore = Math.round(Math.pow((1 - timeUsed / 10800), 2) * 10000)
    if (timeUsed === 10800) {
        return 0
    } else {
        return bonus + timeScore;
    }
}

team.score = calculateScore(team);


if (!team.finalTime.hours && team.finalTime.mins) {
    showEndTime.textContent = `Tid: ${team.finalTime.mins} minuter och ${team.finalTime.secs} Sekunder`;
} else if (team.finalTime.hours) {
    showEndTime.textContent = `Tid: ${team.finalTime.hours} timmar ${team.finalTime.mins} Minuter och ${team.finalTime.secs} Sekunder`;
} else {
    showEndTime.textContent = `Tid: ${team.finalTime.secs} Skunder`;
}

const mockUsers = [
    { name: "Arvingarna", finalTime: { hours: 2, mins: 20, secs: 34 }, mainGuessedAt: 4, score: 800 }, // ~510p
    { name: "Johannes", finalTime: { hours: 2, mins: 12, secs: 55 }, mainGuessedAt: 3, score: 1318 }, // ~772p
    { name: "Surfshack stammisarna", finalTime: { hours: 1, mins: 33, secs: 22 }, mainGuessedAt: 1, score: 3314 }, // ~2157p
    { name: "Smurfarna", finalTime: { hours: 1, mins: 52, secs: 3 }, mainGuessedAt: 2, score: 2224 }  // ~1512p
];

mockUsers.push(team);
let scoreboard = mockUsers.sort((a, b) => b.score - a.score);
console.log(scoreboard);


(function createLeaderboard() {

    for (let user of scoreboard) {

        const teamNameDiv = document.createElement("div");
        const teamTimeDiv = document.createElement("div");
        const teamPointsDiv = document.createElement("div");




        teamNameDiv.classList.add("whiteSmoke");
        teamTimeDiv.classList.add("whiteSmoke");
        teamPointsDiv.classList.add("whiteSmoke");
        teamPointsDiv.classList.add("rightAlign");

        // teamNameDiv.style.border = "1px solid var(--hColor)";
        // teamTimeDiv.style.border = "1px solid var(--hColor)";
        // teamPointsDiv.style.border = "1px solid var(--hColor)";

        // teamNameDiv.style.height = "42px";
        // teamTimeDiv.style.height = "42px";
        // teamPointsDiv.style.height = "42px";

        teamNameDiv.style.padding = "4px 8px";
        teamTimeDiv.style.padding = "4px 8px";
        teamPointsDiv.style.padding = "4px 8px";

        teamNameDiv.style.alignContent = "center";
        teamTimeDiv.style.alignContent = "center";
        teamPointsDiv.style.alignContent = "center";

        leaderboard.appendChild(teamNameDiv);
        leaderboard.appendChild(teamTimeDiv);
        leaderboard.appendChild(teamPointsDiv);

        teamNameDiv.innerHTML = `${user.name}`;
        teamTimeDiv.innerHTML = `${user.finalTime.hours}:${user.finalTime.mins}:${user.finalTime.secs}`;
        teamPointsDiv.innerHTML = `${user.score}`;

        console.log(teamNameDiv.textContent);

        if (team.score === 0 && teamNameDiv.textContent === team.name) {
            teamTimeDiv.textContent = `DNF`;
            document.querySelector("h2").textContent = "Ni förlorade!";
            document.querySelector("p").textContent = "Bättre lycka nästa gång.";
        }
    }
})();




