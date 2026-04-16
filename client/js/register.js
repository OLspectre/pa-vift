import { teams } from "../../data/teams.js";

let currTeam;
const btn = document.querySelector("#registerBtn");
btn.addEventListener("click", registerUser);

export function registerUser() {

    const passwordInput = document.querySelector("#inputPassword");
    const teamNameInput = document.querySelector("#inputTeamName");

    console.log("clicked REGISTER");
    let team = findTeam(passwordInput.value);

    if (!team) {
        console.log("fel");
        alert("Invalid code / password");
        return;


    } else {
        console.log("Team found: ", team.id);
        updateTeam(team, teamNameInput.value)
        console.log(team);


        changePage();
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



async function changePage() {
    showLoadingAnimation();

    // setTimeout(() => {
    //     window.location.href = "../pages/rules.html";
    // }, 4000)
}



function showLoadingAnimation() {
    const loadingScreen = document.querySelector("div#loading");
    const displayCount = document.querySelector("#loading div");

    document.querySelector(".container").style.display = "none";
    loadingScreen.style.display = "flex";

    let i = 3;

    let interval = setInterval(() => {
        displayCount.textContent = i;
        // const logo = document.createElement("img");
        // logo.src = "../ media / transition logo.svg";
        // displayCount.append(logo);
        i--;
        console.log(i);

        if (i === 0) {
            clearInterval(interval);
            // loadingScreen.style.display = "none";
        }

    }, 1000)

};
