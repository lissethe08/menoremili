const kitty = document.getElementById("kitty");
const points = document.getElementById("points");
const game = document.getElementById("game");

let score = 0;
let jumping = false;
let gameOver = false;

document.addEventListener("click", jump);

function jump() {
    if (jumping || gameOver) return;

    jumping = true;
    kitty.style.bottom = "150px";

    setTimeout(() => {
        kitty.style.bottom = "20px";
        jumping = false;
    }, 500);
}

function createStrawberry() {

    if (gameOver) return;

    const strawberry = document.createElement("img");
    strawberry.src = "img/fresa.png";
    strawberry.className = "strawberry";

    strawberry.style.left = "820px";
    strawberry.style.bottom = (60 + Math.random() * 220) + "px";

    game.appendChild(strawberry);

    let x = 820;

    const move = setInterval(() => {

        x -= 4;
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
                win();
            }

        }

        if (x < -60) {
            strawberry.remove();
            clearInterval(move);
        }

    }, 20);

}

setInterval(createStrawberry, 1800);

function win() {

    gameOver = true;

    document.querySelectorAll(".strawberry").forEach(f => f.remove());

    const house = document.createElement("img");
    house.src = "img/casa.png";
    house.className = "house";
    game.appendChild(house);

    const message = document.createElement("div");
    message.className = "winMessage";
    message.innerHTML = "🎉 ¡Felicidades Emi! ❤️";
    game.appendChild(message);

}
