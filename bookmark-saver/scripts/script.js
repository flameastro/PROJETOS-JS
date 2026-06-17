const bookmarksSection = document.querySelector(".bookmarks")
const btnAdd = document.querySelector(".add")
btnAdd.addEventListener("click", addBookmark)

function addBookmark() {
    const name = document.querySelector("#bookmark").value
    const url = document.querySelector("#url").value

    bookmarksSection.innerHTML += `
        <div>
            <p><a href="${url}">${name}</a></p>
            <button class="delete"></button>
        </div>
    `

    deleteBookmark()
}

function deleteBookmark() {
    const btnDeletes = document.querySelectorAll(".delete")
    btnDeletes.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.parentNode.remove()
        })
    })
}

deleteBookmark()
