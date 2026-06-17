const computerNumber = Math.floor(Math.random() * 100) + 1
const feedback = document.querySelector(".feedback > span")

let attemptsElement = document.querySelector(".attempts")
let attempts = 0

const bet = document.querySelector(".bet")
bet.addEventListener("click", (evt) => {
    evt.preventDefault()

    const number = Number(document.querySelector("#number").value)
    if (number > 0 && number <= 100) {
        attempts++

        if (number === computerNumber) {
            feedback.innerText = `Você acertou! Número: ${number}`
            document.querySelector(".reset").style.display = "inline-block"
        } else if (number > computerNumber) {
            feedback.innerText = "Aposta alta! Tente diminuir!"
        } else {
            feedback.innerText = "Aposta baixa! Tente aumentar!"
        }

        attemptsElement.innerText = `Tentativas: ${attempts}`
    } else {
        alert("Aposta inválida, tente outro número.")
    }
})

const reset = document.querySelector(".reset")
reset.addEventListener("click", (evt) => {
    evt.preventDefault()

    location.reload()
})
