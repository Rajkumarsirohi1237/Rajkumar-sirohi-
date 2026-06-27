let product = JSON.parse(localStorage.getItem("product"));
console.log(product);

if (!product) {
    document.getElementById("detail").innerHTML =
        "<h2>No product found</h2>";
} else {

    let url = `https://dummyjson.com/products/${product.id}`;

    fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let cards=document.getElementById("detail").innerHTML = `
                
                <img src="${data.thumbnail}" 
                     alt="${data.title}" 
                     width="250">
                     <div class="button">
                     <button class="cart-btn">Add to Cart</button>

                   <button class="buy-btn">Buy Now</button>
                   </div>

                <h1>${data.title}</h1>

                <p>${data.description}</p>

                <h3>Category: ${data.category}</h3>

                <h3>Brand: ${data.brand}</h3>

                <h3>Price: $${data.price}</h3>

                <h3>Discount: ${data.discountPercentage}%</h3>

                <h3>Rating: ${data.rating}</h3>

                <h3>Stock: ${data.stock}</h3>

                <h3>Tags: ${data.tags.join(", ")}</h3>

                <h3>Warranty: ${data.warrantyInformation}</h3>

                <h3>Shipping: ${data.shippingInformation}</h3>

                <h3>Status: ${data.availabilityStatus}</h3>

                <h2>Reviews</h2>

                ${data.reviews.map((review) => `
                    <div>
                        <h4>${review.reviewerName}</h4>
                        <p>Rating: ${review.rating} ⭐</p>
                        <p>${review.comment}</p>
                    </div>
                
                `).join("")}
                

                
            `;
            

        })
        .catch((err) => {
            console.log(err);
        });
}