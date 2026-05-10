import { teams } from "../../data/teams.js"

const team = JSON.parse(localStorage.getItem("team"));

const leaderboard = document.querySelector("#leaderboard");
const showEndTime = document.querySelector("#winOrLoseSection p");

console.log(team.finalTime);

team.finalTime = { hours: 2, mins: 17, secs: 3 } // EXEMPEL ATT SE TID


if (!team.finalTime.hours && team.finalTime.mins) {
    showEndTime.textContent = `Tid: ${team.finalTime.mins} minuter och ${team.finalTime.secs} Sekunder`;
} else if (team.finalTime.hours) {
    showEndTime.textContent = `Tid: ${team.finalTime.hours} timmar ${team.finalTime.mins} Minuter och ${team.finalTime.secs} Sekunder`;
} else {
    showEndTime.textContent = `Tid: ${team.finalTime.secs} Skunder`;
}


(function createLeaderboard() {
    for (let team of teams) {
        const teamNameDiv = document.createElement("div");
        const teamTimeDiv = document.createElement("div");
        const teamPointsDiv = document.createElement("div");

        teamNameDiv.style.border = "1px solid var(--hColor)";
        teamTimeDiv.style.border = "1px solid var(--hColor)";
        teamPointsDiv.style.border = "1px solid var(--hColor)";

        teamNameDiv.style.height = "42px";
        teamTimeDiv.style.height = "42px";
        teamPointsDiv.style.height = "42px";

        teamNameDiv.style.padding = "4px 8px";
        teamTimeDiv.style.padding = "4px 8px";
        teamPointsDiv.style.padding = "4px 8px";

        teamNameDiv.style.alignContent = "center";
        teamTimeDiv.style.alignContent = "center";
        teamPointsDiv.style.alignContent = "center";

        leaderboard.appendChild(teamNameDiv);
        leaderboard.appendChild(teamTimeDiv);
        leaderboard.appendChild(teamPointsDiv);

        teamNameDiv.innerHTML = `${team.name}`;
        // teamTimeDiv.innerHTML = `${team.finalTime.hours}:${team.finalTime.mins}:${team.finalTime.secs}`;
        teamPointsDiv.innerHTML = `/* ??? */`;
    }
})();




