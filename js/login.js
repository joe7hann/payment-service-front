const form = document.querySelector("form");


form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // const email = emailInput.value;
    // const password = passwordInput.value;
    // 
    const data = {
        email: emailInput.value,
        password: passwordInput.value,
    }
    await fetch("https://payment-service-api-production.up.railway.app/api/v2/users/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(response => {
        // console.log(response);
        return response.json();
    })
        .then(data => {
            // console.log(data.ok)
            if (data.ok) {
                //console.log(data.message);
                //console.log(data.tokens.access);
                const tokenAccess = data.tokens.access;
                const tokenRefresh = data.tokens.refresh;
                const currentlyIdUser = data.id;
                localStorage.setItem('tokenAccess', tokenAccess);
                localStorage.setItem('tokenRefresh', tokenRefresh);
                localStorage.setItem('currentlyIdUser', currentlyIdUser);

                Swal.fire({
                    icon: "success",
                    title: "Logged Successfully",
                    text: "Redirecting",
                    showConfirmButton: false,
                    timer: 1500
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

        });
});
