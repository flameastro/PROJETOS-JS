import {key} from "./key.js"

async function getWeather(address) {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${address}&aqi=no`

        const req = await fetch(url)
        const data = await req.json()

        if (data.error) {
            return `Erro: ${data.error.message}`
        }

        return `Temperatura: ${data.current.temp_c}°C`
    } catch (err) {
        return `Erro: ${err}`
    }
}

const result = document.querySelector(".result")
const button = document.querySelector("button")
button.addEventListener("click", () => {
    const address = document.querySelector("#address").value
    getWeather(address).then((res) => {
        result.innerHTML = `
            <p>${res}</p>
        `
    })
})

