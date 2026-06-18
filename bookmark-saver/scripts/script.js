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

            let categoryExists = false
            for (let article of bookmarksSection.children) {
                if (article.getAttribute("class") == bookmark.category) {
                    categoryExists = true
                    article.innerHTML += `
                        <div id="${bookmark.id}">
                            <span><a href="${bookmark.url}" target="_blank">${bookmark.name}</a></span>
                            <button type="button" class="delete btn btn-danger">Delete</button>
                        </div>
                    `
                }
            }

            if (!categoryExists) {
                bookmarksSection.innerHTML += `
                    <article class="${bookmark.category}">
                        <h2>${bookmark.category}</h2>
                        <div id="${bookmark.id}">
                            <span><a href="${bookmark.url}" target="_blank">${bookmark.name}</a></span>
                            <button type="button" class="delete btn btn-danger">Delete</button>
                        </div>
                    </article>
                `
            }

            id++
        }
    }
}

getPreviousBookmarks()


function addBookmark() {
    const category = document.querySelector("#category").value
    const name = document.querySelector("#bookmark").value
    const url = document.querySelector("#url").value
    let id = bookmarksSection.childElementCount+1
    let categoryExists = false

    for (let article of bookmarksSection.children) {
        if (article.getAttribute("class").toLowerCase() == category.toLowerCase()) {
            categoryExists = true
            article.innerHTML += `
                <div id="${id}">
                    <span><a href="${url}" target="_blank">${name}</a></span>
                    <button type="button" class="delete btn btn-danger">Delete</button>
                </div>
            `
        }
    }

    if (!categoryExists) {
        bookmarksSection.innerHTML += `
            <article class="${category.toLowerCase()}">
                <h2>${category.toLowerCase()}</h2>

                <div id="${id}">
                    <span><a href="${url}" target="_blank">${name}</a></span>
                    <button type="button" class="delete btn btn-danger">Delete</button>
                </div>
            </article>
        `
    }

    let newBookmark = {
        "id": id,
        "category": category.toLowerCase(),
        "name": name,
        "url": url
    }

    bookmarks.push(newBookmark)
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))

    deleteBookmark()
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
