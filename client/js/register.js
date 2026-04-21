import { teams } from "../../data/teams.js";

let currTeam;
const btn = document.querySelector("#registerBtn");
console.log(btn);

const errorCreatingTeamText = document.querySelector("#errorText");
const inputPassword = document.querySelector("#inputPassword");

btn.addEventListener("click", registerUser);

export function registerUser() {

    const passwordInput = document.querySelector("#inputPassword");
    const teamNameInput = document.querySelector("#inputTeamName");

    console.log("clicked REGISTER");
    let team = findTeam(passwordInput.value);

    if (!team) {
        console.log("fel");
        errorCreatingTeamText.innerHTML = "Invalid code / password";
        inputPassword.style.borderBottom = "3px solid red";
        return;

    } else {
        console.log("Team found: ", team.id);
        updateTeam(team, teamNameInput.value)
        console.log(team);
        window.location.href = "../pages/rules.html";
    }
}

function updateTeam(team, name) {
    team.name = name;
    currTeam = team;
    // Update localstorage with current user / team
}

function findTeam(code) {
    return teams.find(t => t.password === code)
}




