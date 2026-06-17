const results = document.querySelector(".results")

const btnChoice = document.querySelector(".choice")
const btnDisplay = document.querySelector(".display")

let real1 = Math.floor(Math.random() * 5) + 1
let centavos50 = Math.floor(Math.random() * 5) + 1
let centavos25 = Math.floor(Math.random() * 5) + 1
let centavos10 = Math.floor(Math.random() * 10) + 1
let centavos5 = Math.floor(Math.random() * 5) + 1
let cents = [real1, centavos50, centavos25, centavos10, centavos5]


function displayMoney() {
    const moneyImages = ["assets/1-real.png", "assets/50-centavos.png", "assets/25-centavos.png", "assets/10-centavos.png", "assets/5-centavos.png"]

    for (let i in cents) {
        for (let cns = cents[i]; cns > 0; cns--) {
            results.innerHTML += `
                <img src="${moneyImages[i]}">
            `
        }
    }
}


function validateUserChoice() {
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

displayMoney()

const btnVerify = document.querySelector(".verify")
btnVerify.addEventListener("click", () => {
    validateUserChoice()
})

window.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        validateUserChoice()
    }
})
