import { locationsData } from "../../data/location.js";
import { validateInput } from "../js/gameLogic.js";
import { startTimer, calculateTimeTaken, startCooldown, resumeCooldown } from "./timerLogic.js";
// import { placePin } from "./questMap.js";

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
const hasMapBtn = document.querySelector("#map-btn-wrapper");

const hasMainCards = document.querySelector("#hasMainCards");

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

let points = 1000;
let team = JSON.parse(localStorage.getItem("team"));

if (!team.startTime) {
    console.log("timer startar");
    showTimer.textContent = "3:00:00";
    team.startTime = Date.now();

    localStorage.setItem("team", JSON.stringify(team)); //Uppdaterar objektet i localstorage
}
console.log("Team info:", team);

const timer = startTimer(showTimer, () => {
    team.endTime =
        window.location.href = "/pages/gameEnd.html"
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
    let warningDivContent;

    if (e.target.id === "guessPartBtn" && !e.target.classList.contains("inactive")) {
        overlayPopup.style.display = "flex";
        warningDivContent = ""
        warningDiv.innerHTML = warningDivContent;
        confirmBtn.id = "destination"
    }
    if (e.target.id === "guessEndBtn") {
        overlayPopup.style.display = "flex";
        warningDivContent = `Fel gissning låser svarsknappen för huvudgåtan i <span>5 minuter</span>`
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

inputField.addEventListener("click", () => {
    inputField.removeAttribute("id");
    inputField.value = "";
})


confirmBtn.addEventListener("click", () => {
    validateInput(confirmBtn.id, inputField.value, {
        onCorrect: () => {
            if (confirmBtn.id === "destination") {
                alert("Rätt!")
                console.log("activeChallenge:", team.activeChallenge);
                // team = JSON.parse(localStorage.getItem("team"));
                if (team.currLocation === 1) {
                    team.activeChallenge = team.currLocation;
                } else {
                    team.activeChallenge++;
                }
                console.log("activeChallenge again:", team.activeChallenge);
                unlockMap()
                setTimeout(() => closePopup(), 1500)

                localStorage.setItem("team", JSON.stringify(team));
                updateUI();
            }
            if (confirmBtn.id === "main") {
                alert("GRATTIS! Ni gissade rätt på slutmålet, ta er nu dit och registrera svaret för sista utmaningen för att stoppa tiden");
                setTimeout(() => closePopup(), 1500);
                unlockMap();
                team.mainGuessedAt = team.currLocation;
                console.log(team.mainGuessedAt);
                team.activeChallenge = 6;
                team.currLocation = 6;
                localStorage.setItem("team", JSON.stringify(team));
                updateUI();
            }
        },
        onWrong: () => {
            if (confirmBtn.id === "main") {
                document.querySelector(".overlay-popup").style.display = "none"
                guessEndBtn.classList.add("inactive")
                guessEndBtn.disabled = true
                startCooldown(guessEndBtn, () => {
                    guessEndBtn.disabled = false
                    guessEndBtn.classList.remove("inactive")
                    guessEndBtn.textContent = "Svara"
                })
            } else {
                addIncorrectStyle();
            }
        }
    })
})


function addIncorrectStyle() {
    inputField.id = "wrong";
    inputField.value = `Fel svar`
}




const title = document.querySelector("#destinationCardContainer h3");
const hintText = document.querySelector("#destinationCardContainer p");

renderMainClues();


export function updateUI() {
    team = JSON.parse(localStorage.getItem("team"));

    if (!team.mapUnlocked) {
        // State 1: Kartan ej upplåst — visa gåta för currLocation
        title.textContent = `Destination ${team.currLocation}`;
        hintText.textContent = locationsData.find(d => d.locationID === team.currLocation).hint;
        hasMapBtn.style.display = "none";
        return;
    }

    if (team.currLocation == 6 && team.activeChallenge === 6) guessEndBtn.remove();

    if (team.mapUnlocked && !team.mapNotificationSeen) {
        // State 2: Kartan precis upplåst — visas endast en gång
        title.textContent = "Grattis!";
        hintText.textContent = "Ni har låst upp kartan — lös utmaningen på destinationen!";
        hasMapBtn.style.display = "block";
        notification.textContent = "!";
        document.querySelector("#guessPartBtn").classList.add("inactive");
        return;
    }

    if (team.mapUnlocked && team.mapNotificationSeen && team.currLocation === team.activeChallenge) {
        // State 3: Sett notisen, ej löst utmaningen än
        title.textContent = "";
        hintText.textContent = "Lös utmaningen på destinationen för nästa gåta";

        if (team.currLocation === 6) {
            hintText.textContent = "Lös sista utmaningen för att stoppa tiden!"
        }
        hasMapBtn.style.display = "block";
        notification.classList.add("hidden");
        team.activeChallenge = team.currLocation;
        document.querySelector("#guessPartBtn").classList.add("inactive");
        document.querySelector("#guessPartBtn").disabled = true;
        return;
    }

    // State 4: Utmaningen löst — visa nästa gåta
    title.textContent = `Destination ${team.currLocation}`;
    hintText.textContent = locationsData.find(d => d.locationID === team.currLocation).hint;
    console.log(hintText.textContent);
    console.log(team.hintsUnlocked);
    console.log(locationsData.find(d => d.locationID === team.currLocation));

    hasMapBtn.style.display = "block";
    document.querySelector("#guessPartBtn").classList.remove("inactive");
    document.querySelector("#guessPartBtn").disabled = false;
    notification.classList.add("hidden");

    if (team.currLocation < 6) {
        renderMainClues();
    }


}

function renderMainClues() {
    // if (team.currLocation === 6) {
    //     hasMainCards.innerHTML = ""

    //     for (let i = 0; i < 5; i++) {
    //         const card = document.createElement("div")
    //         card.classList.add("card")
    //         card.innerHTML = `
    //         <div id="pointContainer">
    //             <p>${1000 - (i * 200)}</p>
    //             <img src="../media/el_star-alt.svg" alt="point(s)">
    //         </div>
    //         <h3>Ledtråd ${i + 1}</h3>
    //         <p>${team.hintsUnlocked[i]}</p>
    //     `
    //         hasMainCards.appendChild(card)
    //     }

    //     if (team.hintsUnlocked.length > 1) {
    //         endCardContainer.style.marginTop = "-20%"
    //     }
    //     return;
    // }
    hasMainCards.innerHTML = ""

    for (let i = 0; i < team.hintsUnlocked.length; i++) {
        const card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `
            <div id="pointContainer">
                <p>${1000 - (i * 200)}</p>
                <img src="../media/el_star-alt.svg" alt="point(s)">
            </div>
            <h3>Ledtråd ${i + 1}</h3>
            <p>${team.hintsUnlocked[i]}</p>
        `
        hasMainCards.appendChild(card)
    }

    if (team.hintsUnlocked.length > 1) {
        endCardContainer.style.marginTop = "-20%"
    }
}




mapBtn.addEventListener("click", () => {
    team.mapNotificationSeen = true;
    localStorage.setItem("team", JSON.stringify(team));
    window.location.href = "../pages/questMap.html";
})
updateUI()



export function unlockMap() {
    team.mapUnlocked = true;
    localStorage.setItem("team", JSON.stringify(team));//Uppdaterar objektet i localstorage
    console.log(team);

    updateUI();
}