document.querySelector('.description-button').addEventListener('click', async () => {
    // Criar loader
    const loader = document.createElement("div");
    loader.classList.add("loader");
    const img_container = document.querySelector('.image-container');
    img_container.childNodes.forEach(element => {
        element.remove();
    });
    img_container.appendChild(loader);
    const description = document.querySelector('.description-input').value;
    if (description) {
        const crsfToken = document.querySelector('[name="csrfmiddlewaretoken"').value;
        let data = new FormData();
        data.append('description', description);
        await fetch('/generate/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': crsfToken
            },
            body: data
        }).then(response => {
            return response.json()
        }).then(data => {
            if (data.url) {
                const img = document.createElement("img");
                img.src = data.url;
                img_container.childNodes.forEach(element => {
                    element.remove();
                });
                img_container.appendChild(img);
            }
        }).catch(error => {
            console.log(error);
        })
    }
})