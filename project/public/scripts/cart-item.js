const cartItemUpdateFormElements = document.querySelectorAll('.cart-item-management');
const cartTotalPriceElement = document.getElementById('cart-total-price');

async function updateCartItem(event) {
    event.preventDefault();

    const form = event.target;

    const productId = form.dataset.procutid;
    const csrfToken = form.dataset.csrf;
    const quantity = form.firstElementChild.value;

    let response;
    try{
        response = await fetch('/cart/item', {
            method: "PATCH",
            body: JSON.stringify({
                productId: productId,
                quantity: quantity,
                _csrf: csrfToken,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch(error) {
        alert('Something went wrong!');
        return;
    } 

    if(!response.ok) {
        alert('Something went wrong!');
        return;
    }

    const responseData = await response.json();
    
    if (responseData.updatedCartData.updatedItemPrice === 0) {
        form.parentElement.remove();
    } else {
        const cartItemPriceElement = document.getElementById('cart-item-price');
        cartItemPriceElement.textContent = responseData.updatedCartData.updatedItemPrice.toFixed(2);
    }

    cartTotalPriceElement.textContent = responseData.updatedCartData.newTotalPrice.toFixed(2);
    
}

for ( const formElement of cartItemUpdateFormElements) {
    formElement.addEventListener('submit', updateCartItem);
}