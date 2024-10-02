function executeProteinPizzaPrevention() {
    const PROTEINSKA_PIZZA = "Buffalo cvjetača & dip"
    const h1Elements = [...document.querySelectorAll("h1")];
    const isProteinPizzaPresent = h1Elements.some(h1 => h1.textContent.includes(PROTEINSKA_PIZZA));

    const button = document.querySelector("button[class^='PriceButton-module']");
    if (button) {
        if (isProteinPizzaPresent) {
            addMoveButtonHandler(button);
        } else {
            removeMoveButtonHandler(button);
            setButtonStyle(button);
        }
    }
}

let moveButtonHandler = null;

function addMoveButtonHandler(button) {
    if (!moveButtonHandler) {
        moveButtonHandler = moveButtonRandomly.bind(button);
        button.addEventListener("mouseover", moveButtonHandler);
    }
}

function removeMoveButtonHandler(button) {
    if (moveButtonHandler) {
        button.removeEventListener("mouseover", moveButtonHandler);
        moveButtonHandler = null;
    }
}

function moveButtonRandomly(event) {
    const button = event.currentTarget;
    const { innerWidth: width, innerHeight: height } = window;
    const maxTop = height - button.offsetHeight;
    const maxLeft = width - button.offsetWidth;

    const randomTop = `${Math.floor(Math.random() * maxTop)}px`;
    const randomLeft = `${Math.floor(Math.random() * maxLeft)}px`;

    setButtonStyle(button, randomTop, randomLeft);
}

function setButtonStyle(button, top = "", left = "") {
        button.style.position = top && left ? "fixed" : "";
        button.style.zIndex = top && left ? "1000" : "";
        button.style.top = top;
        button.style.left = left;
}

window.onload = executeProteinPizzaPrevention;

const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
        if (mutation.type === "childList" || mutation.type === "subtree") {
            executeProteinPizzaPrevention();
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
