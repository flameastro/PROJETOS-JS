const paletteSection = document.querySelector(".palette > section")
const favoritesSection = document.querySelector(".favorites")
const messagesSection = document.querySelector(".messages")
let palettes = []

const btnGenerate = document.querySelector(".generate")
btnGenerate.addEventListener("click", createPalette)


function getFavoritePalette() {
    let getPalettes = JSON.parse(localStorage.getItem("palettes"))

    if (getPalettes) {
        for (let palette of getPalettes) {
            palettes.push(palette)
            const newSection = document.createElement("section")
            newSection.setAttribute("id", palette.id)
            favoritesSection.appendChild(newSection)
    
            for (let color of palette.colors) {
                newSection.innerHTML += `
                    <article>
                        <div class="fcolor" style="background-color: #${color}"></div>
                        <p>#${color}<span class="material-symbols-outlined">content_copy</span></p>
                    </article>
                `
            }
    
            newSection.innerHTML += `<button type="button" class="delete btn btn-danger"><span class="material-symbols-outlined">delete</span></button>`
        }
    }
}


function generatePalette() {
    let colors = []

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

    paletteSection.innerHTML = ""

    for (let color of colors) {
        paletteSection.innerHTML += `
            <article>
                <div class="color" style="background-color: #${color}"></div>
                <p>#${color}<span class="material-symbols-outlined">content_copy</span></p>
            </article>
        `
    }

    paletteSection.innerHTML += `<button class="save btn btn-success">Save this Palette</button>`
    savePalette(colors)
}


function copyToClipboard() {
    const articles = document.querySelectorAll("article")
    articles.forEach(article => {
        article.addEventListener("click", () => {
            let color = article.childNodes[3].innerText.slice(0, article.childNodes[3].innerText.indexOf("content_copy"))
            navigator.clipboard.writeText(color)
        })
    })
}


function savePalette(colors) {
    const btnSave = document.querySelector(".save")
    btnSave.addEventListener("click", (evt) => {
        let id = favoritesSection.childElementCount

        const newSection = document.createElement("section")
        newSection.setAttribute("id", id)
        favoritesSection.appendChild(newSection)

        for (let color of colors) {
            newSection.innerHTML += `
                <article id="${id}">
                    <div class="fcolor" style="background-color: #${color}"></div>
                    <p>#${color}<span class="material-symbols-outlined">content_copy</span></p>
                </article>
            `
        }

        newSection.innerHTML += `<button type="button" class="delete btn btn-danger"><span class="material-symbols-outlined">delete</span></button>`

        let newPalette = {
            "id": id,
            "colors": colors
        }

        palettes.push(newPalette)
        localStorage.setItem("palettes", JSON.stringify(palettes))
        copyToClipboard()
        deleteFavoritePalette()
    })
}


function deleteFavoritePalette() {
    let getPalettes = JSON.parse(localStorage.getItem("palettes"))

    const btnsDelete = document.querySelectorAll(".delete")
    
    btnsDelete.forEach(btn => {
        btn.addEventListener("click", () => {
            palettes = []

            for (let palette of getPalettes) {
                if (palette.id != btn.parentNode.getAttribute("id")) {
                    palettes.push(palette)
                }
            }

            localStorage.setItem("palettes", JSON.stringify(palettes))
            location.reload()
        })
    })
}


getFavoritePalette()
createPalette()
deleteFavoritePalette()
copyToClipboard()
