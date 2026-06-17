const startBtn = document.querySelector(".start")
const stopBtn = document.querySelector(".stop")
const resetBtn = document.querySelector(".reset")
let started = false
let intervalWatch

let timeElement = document.querySelector(".time")
let daysElement = Number(timeElement.innerText.slice(0, 2))
let hoursElement = Number(timeElement.innerText.slice(3, 5))
let minutesElement = Number(timeElement.innerText.slice(6, 8))
let secondsElement = Number(timeElement.innerText.slice(9, 11))

let days = 0
let hours = 0
let minutes = 0
let seconds = 0

let getTime = JSON.parse(localStorage.getItem("time"))
if (getTime) {
    days = getTime.days
    hours = getTime.hours
    minutes = getTime.minutes
    seconds = getTime.seconds

    timeElement.innerText = `${days.toString().padStart(2, 0)}:${hours.toString().padStart(2, 0)}:${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`
}

function updateTime(days, hours, minutes, seconds) {
    let time = {
        "days": days,
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds,
    }

    localStorage.setItem("time", JSON.stringify(time))
}

startBtn.addEventListener("click", () => {
    if (!started) {
        intervalWatch = setInterval(() => {
            seconds++

            if (seconds >= 60) {
                seconds = 0
                minutes++
            }

            if (minutes >= 60) {
                minutes = 0
                hours++
            }

            if (hours >= 24) {
                hours = 0
                days++
            }

            const newTime = `${days.toString().padStart(2, 0)}:${hours.toString().padStart(2, 0)}:${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`
            timeElement.innerHTML = newTime
            updateTime(days, hours, minutes, seconds)
        }, 1000)

        stopBtn.addEventListener("click", () => {
            clearInterval(intervalWatch)
            started = false
        })

        started = true
    }
})


resetBtn.addEventListener("click", () => {
    clearInterval(intervalWatch)

    days = 0
    hours = 0
    minutes = 0
    seconds = 0
    timeElement.innerHTML = "00:00:00:00"

    updateTime(days, hours, minutes, seconds)
    started = false
})
