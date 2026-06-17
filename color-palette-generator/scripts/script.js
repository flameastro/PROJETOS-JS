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
            <div class="color" style="color: #${color}">
                <p>${color}</p>
            </div>
        `
    }
}
