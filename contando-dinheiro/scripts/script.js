const results = document.querySelector(".results")

const btnChoice = document.querySelector(".choice")
const btnStart = document.querySelector(".start")
let gameStarted = false

let real1
let centavos50
let centavos25
let centavos10
let centavos5
let cents


function setDifficulty(value) {
    real1 = Math.floor(Math.random() * value) + 1
    centavos50 = Math.floor(Math.random() * value) + 1
    centavos25 = Math.floor(Math.random() * value) + 1
    centavos10 = Math.floor(Math.random() * value) + 1
    centavos5 = Math.floor(Math.random() * value) + 1
    cents = [real1, centavos50, centavos25, centavos10, centavos5]
}


function getDifficulty() {
    const difficulty = document.querySelector("#difficulty").value

    if (difficulty == "easy") {
        setDifficulty(3)
    } else if (difficulty == "normal") {
        setDifficulty(5)
    } else if (difficulty == "hard") {
        setDifficulty(10)
    }
}


function displayMoney() {
    const moneyImages = ["assets/1-real.png", "assets/50-centavos.png", "assets/25-centavos.png", "assets/10-centavos.png", "assets/5-centavos.png"]
    results.innerHTML = ""

    for (let i in cents) {
        for (let cns = cents[i]; cns > 0; cns--) {
            results.innerHTML += `
                <img src="${moneyImages[i]}">
            `
        }
    }
}


function validateUserChoice() {
    if (!gameStarted) {
        alert("O jogo ainda não começou")
    } else {
        const money = Number(document.querySelector("#money").value)
    
        if (money > 0) {
            let total = 0
            total += real1 + ((centavos50 * 50) / 100) + ((centavos25 * 25) / 100) + ((centavos10 * 10) / 100) + ((centavos5 * 5) / 100)
            let reset = false
    
            if (money == total) {
                alert("✅ Você acertou! seu jogo será reiniciado")
                reset = true
            } else {
                let r = confirm("❌ Você errou! Deseja continuar o jogo?")
                if (!r) {
                    reset = true
                }
            }
    
            if (reset) {
                location.reload()
            }
        } else {
            alert("Insira um valor maior que 0")
        }
    }
}


const btnVerify = document.querySelector(".verify")
btnVerify.addEventListener("click", () => {
    validateUserChoice()
})

window.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        validateUserChoice()
    }
})

btnStart.addEventListener("click", () => {
    gameStarted = true
    getDifficulty()
    displayMoney()
})
