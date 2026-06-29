const url = "https://dummyjson.com/products?limit=500";

const githubSignBtn = document.getElementById("githubSignBtn");
const continueBtn = document.getElementById("continueBtn");
const loginCard = document.getElementById("login-card");
const signOutBtn = document.getElementById("signOutBtn");
const search = document.getElementById("search");
const outer = document.getElementById("outer");

let allProducts = [];

// ================= LOGIN =================

function setSignedIn(value) {
    localStorage.setItem("githubSignedIn", value ? "true" : "false");
}

function isSignedIn() {
    return localStorage.getItem("githubSignedIn") === "true";
}

function updateAuthUI() {
    const signedIn = isSignedIn();

    if (signOutBtn) {
        signOutBtn.classList.toggle("hidden", !signedIn);
    }

    if (loginCard) {
        loginCard.style.display = signedIn ? "none" : "block";
    }
}

function hideLoginCard() {
    if (loginCard) {
        loginCard.style.display = "none";
    }
}

githubSignBtn?.addEventListener("click", () => {
    alert("GitHub Sign In Placeholder");
    setSignedIn(true);
    updateAuthUI();
});

continueBtn?.addEventListener("click", () => {
    hideLoginCard();
});

signOutBtn?.addEventListener("click", () => {
    setSignedIn(false);
    updateAuthUI();
    alert("Signed Out Successfully");
});

updateAuthUI();

// ================= DISPLAY PRODUCTS =================

function displayProducts(products) {

    if (!outer) return;

    outer.innerHTML = "";

    products.forEach((el) => {

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${el.thumbnail}" alt="${el.title}">
            <h3>${el.title}</h3>
            <p>${el.description}</p>

            <div class="btn">
                <h4>₹${Math.round(el.price * 95)}</h4>
                <button class="bt">Add to Cart</button>
            </div>
        `;

        // Card Click
        card.addEventListener("click", () => {
            localStorage.setItem("product", JSON.stringify(el));
            window.location.href = "product.html";
        });

        // Add to Cart
        const btn = card.querySelector(".bt");

        btn.addEventListener("click", (e) => {

            e.stopPropagation();

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            cart.push(el);

            localStorage.setItem("cart", JSON.stringify(cart));

            alert("Product Added Successfully");
        });

        outer.appendChild(card);

    });

}

// ================= FETCH PRODUCTS =================

fetch(url)
    .then((res) => res.json())
    .then((data) => {

        allProducts = data.products;

        displayProducts(allProducts);

    })
    .catch((err) => {
        console.log(err);
    });

// ================= SEARCH =================

if (search) {

    search.addEventListener("input", () => {

        const value = search.value.toLowerCase();

        const filtered = allProducts.filter((product) => {

            return (
                product.title.toLowerCase().includes(value) ||
                product.description.toLowerCase().includes(value) ||
                product.category.toLowerCase().includes(value)
            );

        });

        displayProducts(filtered);

    });

}