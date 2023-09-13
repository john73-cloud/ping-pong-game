let section1 = document.querySelector(".one")
let section2 = document.querySelector(".two")
let item1 = document.querySelector(".item1")
let item2 = document.querySelector(".item2")
let ball = document.querySelector(".ball")
let position = { top: 0 }
let position2 = { top: 0 }
let ballWidth = 50
let currentScore = { player1: 0, player2: 0 }
let score = document.querySelector(".score")
let x = Math.floor(Math.random() * window.innerWidth)
let y = (window.innerHeight - ballWidth) / 2
let speed = { y: 5, x: 5 }
if (Math.floor(Math.random() * window.innerWidth) % 2 == 0) {
    speed.x = -speed.x
}
score.style.left = (window.innerWidth - 40) / 2 + "px"
window.addEventListener("keydown", (event) => {
    if (event.key == "ArrowLeft") {
        window.onkeydown = (e) => {
            if (window.innerHeight - item1.getBoundingClientRect().top < window.innerHeight + 3) {
                if (e.key == "ArrowUp") {
                    position.top += 20
                }
            }
            if (window.innerHeight - item1.getBoundingClientRect().bottom > 3.2) {
                if (e.key == "ArrowDown") {
                    position.top -= 20
                }
            }
            item1.style.bottom = position.top + "px"
        }
    }
})

window.addEventListener("keydown", (event) => {
    if (event.key == "ArrowRight") {
        window.onkeydown = (e) => {
            if (window.innerHeight - item2.getBoundingClientRect().top < window.innerHeight + 3) {
                if (e.key == "ArrowUp") {
                    position2.top += 20
                }
            }
            if (window.innerHeight - item2.getBoundingClientRect().bottom > 7.2) {
                if (e.key == "ArrowDown") {
                    position2.top -= 20
                }
            }
            item2.style.bottom = position2.top + "px"
        }
    }
})
let reset = () => {
    x = (window.innerWidth - ballWidth) / 2
    y = (window.innerHeight - ballWidth) / 2
    speed.x = -speed.x
}
let updateScore = (currentPlayer) => {
    if (currentPlayer == 1) {
        currentScore.player1 += 1
        score.innerHTML = `${currentScore.player1}:${currentScore.player2}`
    }
    if (currentPlayer == 2) {
        currentScore.player2 += 1
        score.innerHTML = `${currentScore.player1}:${currentScore.player2}`
    }

}
function moveball() {
    x += speed.x
    y += speed.y
    if (x - ballWidth < 15 && y > item1.getBoundingClientRect().y && y < item1.getBoundingClientRect().y + 100) {
        speed.x = -speed.x
    }
    if (x + ballWidth > window.innerWidth - 15 && y > item2.getBoundingClientRect().y && y < item2.getBoundingClientRect().y + 100) {
        speed.x = -speed.x
    }
    if (y + ballWidth > window.innerHeight || y < 0) {
        speed.y = -speed.y
    }
    if (x < 0) {
        reset()
        updateScore(2)
    }
    if (x > window.innerWidth - ballWidth) {
        reset()
        updateScore(1)
    }
    ball.style.left = x + "px";
    ball.style.top = y + "px";
    requestAnimationFrame(moveball)
}
moveball()