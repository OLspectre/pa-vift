import { locationsData } from "../../data/location.js";
import { validateInput } from "../js/gameLogic.js";
import { startTimer, calculateTimeTaken, startCooldown, resumeCooldown } from "./timerLogic.js";

const buttonContainer = document.querySelector("#buttonContainer")

const partClueBtn = document.querySelector("#partClueBtn");
const endClueBtn = document.querySelector("#endClueBtn");

const overlayPopup = document.querySelector(".overlay-popup");
const closeIcon = document.querySelector(".close-popup");
const confirmBtn = document.querySelector(".answer-card button");
const popupMain = document.querySelector("#popupMain");

const mainAnswerCard = document.querySelector(".titleAndInput-container");

const guessEndBtn = document.querySelector("button#guessEndBtn");
const warningDiv = document.querySelector("#warningDiv");

const partCardContainner = document.querySelector("#destinationCardContainer");
const endCardContainer = document.querySelector("#endCardContainer");
const mapBtn = document.querySelector("#mapBtn");
const inputField = document.querySelector(".answer-card input");

const finishBtn = document.getElementById("finishBtn");
const showTimer = document.querySelector("#timer");



const cooldownStart = localStorage.getItem("cooldownStart");
if (cooldownStart) {

    guessEndBtn.disabled = true;
    guessEndBtn.classList.add("inactive");
    resumeCooldown(guessEndBtn, () => {
        guessEndBtn.disabled = false;
        guessEndBtn.classList.remove("inactive");
        guessEndBtn.textContent = "Svara";
    })
}

const team = JSON.parse(localStorage.getItem("team"));

if (!team.startTime) {
    console.log("timer startar");
    showTimer.textContent = "3:00:00";
    team.startTime = Date.now();

    localStorage.setItem("team", JSON.stringify(team)); //Uppdaterar objektet i localstorage
}
console.log("Team info:", team);

const timer = startTimer(showTimer, () => {
    team.endTime =
        window.location.href = "/pages/gameEnd.html?result=dnf"
})




buttonContainer.addEventListener("click", function (e) {
    console.log("clicked", e.target);

    if (!e.target.classList.contains("selected")) {
        endClueBtn.classList.toggle("selected");
        partClueBtn.classList.toggle("selected");

        if (e.target == endClueBtn) {
            partCardContainner.style.display = "none"
            endCardContainer.style.display = "flex"

        }

        if (e.target != endClueBtn) {
            endCardContainer.style.display = "none"
            partCardContainner.style.display = "flex"
        }

    }
})

document.querySelector("#pageMain").addEventListener("click", function (e) {
    let warningDivContent;

    if (e.target.id === "guessPartBtn") {
        overlayPopup.style.display = "flex";
        warningDivContent = ""
        console.log(warningDivContent);

        warningDiv.innerHTML = warningDivContent;

        confirmBtn.id = "destination"
    }
    if (e.target.id === "guessEndBtn") {
        overlayPopup.style.display = "flex";
        warningDivContent = `Fel gissning låser svarsknappen för huvudgåtan i <span>5 minuter</span>`
        console.log(warningDivContent);

        warningDiv.innerHTML = warningDivContent;

        confirmBtn.id = "main"
    }
})

closeIcon.addEventListener("click", closePopup)

export function closePopup() {
    overlayPopup.style.display = "none";
    inputField.value = "";
}

inputField.addEventListener("input", () => {
    confirmBtn.classList.toggle("inactive", inputField.value.trim() === "")
})


export function updateUI() {
    JSON.parse(localStorage.getItem("team"));
    if (team.mapUnlocked) {
        console.log("MAP UNLOCKED");

        const hasMapBtn = document.querySelector("#map-btn-wrapper");
        hasMapBtn.style.display = "block";
        notification.textContent = "!"
    }
    if (team.mapNotificationSeen) {
        notification.remove()
    }


    // renderHint()
    const title = document.querySelector("#destinationCardContainer h3");
    const hintText = document.querySelector("#destinationCardContainer p");

    title.textContent = `Destination ${team.currLocation}`;
    let hint = locationsData.find(d => d.locationID === team.currLocation).hint;
    hintText.textContent = hint;

    // renderEndClue()

}

// Vid sidladdning
updateUI()


mapBtn.addEventListener("click", () => {
    team.mapNotificationSeen = true;
    localStorage.setItem("team", JSON.stringify(team));
    window.location.href = "../pages/questMap.html";
})






//för testing
finishBtn.addEventListener("click", () => {
    clearInterval(timer)
    const result = calculateTimeTaken();
    team.finalTime = result;
    localStorage.setItem("team", JSON.stringify(team));//Uppdaterar objektet i localstorage
    console.log(team.finalTime);
    console.log(result);
    // window.location.href = "/pages/gameEnd.html"
})


export function unlockMap() {
    team.mapUnlocked = true;
    localStorage.setItem("team", JSON.stringify(team));//Uppdaterar objektet i localstorage
    console.log(team);

    updateUI();
}