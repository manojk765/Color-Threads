const openShopping = document.querySelector(".shopping"),
      closeShopping = document.querySelector(".closeShopping"),
      body = document.querySelector("body"),
      list= document.querySelector(".list"),
      listCard = document.querySelector(".listCard"),
      total = document.querySelector(".total"),
      quantity = document.querySelector(".quantity")


openShopping.addEventListener("click", () => {
    body.classList.add("active");
})

closeShopping.addEventListener("click", () => {
    body.classList.remove("active")
})

let products = [
    {
        "id": 1,
        "name": "Free Size Children T Shirt",
        "image":"https://plus.unsplash.com/premium_photo-1691367782367-2bd37f646abc?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODV8fGtpZCUyMHdpdGglMjB0JTIwc2hpcnR8ZW58MHx8MHx8fDA%3D",
        "price": 2000
    },
    {
        "id": 2,
        "name": "White Printed T Shirt",
        "image":"https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAzfHxtYWxlJTIwd2l0aCUyMHQlMjBzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
        "price": 2200
    },
    {
        "id": 3,
        "name": "Unisex White T Shirt",
        "image":"https://images.unsplash.com/photo-1569033083669-a63ea13bc769?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fGZlbWFsZSUyMHdpdGglMjB0JTIwc2hpcnR8ZW58MHx8MHx8fDA%3D",
        "price": 2400
    },
    {
        "id": 4,
        "name": "Pure Whites",
        "image":"https://images.pexels.com/photos/9558724/pexels-photo-9558724.jpeg?auto=compress&cs=tinysrgb&w=600",
        "price": 2600
    },
    {
        "id": 5,
        "name": "Magic Purple",
        "image":"https://images.pexels.com/photos/14798947/pexels-photo-14798947.jpeg?auto=compress&cs=tinysrgb&w=600",
        "price": 1400
    },
    {
        "id": 6,
        "name": "Printed Deep Blue",
        "image":"https://images.unsplash.com/photo-1621951753015-740c699ab970?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHQlMjBzaGlydHN8ZW58MHx8MHx8fDA%3D",
        "price": 1800
    },
    {
        "id": 7,
        "name": "Women's Plane grey",
        "image":"https://images.pexels.com/photos/9558787/pexels-photo-9558787.jpeg?auto=compress&cs=tinysrgb&w=600",
        "price": 2000
    },
    {
        "id": 8,
        "name": "Pure Pink",
        "image":"https://images.pexels.com/photos/9558764/pexels-photo-9558764.jpeg?auto=compress&cs=tinysrgb&w=600",
        "price": 1600
    },
    {
        "id": 9,
        "name": "Pink for Kids",
        "image":"https://images.pexels.com/photos/13327222/pexels-photo-13327222.jpeg?auto=compress&cs=tinysrgb&w=600",
        "price": 2200
    }
]


let listCards = [];

const initApp = () => {
    products.forEach((value, key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
            <img src = "${value.image}">
            <div class = "title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick = "addToCard(${key})">Add To Cart</button>
        `;
        list.appendChild(newDiv)
    })
}

initApp()


const addToCard = key => {
    if(listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        // console.log(listCards);
        listCards[key].quantity = 1;
        // console.log(listCards[key].quantity);
    }

    reloadCard()
}

const reloadCard = () => {
    listCard.innerHTML = "";
    let count = 0;
    let totalPrice= 0;

    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price
        count = count + value.quantity;

        if(value != null) {
            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
                <div><img src = "${value.image}"></div>
                <div class = "cardTitle">${value.name}</div>
                <div class = "cardPrice">${value.price.toLocaleString()}</div>

                <div>
                    <button style = "background-color:#560bad;" class = "cardButton" onclick = "changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class = "count">${value.quantity}</div>
                    <button style = "background-color:#560bad;" class = "cardButton" onclick = "changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
            `
            listCard.appendChild(newDiv)
        }

        total.innerText = totalPrice.toLocaleString();
        quantity.innerText = count;
    })
}


const changeQuantity = (key, quantity) => {
    if(quantity == 0) {
        delete listCards[key]
    }
    else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price
    }
    reloadCard()
}