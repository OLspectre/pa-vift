import { validateInput } from "../js/gameLogic.js";
import { startTimer, calculateTimeTaken, startCooldown, resumeCooldown } from "./timerLogic.js";

const buttonContainer = document.querySelector("#buttonContainer")

const partClueBtn = document.querySelector("#partClueBtn");
const endClueBtn = document.querySelector("#endClueBtn");

const overlayPopup = document.querySelector(".overlay-popup");
const closeIcon = document.querySelector(".close-popup");
const confirmBtn = document.querySelector(".answer-card button");
const popupMain = document.querySelector("#popupMain");
const warningDiv = document.querySelector("#warningDiv");

const guessEndBtn = document.querySelector("button#guessEndBtn");


const partCardContainner = document.querySelector("#destinationCardContainer");
const endCardContainer = document.querySelector("#endCardContainer");
const mapBtn = document.querySelector("#mapBtn");
const inputField = document.querySelector(".answer-card input");

const finishBtn = document.getElementById("finishBtn");
const showTimer = document.querySelector("#timer");



const cooldownStart = localStorage.getItem("cooldownStart");
console.log(cooldownStart);

if (cooldownStart) {
    console.log(true);

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
    window.location.href = "/pages/gameEnd.html?result=dnf"
})



buttonContainer.addEventListener("click", function (e) {
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
    if (e.target.id === "guessPartBtn") {
        overlayPopup.style.display = "flex";
        confirmBtn.id = "destination"
    }
    if (e.target.id === "guessEndBtn") {
        warningDiv.style.display = "block";
        overlayPopup.style.display = "flex";
        confirmBtn.id = "main"
    }
})

closeIcon.addEventListener("click", closePopup)

function closePopup() {
    overlayPopup.style.display = "none";
    warningDiv.style.display = "none";
    inputField.value = "";
}

inputField.addEventListener("input", () => {
    confirmBtn.classList.toggle("inactive", inputField.value.trim() === "")
})

mapBtn.addEventListener("click", () => {
    window.location.href = "../pages/questMap.html";
})







finishBtn.addEventListener("click", () => {
    clearInterval(timer)
    const result = calculateTimeTaken();
    team.finalTime = result;
    localStorage.setItem("team", JSON.stringify(team));//Uppdaterar objektet i localstorage
    console.log(team.finalTime);
    console.log(result);
    // window.location.href = "/pages/gameEnd.html"
})