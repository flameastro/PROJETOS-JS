let tableAdd = document.querySelector(".table-add")
let id = tableAdd.childElementCount + 1


function getItems() {
    const items = JSON.parse(localStorage.getItem("movies"))
    if (items) {
        const newItems = []
        for (let item of items) {
            tableAdd = document.querySelector(".table-add")
            id = tableAdd.childElementCount + 1

            displayTable(id, item.title, item.gender, item.gradeChar)

            item.id = id
            newItems.push(item)
        }

        localStorage.setItem("movies", JSON.stringify(newItems))
        deleteMovie()
    }
}

getItems()


function displayTable(id, title, gender, grade) {
    const tableAdd = document.querySelector(".table-add")
    tableAdd.innerHTML += `
                <tr>
                    <th scope="row">${id}</th>
                    <td>${title}</td>
                    <td>${gender}</td>
                    <td>${grade}</td>
                    <td>
                        <div class="table-option table-delete" title="Deletar esse filme da tabela"><span class="material-symbols-outlined">close</span></div>
                    </td>
                </tr>
            `
}


function createNewMovie() {
    id = tableAdd.childElementCount + 1
    const title = document.querySelector("#title").value
    const gender = document.querySelector("#gender").value
    const grade = parseInt(document.querySelector("#grade").value)
    let gradeChar = ""
    for (let i = 0; i < grade; i++) {
        gradeChar += "⭐"
    }

    if ((title && title.length > 0) && (gender && gender.length > 0) && (grade && grade > 0 && grade <= 5)) {
        displayTable(id, title, gender, gradeChar)

        let listMovies = JSON.parse(localStorage.getItem("movies"))
        let newMovie = {
            "id": id,
            "title": title,
            "gender": gender,
            "gradeChar": gradeChar
        }

        if (listMovies) {
            listMovies.push(newMovie)
        } else {
            listMovies = [newMovie]
        }

        localStorage.setItem("movies", JSON.stringify(listMovies))
        deleteMovie()
    } else {
        alert("Preencha todos os campos corretamente")
    }
}


function deleteMovie() {
    const btnsDelete = document.querySelectorAll(".table-delete")
    let tableAdd = document.querySelector(".table-add")

    btnsDelete.forEach(btn => {
        btn.addEventListener("click", () => {
            let elementId = btn.parentNode.parentNode.firstElementChild.innerText
            let items = JSON.parse(localStorage.getItem("movies"))
            let newItems = []

            items.map(item => {
                if (item.id != elementId) {
                    newItems.push(item)
                }
            })

            localStorage.setItem("movies", JSON.stringify(newItems))
            location.reload()
        })
    })
}

const bntAdd = document.querySelector(".add")
bntAdd.addEventListener("click", createNewMovie)

window.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        createNewMovie()
    }
})
