const addItemButtonElement = document.getElementById('add-item');
const cartQuantityElement = document.getElementById('cart-totalquantity');

async function addItem() {
    const productId = addItemButtonElement.dataset.id;
    const csrfToken = addItemButtonElement.dataset.csrf;
    let response;

    try {
        response = await fetch('/cart/item', {
            method: 'POST',
            body: JSON.stringify({
                productId: productId,
                _csrf: csrfToken,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch(error) {
        alert('error');
        return;
    }

    if(!response.ok) {
        alert('error');
        return;
    }

    const responseData = await response.json();
    cartQuantityElement.textContent = responseData.newTotalItems;
}

addItemButtonElement.addEventListener('click', addItem);