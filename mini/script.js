const url = "https://dummyjson.com/products?limit=500";
const githubSignBtn = document.getElementById('githubSignBtn');
const continueBtn = document.getElementById('continueBtn');
const loginCard = document.getElementById('login-card');
const signOutBtn = document.getElementById('signOutBtn');

function setSignedIn(value) {
    localStorage.setItem('githubSignedIn', value ? 'true' : 'false');
}

function isSignedIn() {
    return localStorage.getItem('githubSignedIn') === 'true';
}

function updateAuthUI() {
    const signedIn = isSignedIn();
    if (signOutBtn) {
        signOutBtn.classList.toggle('hidden', !signedIn);
    }
    if (loginCard) {
        loginCard.style.display = signedIn ? 'none' : 'block';
    }
}

function hideLoginCard() {
    if (loginCard) {
        loginCard.style.display = 'none';
    }
}

githubSignBtn?.addEventListener('click', () => {
    alert('GitHub sign-in placeholder. Implement OAuth to connect your app.');
    setSignedIn(true);
    updateAuthUI();
});

continueBtn?.addEventListener('click', () => {
    hideLoginCard();
});

signOutBtn?.addEventListener('click', () => {
    setSignedIn(false);
    updateAuthUI();
    alert('Signed out successfully.');
});

updateAuthUI();

fetch(url)
    .then((res) => res.json())
    .then((data) => {
        const products = data.products;
        const productsContainer = document.getElementById('products') || document.body;
        const outer = document.createElement('div');
        outer.id = 'outer';
        productsContainer.append(outer);

        products.forEach((el) => {
            const card = document.createElement('div');
            card.innerHTML = `
                <div class="card">
                    <img src="${el.thumbnail}" alt="${el.title}">
                    <h3>${el.title}</h3>
                    <p>${el.description}</p>
                    <div class="btn">
                        <h4>Price: ${Math.ceil(el.price * 95)}</h4>
                        <button class="bt">Add to Cart</button>
                    </div>
                </div>
            `;
            card.style.border = '1px solid black';
            card.style.width = '300px';
            card.style.margin = '10px';
            card.style.padding = '10px';
            card.style.textAlign = 'center';
            card.style.borderRadius = '30px';
            outer.append(card);
            card.onclick = () => {
                localStorage.setItem('product', JSON.stringify(el));
                window.location.href = 'product.html';
            };
        });
    })
    .catch((err) => {
        console.log(err);
    });

