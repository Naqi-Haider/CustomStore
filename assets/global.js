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