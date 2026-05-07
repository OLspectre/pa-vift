const team = JSON.parse(localStorage.getItem("team"));


const TOTAL_TIME = 10800;

export function getTimeLeft() {
    const elapsed = Math.floor((Date.now() - team.startTime) / 1000);
    return Math.max(0, TOTAL_TIME - elapsed);
}


// Timer in works
export function startTimer(showTimer, onDone) {

    const timer = setInterval(() => {
        const timeLeft = getTimeLeft();

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
        if (timeLeft <= 0) {
            clearInterval(timer) // stops the interval
            console.log("Game Over! Tiden rann ut!");

            onDone();
            // window.href --> end game screen
        }

    }, 1000)

    return timer;
}

export function calculateTimeTaken(timeLeft) {
    const timeUsed = TOTAL_TIME - getTimeLeft();

    const hours = Math.floor(timeUsed / 3600)
    const mins = Math.floor((timeUsed % 3600) / 60)
    const secs = timeUsed % 60

    if (timeUsed < 3600) return { hour: hours, mins: mins, secs: secs };
    if (timeUsed < 60) return { mins: mins, secs: secs };
    return { secs: secs };
}



// COOLDOWN TIMER 
export function startCooldown(showElement, onComplete) {
    localStorage.setItem("cooldownStart", Date.now());

    const cooldown = setInterval(() => {
        const elapsed = Math.floor((Date.now() - localStorage.getItem("cooldownStart")) / 1000)
        const cooldownLeft = Math.max(0, 300 - elapsed)

        const mins = Math.floor(cooldownLeft / 60)
        const secs = cooldownLeft % 60
        // if (cooldownLeft < 60) showElement.textContent = `${secs.toString().padStart(2, "0")}`
        showElement.textContent = `${mins}:${secs.toString().padStart(2, "0")}`

        if (cooldownLeft <= 0) {
            clearInterval(cooldown)
            localStorage.removeItem("cooldownStart");
            onComplete() // aktivera input/knapp igen
        }
    }, 1000)

    return cooldown
}
