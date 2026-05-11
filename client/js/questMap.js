import { locationsData } from "../../data/location.js";
import { STADIA_KEY } from "./config.js";
// import { validateInput } from "./gameLogic.js";
import { startTimer, calculateTimeTaken, startCooldown, resumeCooldown } from "./timerLogic.js";

let team = JSON.parse(localStorage.getItem("team"));
const backBtn = document.querySelector("#backBtn");
const answerbtn = document.querySelector("#challenge-answer-btn");
const overlayPopup = document.querySelector(".overlay-popup");
const showTimer = document.querySelector("#timer");
const challengeTitle = document.querySelector(".sheet-content h3");
const challengeText = document.querySelector(".sheet-content p");


var map = L.map('map')

L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=$STADIA_KEY', {
    attribution: '© Stadia Maps © OpenStreetMap',
    maxZoom: 25
}).addTo(map)


let circleMarker, circle, zoomed;

map.locate({ setView: true, maxZoom: 25 });

navigator.geolocation.watchPosition(success, error);

function success(pos) {

    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;


    if (circleMarker) {
        map.removeLayer(circleMarker);
        map.removeLayer(circle);
    }

    circleMarker = L.circleMarker([lat, lng]).addTo(map)
    circle = L.circle([lat, lng], {
        radius: accuracy,
        color: "#e46e27",
        fillColor: "#e46e27",
        fillOpacity: 0.2,
        weight: 2
    }).addTo(map);

    if (!zoomed) {
        zoomed = map.fitBounds(circle.getBounds());
    }

    map.setView([lat, lng]);
}
function error(err) {

    if (err.code === 1) {
        alert("Snälla tillåt platstjänster under hela upplevelsen");
    } else {
        alert("Tekniskt fel: Kan inte hämta platsinformation");
    }
}
renderChallenge();

// PLACERA PIN
map.on('click', (e) => {
    const { lat, lng } = e.latlng
    console.log(lat, lng)
    placePin(lat, lng)
})
function placePin(dLat, dLng) { // posData blir ett objekt [xx.xx, yy.yy] --> locationx.pinData. Anropas vid korrekt location gissning

    let destinationPin = L.circleMarker([dLat, dLng]).addTo(map)
    circle = L.circle([dLat, dLng], {
        radius: accuracy,
        color: "#e46e27",
        fillColor: "#e46e27",
        fillOpacity: 0.2,
        weight: 2
    }).addTo(map);
}


//  DRAGABLE SHEET SLIDER
const sheet = document.getElementById('sheet')
const handle = document.getElementById('handle-area')

const MIN_H = 80
const MAX_H = 400

let dragging = false, startY = 0, startH = 0

handle.addEventListener('mousedown', (e) => {
    dragging = true
    startY = e.clientY
    startH = parseInt(sheet.style.height) || MIN_H
    e.preventDefault()
})

handle.addEventListener('touchstart', (e) => {
    dragging = true
    startY = e.touches[0].clientY
    startH = parseInt(sheet.style.height) || MIN_H
    e.preventDefault()
}, { passive: false })

document.addEventListener('mousemove', (e) => {
    if (!dragging) return
    sheet.style.height = Math.min(MAX_H, Math.max(MIN_H, startH + (startY - e.clientY))) + 'px'
})

document.addEventListener('touchmove', (e) => {
    if (!dragging) return
    sheet.style.height = Math.min(MAX_H, Math.max(MIN_H, startH + (startY - e.touches[0].clientY))) + 'px'
}, { passive: false })

document.addEventListener('mouseup', () => { dragging = false });
document.addEventListener('touchend', () => { dragging = false });






const timer = startTimer(showTimer, () => {
    window.location.href = "/pages/gameEnd.html?result=dnf"
})


backBtn.addEventListener("click", (e) => {
    window.location.href = "../pages/game.html";
})

answerbtn.addEventListener("click", (e) => {
    overlayPopup.style.display = "flex";
})


const closeIcon = document.querySelector(".close-popup");
const confirmBtn = document.querySelector(".answer-card button");

closeIcon.addEventListener("click", closePopup);

function closePopup() {
    overlayPopup.style.display = "none";
    inputField.value = "";
}

const inputField = document.querySelector(".answer-card input");

inputField.addEventListener("input", () => {
    confirmBtn.classList.toggle("inactive", inputField.value.trim() === "")
})


confirmBtn.addEventListener("click", () => {
    validateInput(confirmBtn.id, inputField.value, {
        onCorrect: () => {
            let team = JSON.parse(localStorage.getItem("team"))
            team.currLocation++
            localStorage.setItem("team", JSON.stringify(team))
            closePopup()
            renderChallenge()
        },
        onWrong: () => {
            alert("wrong")
        }
    })
})



function renderChallenge() {
    const challenge = locationsData.find(d => d.locationID === team.currLocation).challenge;


    challengeTitle.textContent = `Utamaning ${team.currLocation}`;
    challengeText.textContent = `${challenge}`;
}


