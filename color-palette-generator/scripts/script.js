const messagesSection = document.querySelector(".messages")
const btnGenerate = document.querySelector(".generate")
btnGenerate.addEventListener("click", createPalette)

function generatePalette() {
    const colors = []
    for (let i = 0; i < 6; i++) {
        let letters = "0123456789abcdef"
        let color = ""

        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * letters.length)]
        }

        colors.push(color)
    }

    return colors
}


function createPalette() {
    const colors = generatePalette()

    const paletteSection = document.querySelector(".palette")
    paletteSection.innerHTML = ""
    for (let color of colors) {
        paletteSection.innerHTML += `
            <article>
                <div class="color" style="background-color: #${color}"></div>
                <p>#${color}<span class="material-symbols-outlined">content_copy</span></p>
            </article>
        `

        copyToClipboard()
    }
}

createPalette()


function copyToClipboard() {
    const articles = document.querySelectorAll("article")
    articles.forEach(article => {
        article.addEventListener("click", () => {
            let color = article.childNodes[3].innerText.slice(0, article.childNodes[3].innerText.indexOf("content_copy"))
            navigator.clipboard.writeText(color)

            messagesSection.style.visibility = "visible"
            messagesSection.innerHTML = `
                <p>Cor colada com sucesso</p>
            `

            // https://www.reddit.com/r/learnjavascript/comments/winvtd/how_do_i_create_a_fade_in_affect_for_dynamically/
            messagesSection.animate([{
                opacity: 1
            }, {
                opacity: -1
            }], {
                duration: 1560
            })

            setTimeout(() => {
                messagesSection.style.visibility = "hidden"
            }, 1500)
        })
    })
}
