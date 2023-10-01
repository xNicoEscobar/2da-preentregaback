const socketClient = io();

socketClient.on("sendproducts", (products) => {
    updateProductList(products);
});

function updateProductList(products) {
    let content = document.getElementById("list-products");
    let productos = "";

    products.forEach((product) => {
        productos += `
        <article">
            <div>
            <div>
                <img src="${product.thumbnail}"/>
            </div>
            <div>
                <h2>${product.title}</h2>
                <div>
                    <h3>${product.description}</h3>
                </div>
                <div>
                    <h3>${product.price}</h3>
                </div>
                <a href="#">Comprar</a>
                </div>
            </div>
        </article>`;
    });

    content.innerHTML = productos;
}

let form = document.getElementById("formProduct");
form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    let title = form.elements.title.value;
    let description = form.elements.description.value;
    let stock = form.elements.stock.value;
    let thumbnail = form.elements.thumbnail.value;
    let category = form.elements.category.value;
    let price = form.elements.price.value;
    let code = form.elements.code.value;
    let status = form.elements.status.value;

    socketClient.emit("addProduct", {
        title,
        description,
        category,
        price,
        thumbnail,
        code,
        stock,
        status,
    });

    form.reset();
});