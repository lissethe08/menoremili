const kitty=document.getElementById("kitty");
const points=document.getElementById("points");
const game=document.getElementById("game");

let score=0;
let jumping=false;

document.addEventListener("click",jump);

function jump(){

if(jumping)return;

jumping=true;

kitty.style.bottom="150px";

setTimeout(()=>{

kitty.style.bottom="0px";

jumping=false;

},450);

}

function createStrawberry(){

let strawberry=document.createElement("img");

strawberry.src="img/fresa.png";

strawberry.className="strawberry";

strawberry.style.left="850px";

strawberry.style.bottom=Math.floor(Math.random()*350)+"px";

game.appendChild(strawberry);

let x=850;

let move=setInterval(()=>{

x-=5;

strawberry.style.left=x+"px";

let kittyRect=kitty.getBoundingClientRect();
let fruitRect=strawberry.getBoundingClientRect();

if(
kittyRect.left<fruitRect.right &&
kittyRect.right>fruitRect.left &&
kittyRect.top<fruitRect.bottom &&
kittyRect.bottom>fruitRect.top
){

score++;

points.innerHTML=score;

strawberry.remove();

clearInterval(move);

if(score>=100){

win();

}

}

if(x<-50){

strawberry.remove();

clearInterval(move);

}

},20);

}

setInterval(createStrawberry,1800);

function win(){

clearInterval();

let house=document.createElement("img");

house.src="img/casa.png";

house.className="house";

game.appendChild(house);

let text=document.createElement("div");

text.id="message";

text.innerHTML="🎉 ¡Felicidades Emi! ❤️";

text.style.display="block";

game.appendChild(text);

}
