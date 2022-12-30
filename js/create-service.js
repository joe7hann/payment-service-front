const tokenAccessBearer = 'Bearer ' + localStorage.getItem('tokenAccess');
const url = 'https://payment-service-api-production.up.railway.app/api/v2/services/'


async function importServices() {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': tokenAccessBearer
        }
    };

    const response = await fetch(url, options);
    if (response.ok) {
        const data = await response.json();
        console.log(data.results);
        const nameInput = document.getElementById('modifyServiceInput');
        const logoInput = document.getElementById('modifyLogoInput');
        const select = document.getElementById('modifySelectInput');

        let optionsHTML = '<option selected>Select Service to Modify</option>';
        for (const item of data.results) {
            optionsHTML += `
          <option value="${item.id}">${item.name}</option>
        `;
        }

        select.innerHTML = optionsHTML;

        
    } else {
        throw new Error('Error getting items data');
    }

}

importServices();




const form = document.querySelector("form");


form.addEventListener("submit", async (event) => {
    event.preventDefault();


    const data = {
        name: serviceInput.value,
        description: 'Sin descripcion',
        logo: logoInput.value
    }
    console.log(data);
    await fetch('https://payment-service-api-production.up.railway.app/api/v2/services/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': tokenAccessBearer
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok) {

            Swal.fire({
                icon: "success",
                title: "Service added successfully",
                text: "Redirecting",
                showConfirmButton: false,
                timer: 3000
            })

            window.location = '/index.html';


        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: data.message,
                showConfirmButton: true,
                timer: 3000
            })
        }
    })
        .then(data => {
            // console.log(data)


        });
});
