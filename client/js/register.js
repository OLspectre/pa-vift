import { teams } from "../../data/teams.js";

const btn = document.querySelector("#registerBtn");

const errorCreatingTeamText = document.querySelector("#errorText");
const inputPassword = document.querySelector("#inputPassword");

btn.addEventListener("click", registerUser);

export function registerUser() {

    const passwordInput = document.querySelector("#inputPassword");
    const teamNameInput = document.querySelector("#inputTeamName");
    let team = findTeam(passwordInput.value);

    if (!team) {
        errorCreatingTeamText.innerHTML = "Fel kod försök igen";
        inputPassword.style.borderBottom = "3px solid red";
        return;

    } else {
        updateTeam(team, teamNameInput.value)
        window.location.href = "../pages/rules.html";
    }
}

function updateTeam(team, name) {
    team.name = name;
    localStorage.setItem("team", JSON.stringify(team)); //Uppdaterar objektet i localstorage
}

function findTeam(code) {
    return teams.find(t => t.password === code)
}




