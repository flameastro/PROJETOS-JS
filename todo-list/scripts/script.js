const tasksSection = document.querySelector(".tasks")
let tasks = []
let getTasks = localStorage.getItem("tasks")

if (getTasks) {
    for (let task of JSON.parse(getTasks)) {
        let id = tasksSection.childElementCount + 1

        task["id"] = id

        tasks.push(task)
        tasksSection.innerHTML += `
                    <article id="${id}">
                        <div>
                            <p>${task.name}</p>
                        </div>

                        <div>
                            <p>${task.date}</p>
                        </div>

                        <div>
                            <button class="delete">Delete</button>
                        </div>
                    </article>
                `

        deleteButtons()
    }
}

const addBtn = document.querySelector(".add")
addBtn.addEventListener("click", addTask)
function addTask() {
    let id = tasksSection.childElementCount + 1
    const name = document.querySelector("#name").value
    const date = document.querySelector("#date").value

    if (name && date) {
        tasksSection.innerHTML += `
                    <article id="${id}">
                        <div>
                            <p>${name}</p>
                        </div>
    
                        <div>
                            <p>${date}</p>
                        </div>
    
                        <div>
                            <button class="delete">Delete</button>
                        </div>
                    </article>
                `

        deleteButtons()

        let newTask = {
            "id": id,
            "name": name,
            "date": date
        }

        tasks.push(newTask)
        localStorage.setItem("tasks", JSON.stringify(tasks))
    } else {
        alert("Fill all the spaces")
    }
}

function deleteButtons() {
    const deleteBtns = document.querySelectorAll(".delete")
    deleteBtns.forEach(btn => {
        const btnArticle = btn.parentNode.parentNode
        btn.addEventListener("click", () => {
            btnArticle.remove()
            tasks = tasks.filter(task => task.id != btnArticle.id)
            localStorage.setItem("tasks", JSON.stringify(tasks))
        })
    })
}

window.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        addTask()
    }
})
