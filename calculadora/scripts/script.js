let result = document.querySelector(".result > span")

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
            result.innerText = eval(result.innerText)
        }
    } catch (error) {
        result.innerText = "Erro!"
    }
}
