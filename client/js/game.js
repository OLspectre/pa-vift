const team = JSON.parse(localStorage.getItem("team"));
console.log("Team playing", team);


const buttonContainer = document.querySelector("#buttonContainer")

const partClueBtn = document.querySelector("#partClueBtn");
const endClueBtn = document.querySelector("#endClueBtn");

const guessBtn = document.querySelectorAll(".guessBtn");
const overlayPopup = document.querySelector(".overlay-popup");
const closeIcon = document.querySelector(".close-popup");
const confirmBtn = document.querySelector(".answer-card button");
const popupMain = document.querySelector("#popupMain");
const warningDiv = document.querySelector("#warningDiv");


const partCardContainner = document.querySelector("#destinationCardContainer");
const endCardContainer = document.querySelector("#endCardContainer");

const mapBtn = document.querySelector("#mapBtn");

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
    
    if (e.target.id === "guessPartBtn") overlayPopup.style.display = "flex";
    if (e.target.id === "guessEndBtn") {
        warningDiv.style.display = "block";
        overlayPopup.style.display = "flex";
    }
})


closeIcon.addEventListener("click", closePopup)

function closePopup() {
    overlayPopup.style.display = "none";
    warningDiv.style.display = "none";
}

const inputField = document.querySelector(".answer-card input");

inputField.addEventListener("input", () => {
    confirmBtn.classList.toggle("inactive", inputField.value.trim() === "")
})

mapBtn.addEventListener("click", () => {
    window.location.href = "../pages/questMap.html";
})



const showTimer = document.querySelector("#timer");


// Timer in works
let timeLeft = 10800; // 3 hours in seconds 10800
const timer = setInterval(() => {
    timeLeft--

    const hours = Math.floor(timeLeft / 3600)
    const mins = Math.floor((timeLeft % 3600) / 60)
    const secs = timeLeft % 60

    if (timeLeft > 3600) {
        showTimer.textContent = `${hours}:${mins}:${secs.toString().padStart(2, "0")}`
    } else if (timeLeft < 60) {
        showTimer.textContent = `${secs.toString().padStart(2, "0")}`
    } else {
        showTimer.textContent = `${mins}:${secs.toString().padStart(2, "0")}`

    }
    console.log(timeLeft)
    if (timeLeft <= 0) {
        clearInterval(timer) // stops the interval
        console.log("Done!");
        const timeTakenInMins = calculateTimeTaken(timeLeft);
        console.log(timeTakenInMins);

        // window.href --> end game screen
    }

}, 1000)




function calculateTimeTaken(timeLeft) {
    const timeUsed = 10800 - timeLeft;

    const hours = Math.floor(timeUsed / 3600)
    const mins = Math.floor((timeUsed % 3600) / 60)
    const secs = timeUsed % 60

    return `Time taken to complete: ${hours} hours ${mins} minutes ${secs} seconds`;
}


const finishBtn = document.getElementById("finishBtn");

finishBtn.addEventListener("click", () => {
    clearInterval(timer)
    const result = calculateTimeTaken(timeLeft)
    alert(result);
    // window.location.href = "/pages/gameEnd.html"
})