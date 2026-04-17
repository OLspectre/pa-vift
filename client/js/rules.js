
const btn = document.querySelector(".linkBTN");
btn.addEventListener("click", changePage);

async function changePage() {
    showLoadingAnimation();

    setTimeout(() => {
        window.location.href = "../pages/game.html";
    }, 5000)
}



function showLoadingAnimation() {
    const loadingScreen = document.querySelector("div#loading");
    const displayCount = document.querySelector("#loading div");

    document.querySelector(".container").style.display = "none";
    loadingScreen.style.display = "flex";

    let i = 3;

    let interval = setInterval(() => {
        i--;
        displayCount.textContent = i;
        console.log(i);

        if (i === 0) {
            loadingScreen.textContent = "Kör!";
            clearInterval(interval);
        }

    }, 1000)
};