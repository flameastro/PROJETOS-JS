const bookmarksSection = document.querySelector(".bookmarks")
const btnAdd = document.querySelector(".add")
btnAdd.addEventListener("click", addBookmark)

let bookmarks = []
function getPreviousBookmarks() {
    let getBookmarks = JSON.parse(localStorage.getItem("bookmarks"))
    let id = 1

    if (getBookmarks) {
        for (let bookmark of getBookmarks) {
            bookmark.id = id
            bookmarks.push(bookmark)

            bookmarksSection.innerHTML += `
                <div id="${id}">
                    <span><a href="${bookmark.url}" target="_blank">${bookmark.name}</a></span>
                    <button type="button" class="delete btn btn-danger">Delete</button>
                </div>
            `

            id++
        }
    }
}

getPreviousBookmarks()


function addBookmark() {
    const name = document.querySelector("#bookmark").value
    const url = document.querySelector("#url").value
    let id = bookmarksSection.childElementCount+1

    if ((name.length > 0 && name.length <= 50) && (url.length > 0)) {
        bookmarksSection.innerHTML += `
            <div id="${id}">
                <span><a href="${url}" target="_blank">${name}</a></span>
                <button type="button" class="delete btn btn-danger">Delete</button>
            </div>
        `

        let newBookmark = {
            "id": id,
            "name": name,
            "url": url
        }

        bookmarks.push(newBookmark)
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks))

        deleteBookmark()
    } else {
        alert("The name length need to be greather than 0 and less or equal than 50")
    }
}


function deleteBookmark() {
    let newBookmark = []

    const btnsDelete = document.querySelectorAll(".delete")
    btnsDelete.forEach(btn => {
        btn.addEventListener("click", () => {
            let btnId = btn.parentNode.id
            for (let bookmark of bookmarks) {
                if (btnId != bookmark.id) {
                    newBookmark.push(bookmark)
                }
            }

            localStorage.setItem("bookmarks", JSON.stringify(newBookmark))
            location.reload()
        })
    })
}

deleteBookmark()
