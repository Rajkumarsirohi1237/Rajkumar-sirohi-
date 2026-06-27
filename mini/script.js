let url=" https://dummyjson.com/products?limit=500"
fetch(url)
.then((res)=>{
    return res.json()
})
.then((data)=>{
    let  products=data.products;

    let outer=document.createElement("div");
    outer.id="outer";
    document.body.append(outer);

    products.map((el)=>{
        let card=document.createElement("div");
        card.innerHTML=`
        <div class="card">
            <img src=${el.thumbnail} alt="">
            <h3>${el.title}</h3>
            <p>${el.description}</p>
            <div class="btn">
            <h4>Price: ${Math.ceil(el.price*95)}</h4>
            <button class="bt">Add to Cart</button>
            </div>
        </div>
        `
        card.style.border="1px solid black";
        card.style.width="300px";
        card.style.margin="10px";
        card.style.padding="10px";
        card.style.textAlign="center";
        card.style.borderRadius="30px";
        outer.append(card);
        card.onclick=()=>{
            localStorage.setItem("product",JSON.stringify(el));
            window.location.href="product.html";
        };
    })


})
.catch((err)=>{
    console.log(err)
})

