let gameArea = document.getElementById("gameArea")

let score = 0
let lives = 3
let level = 1
let speed = 4

let basket = document.createElement("div")
basket.classList.add("basket")
basket.style.left = "150px"

gameArea.appendChild(basket)

document.addEventListener("mousemove", moveBasket)
document.addEventListener("touchmove", touchBasket)

function moveBasket(e){
let rect = gameArea.getBoundingClientRect()
basket.style.left = (e.clientX - rect.left - 45) + "px"
}

function touchBasket(e){
let rect = gameArea.getBoundingClientRect()
basket.style.left = (e.touches[0].clientX - rect.left - 45) + "px"
}

function spawnFruit(){

let fruit = document.createElement("div")
fruit.classList.add("fruit")

let fruits = ["🍎","🍌","🍊","🍓","🍇","🍉"]

fruit.innerHTML = fruits[Math.floor(Math.random()*fruits.length)]

fruit.style.left = Math.random()*360 + "px"
fruit.style.top = "0px"

gameArea.appendChild(fruit)

let fall = setInterval(function(){

fruit.style.top = fruit.offsetTop + speed + "px"

if(fruit.offsetTop > 460){

let basketX = basket.offsetLeft
let fruitX = fruit.offsetLeft

if(fruitX > basketX-40 && fruitX < basketX+80){

score++

document.getElementById("score").innerText = score

if(score % 10 === 0){

level++
speed++

document.getElementById("level").innerText = level

}

}else{

lives--
document.getElementById("lives").innerText = lives

if(lives <= 0){

alert("Game Over! Score: " + score)
location.reload()

}

}

fruit.remove()
clearInterval(fall)

}

},30)

}

function spawnBomb(){

let bomb = document.createElement("div")
bomb.classList.add("bomb")

bomb.innerHTML = "💣"

bomb.style.left = Math.random()*360 + "px"
bomb.style.top = "0px"

gameArea.appendChild(bomb)

let fall = setInterval(function(){

bomb.style.top = bomb.offsetTop + (speed+2) + "px"

if(bomb.offsetTop > 460){

let basketX = basket.offsetLeft
let bombX = bomb.offsetLeft

if(bombX > basketX-40 && bombX < basketX+80){

lives--

document.getElementById("lives").innerText = lives

if(lives <= 0){

alert("💥 Bomb hit! Game Over")
location.reload()

}

}

bomb.remove()
clearInterval(fall)

}

},30)

}

function startGame(){

setInterval(spawnFruit,1000)

setInterval(spawnBomb,3000)

}
