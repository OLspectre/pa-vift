import { validateInput } from "../js/gameLogic.js";
import { startTimer, calculateTimeTaken, startCooldown } from "./timerLogic.js";

const buttonContainer = document.querySelector("#buttonContainer")

const partClueBtn = document.querySelector("#partClueBtn");
const endClueBtn = document.querySelector("#endClueBtn");

const guessBtn = document.querySelectorAll(".guessBtn");
const overlayPopup = document.querySelector(".overlay-popup");
const closeIcon = document.querySelector(".close-popup");
const confirmBtn = document.querySelector(".answer-card button");
const input = document.querySelector(".answer-card input");
const popupMain = document.querySelector("#popupMain");
const warningDiv = document.querySelector("#warningDiv");

const partCardContainner = document.querySelector("#destinationCardContainer");
const endCardContainer = document.querySelector("#endCardContainer");
const mapBtn = document.querySelector("#mapBtn");
const inputField = document.querySelector(".answer-card input");

const finishBtn = document.getElementById("finishBtn");
const showTimer = document.querySelector("#timer");



const cooldownStart = localStorage.getItem("cooldownStart"); // Cooldown timer
const team = JSON.parse(localStorage.getItem("team"));
if (!team.startTime) {
    team.startTime = Date.now();
    localStorage.setItem("team", JSON.stringify(team)); //Uppdaterar objektet i localstorage
}

if (cooldownStart) {
    inputField.disabled = true
    startCooldown(confirmBtn, () => {
        inputField.disabled = false
    })
}

console.log("Team playing", team);


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
    console.log(e);

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
}


inputField.addEventListener("input", () => {
    confirmBtn.classList.toggle("inactive", inputField.value.trim() === "")
})

mapBtn.addEventListener("click", () => {
    window.location.href = "../pages/questMap.html";
})



const timer = startTimer(showTimer, () => {
    window.location.href = "/pages/gameEnd.html?result=dnf"
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