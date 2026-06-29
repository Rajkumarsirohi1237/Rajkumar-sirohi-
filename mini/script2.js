let product = JSON.parse(localStorage.getItem("product"));

if (!product) {
    document.getElementById("detail").innerHTML =
        "<h2>No Product Found</h2>";
} else {

    let url = `https://dummyjson.com/products/${product.id}`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {

            document.getElementById("detail").innerHTML = `

                <img src="${data.thumbnail}" alt="${data.title}">

                <div class="button">
                    <button class="cart-btn">Add to Cart</button>
                    <button class="buy-btn">Buy Now</button>
                </div>

                <h1>${data.title}</h1>

                <p>${data.description}</p>

                <h3>Category : ${data.category}</h3>

                <h3>Brand : ${data.brand}</h3>

                <h3>Price : ₹${Math.round(data.price * 95)}</h3>

                <h3>Discount : ${data.discountPercentage}%</h3>

                <h3>Rating : ⭐ ${data.rating}</h3>

                <h3>Stock : ${data.stock}</h3>

                <h3>Warranty : ${data.warrantyInformation}</h3>

                <h3>Shipping : ${data.shippingInformation}</h3>

                <h3>Status : ${data.availabilityStatus}</h3>

                <h2>Reviews</h2>

                ${data.reviews.map(review => `
                    <div class="review">
                        <h4>${review.reviewerName}</h4>
                        <p>⭐ ${review.rating}</p>
                        <p>${review.comment}</p>
                    </div>
                `).join("")}

            `;

            // Add To Cart
            const cartBtn = document.querySelector(".cart-btn");

            cartBtn.addEventListener("click", () => {

                let cart = JSON.parse(localStorage.getItem("cart")) || [];

                const existing = cart.find(item => item.id === data.id);

                if (existing) {
                    existing.quantity = (existing.quantity || 1) + 1;
                } else {
                    data.quantity = 1;
                    cart.push(data);
                }

                localStorage.setItem("cart", JSON.stringify(cart));

                alert("Product Added To Cart");
            });

            // Buy Now
            const buyBtn = document.querySelector(".buy-btn");

            buyBtn.addEventListener("click", () => {

                let cart = [];
                data.quantity = 1;
                cart.push(data);

                localStorage.setItem("cart", JSON.stringify(cart));

                window.location.href = "cart.html";
            });

        })
        .catch((err) => {
            console.log(err);
        });

}