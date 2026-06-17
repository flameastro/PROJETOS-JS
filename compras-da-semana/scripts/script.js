const productsSection = document.querySelector(".products")


function getProducts() {
    let products = JSON.parse(localStorage.getItem("products"))
    if (!products) {
        products = []
    }

    return products
}


function displayProducts() {
    let products = getProducts()

    for (let product of products) {
        productsSection.innerHTML += `
            <li>${product}</li>
        `
    }
}

function addNewProduct() {
    let products = getProducts()
    const product = document.querySelector("#product").value

    if (product.length > 0 && product.length <= 75) {
        productsSection.innerHTML += `
            <li>${product}</li>
        `

        products.push(product)
        localStorage.setItem("products", JSON.stringify(products))
    } else {
        alert("O campo de produto precisa ter de 1 a 75 caracteres")
    }
}

function clearProducts() {
    productsSection.innerHTML = ""
    let products = []

    localStorage.setItem("products", JSON.stringify(products))
    location.reload()
}

displayProducts()


const btnAdd = document.querySelector(".add")
btnAdd.addEventListener("click", addNewProduct)

window.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        addNewProduct()
    }
})

const btnClear = document.querySelector(".clear")
btnClear.addEventListener("click", clearProducts)
