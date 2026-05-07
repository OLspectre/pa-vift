import { teams } from "../../data/teams.js"

const team = JSON.parse(localStorage.getItem("team"));

const leaderboard = document.querySelector("#leaderboard");

function createLeaderboard() {
for (team in teams) {
    const teamNameDiv = document.createElement("div");
    const teamTimeDiv = document.createElement("div");
    const teamPointsDiv = document.createElement("div");

    leaderboard.appendChild(teamNameDiv);
    leaderboard.appendChild(teamTimeDiv);
    leaderboard.appendChild(teamPointsDiv);

    teamNameDiv.innerHTML = `${team.name}`;
    teamTimeDiv.innerHTML = `/* ??? */`;
    teamPointsDiv.innerHTML = `/* ??? */`;

}
}