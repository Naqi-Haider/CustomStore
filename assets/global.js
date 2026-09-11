class DeleteButton extends HTMLElement {
    constructor() {
        super();
        this.deleteLink = this.querySelector('.remove-btn');
    }

    connectedCallback() {
        console.log("Added to DOM");

        this.deleteLink.addEventListener('click', async (e) => {
            e.preventDefault();
            console.log(this.deleteLink);

            const deleteUrl = this.deleteLink.href;
            try {
                await fetch(deleteUrl);
                document.dispatchEvent(new CustomEvent('refresh:cart'));
                // const data = await response.json();
                // console.log({data});
            } catch (error) {
                console.log(error);
            }
        })
    }
}

customElements.define('delete-button', DeleteButton);

class QuantityInput extends HTMLElement {
    constructor() {
        super();
        this.plusButton = this.querySelector('.plus');
        this.minusButton = this.querySelector('.minus');
        this.qtyInput = this.querySelector('input[type="number"]').valueAsNumber;
        this.variantId = this.dataset.variantId;
        //Or you can get the variant ID from the input field if you prefer
        //this.variantId = this.getAttribute('data-variant-id');
    }

    connectedCallback() {
        console.log("Quantity: ", this.qtyInput);

        this.plusButton.addEventListener('click', async (e) => {
            e.preventDefault();
            console.log("plus");

            const updatedValue = this.qtyInput + 1;
            console.log("Updated Value: ", updatedValue, this.variantId);

            let updates = {
                [this.variantId]: updatedValue
            };

            try {
                const res = await fetch(window.Shopify.routes.root + 'cart/update.js', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ updates })
                })
                // const data = await res.json();
                // console.log("Updated Cart Data: ", data);

                //To refresh the cart:
                document.dispatchEvent(new CustomEvent('refresh:cart'));
                
            } catch (error) {
                console.log("error plus: ",error);
            }
        })

        this.minusButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("minus");
        })
    }
}

customElements.define('quantity-input', QuantityInput);