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
    try {
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            //console.log(data.results);
            let optionsHTML = '<option selected>Add Service</option>';
            for (const item of data.results) {
                optionsHTML += `
          <option value="${item.id}">${item.name}</option>
        `;
            }
            document.getElementById('serviceInput').innerHTML = optionsHTML;
        } else {
            throw new Error('Error getting items data');
        }
    } catch (error) {
        console.error(error);
    }
}

importServices();


const form = document.querySelector("form");


form.addEventListener("submit", async (event) => {
    event.preventDefault();


    const data = {
        expiration_date: '2022-11-07T20:00:00Z',
        payment_date: expirationDateInput.value,
        service: serviceInput.value,
        amount: amountInput.value,
        user: localStorage.getItem('currentlyIdUser')
    }
    console.log(data);
    await fetch("https://payment-service-api-production.up.railway.app/api/v2/payment-user/", {
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
                title: "Payment added successfully",
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
