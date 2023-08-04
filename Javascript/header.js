const headerTitle = document.querySelector(".title")
const title = "Nick Angelici"
let currentPosition = 1;
let timerID = "";
let animationID = "";

function generateNextLetter() {
    let newTitle = title.substring(0, currentPosition) + "<em id = 'underscore'>_</em>";
    headerTitle.innerHTML = newTitle;
    currentPosition++;
    console.log(currentPosition);
    if (currentPosition == title.length + 1) {
        window.clearInterval(timerID);
        addTitleAnimation();
    }
}

function blink() {
    console.log("test");
    const underscore = document.querySelector("#underscore");
    if (underscore.style.color == "white") {
        underscore.style.color = "black";
    } else {
        underscore.style.color = "white";
    }
}

function addTitleAnimation() {
    headerTitle.addEventListener('mouseenter', () => {
        animationID = window.setInterval(blink, 500)
        underscore.style.color = "black";
    });
    headerTitle.addEventListener('mouseleave', () => {
        window.clearInterval(animationID);
        underscore.style.color = "white";
    });
}

timerID = window.setInterval(generateNextLetter, 50);
/*while (currentPosition < 5) {
    console.log(currentPosition);
    console.log("hmm");
}*/
//headerTitle.addEventListener('scroll', () => window.clearInterval(timer));