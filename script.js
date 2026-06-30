const kitty = document.getElementById("kitty");
const game = document.getElementById("game");
const points = document.getElementById("points");

let score = 0;
let jumping = false;
let gameFinished = false;

document.addEventListener("click", jump);
document.addEventListener("touchstart", jump);

function jump() {
    if (jumping || gameFinished) return;

    jumping = true;
    kitty.style.bottom = "140px";

    setTimeout(() => {
        kitty.style.bottom = "20px";
        jumping = false;
    }, 450);
}

function createStrawberry() {

    if (gameFinished) return;

    const strawberry = document.createElement("img");
    strawberry.src = "img/fresa.png";
    strawberry.className = "strawberry";

    strawberry.style.left = "800px";
    strawberry.style.bottom = "20px";

    game.appendChild(strawberry);

    let x = 800;

    const move = setInterval(() => {

        x -= 7;
        strawberry.style.left = x + "px";

        const k = kitty.getBoundingClientRect();
        const s = strawberry.getBoundingClientRect();

        if (
            k.left < s.right &&
            k.right > s.left &&
            k.top < s.bottom &&
            k.bottom > s.top
        ) {
            score++;
            points.textContent = score;

            strawberry.remove();
            clearInterval(move);

            if (score >= 100) {
                finishGame();
            }
        }

        if (x < -50) {
            strawberry.remove();
            clearInterval(move);
        }

    }, 20);
}

setInterval(createStrawberry, 900);

function finishGame() {

    gameFinished = true;

    const house = document.createElement("img");
    house.src = "img/casa.png";
    house.className = "house";
    game.appendChild(house);

    kitty.style.left = "620px";

    const message = document.createElement("div");
    message.id = "message";
    message.innerHTML = "🎉 ¡Felicidades Emi! ❤️";
    game.appendChild(message);
}
