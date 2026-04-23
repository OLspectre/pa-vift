const buttonContainer = document.querySelector("#buttonContainer")
const partClueBtn = document.querySelector("#partClueBtn");
const endClueBtn = document.querySelector("#endClueBtn");

const partCardContainner = document.querySelector("#destinationCardContainer");
const endCardContainer = document.querySelector("#endCardContainer");

const mapBtn = document.querySelector("#mapBtn");

buttonContainer.addEventListener("click", function (e) {
    if (!e.target.classList.contains("selected")) {
        endClueBtn.classList.toggle("selected");
        partClueBtn.classList.toggle("selected");

        if (e.target = endClueBtn) {
            partCardContainner.style.display = "none"
            endCardContainer.style.display = "flex"
        }

        if (e.target != endClueBtn) {
            endCardContainer.style.display = "none"
            partCardContainner.style.display = "flex"
        }

    }
})


mapBtn.addEventListener("click", () => {
    window.location.href = "../pages/questMap.html";
})



