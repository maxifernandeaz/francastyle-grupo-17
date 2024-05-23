// Wait until de dom is loaded
document.addEventListener("DOMContentLoaded", async () => {
    
    // Create galery variable asociated with the galery item in dom
    const galery = document.getElementById("galery")
    
    // Create the group of classes we need to create new elements in the galery
    const container_item_class = 'galery_container_item'
    const item_container_class = "galery_item"
    const item_image_class = "galery_item_img"
    const item_title_class = "galery_item_title"
    const item_price_class = "galery_item_price"
    
    const get_products = async () => (
        fetch('../mock_products/products.json')
        .then(response => response.json())
        .then(data => {return data})
        .catch(error => console.log(error))
    )

    const mock_products = await get_products()

    for (const product of mock_products){
        
        //Create container item
        const container_item = document.createElement("div")
        container_item.className = container_item_class

        //Create item container
        const item_container = document.createElement("div")
        item_container.className = item_container_class        

        //Create item image
        const item_image = document.createElement("img")
        item_image.className = item_image_class
        item_image.src = product.photo
        item_image.alt = "image product"        

        //Create item title
        const item_title = document.createElement("h3")
        item_title.className = item_title_class 
        item_title.innerHTML = product.title

        //Create item price
        const item_price = document.createElement("h3")
        item_price.className = item_price_class 
        item_price.innerHTML = '$' + product.price
        
        item_container.appendChild(item_image)
        item_container.appendChild(item_price)
        item_container.appendChild(item_title)
        
        container_item.appendChild(item_container)

        galery.appendChild(container_item)
    }
});