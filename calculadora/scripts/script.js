const calcsSection = document.querySelector("#calcs")
let result = document.querySelector(".result > span")
let calcs = []

function openHistory() {
    const history = document.querySelector(".history > span")
    const calcs = document.querySelector(".history #calcs")
    calcs.style.display = "none"
    history.addEventListener("click", () => {
        if (calcs.style.display == "none") {
            calcs.style.display = "block"
            interactCalc()
        } else {
            calcs.style.display = "none"
        }
    })
}


function getPreviousCalcs() {
    const get = JSON.parse(localStorage.getItem("calcs"))
    calcs = []
    for (let calc of get) {
        calcs.push(calc)
    }

    return calcs
}


function addCalcsToHistory() {
    calcsSection.innerHTML = `<button class="btn btn-link">Clear</button>`

    calcs = getPreviousCalcs()
    for (let calc of calcs) {
        calcsSection.innerHTML += `
            <p>
                <span class="interact" style="color: #303030";>${calc.slice(0, calc.indexOf("="))}</span> = 
                <span style="color: #212121";>${calc.slice(calc.indexOf("=")+2)}</span>
            </p>
        `
    }

    deleteHistory()
}


function deleteHistory() {
    const btnClear = document.querySelector(".btn-link")
    btnClear.addEventListener("click", () => {
        calcs = []
        localStorage.setItem("calcs", JSON.stringify(calcs))
        calcsSection.innerHTML = `<button class="btn btn-link">Clear</button>`

        location.reload()
    })
}


function interactCalc() {
    const interact = document.querySelectorAll(".interact")
    interact.forEach(calcIn => {
        calcIn.addEventListener("click", () => {
            result.innerText = calcIn.innerText
        })
    })
}


function addChar(char) {
    if (result.innerText == "Erro!") {
        result.innerText = char
    } else {
        result.innerText += char
    }
}


function del() {
    result = document.querySelector(".result > span")
    let r = ""

    for (let i = 0; i < result.innerText.length-1; i++) {
        r += result.innerText[i]
    }

    result.innerText = r
}


function cl() {
    result.innerText = ""
}


function getResult() {
    try {
        if (!result.innerText) {
            result.innerText = "Erro!"
        } else {
            let calcResult = result.innerHTML
            result.innerText = eval(result.innerText)
            calcResult = `${calcResult} = ${result.innerHTML}`

            calcs.push(calcResult)
            localStorage.setItem("calcs", JSON.stringify(calcs))
            addCalcsToHistory()
            interactCalc()
        }
    } catch (error) {
        result.innerText = "Erro!"
    }
}

openHistory()
addCalcsToHistory()
deleteHistory()
