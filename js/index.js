import refreshAccessToken from "./refresh-access-token.js";
const tokenAccessBearer = 'Bearer ' + localStorage.getItem('tokenAccess');
const url = 'https://payment-service-api-production.up.railway.app/api/v2/payment-user/remittance/'
const url_overdue = 'https://payment-service-api-production.up.railway.app/api/v2/payment-user/overdue/'
const container = document.getElementById("card-payment");
const container_overdue = document.getElementById("card-overdue");

async function getPayments() {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': tokenAccessBearer
    }
  };

  try {
    const role = localStorage.getItem('isSuperUser')
    if (role === 'true') {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        //console.log(data.data);
        data.data.forEach((payment) => {
          container.innerHTML += renderPayment(payment);
        });
      }
    } else {
      const id = localStorage.getItem('currentlyIdUser')
      const response = await fetch(url + id, options);
      if (response.ok) {
        const data = await response.json();
        //console.log(data.data);
        data.data.forEach((payment) => {
          container.innerHTML += renderPayment(payment);
        });
      }
    }

    //console.log(response)
    // if (response.ok) {
    //   const data = await response.json();
    //   console.log(data);
    // }
    if (response.status === 401) {
      //await refreshAccessToken();
      console.log('sin permiso');
      //await getPayments();
    }
  } catch (error) {
    //console.error(error);
    //console.log(response.status)

  }
}
function renderPayment(payment) {
  const dateString = payment.payment_date;
  const date = new Date(dateString);
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("es-ES", options).format(date);
  return `
  <div class="card my-2 bg-success-subtle">
  <div class="card-body my-1 py-1 px-5 d-sm-flex align-items-center justify-content-between">
    <div class="text-center">
        <a class="px-5 py-3" href="#" id="navbarDropdownMenuLink" role="button">
            <img src="${payment.service_logo}" class="rounded-circle"
                height="50" alt="Avatar" loading="lazy" />
        </a>
    </div>
    <div class="text-center">
        <h6 class="m-0 px-5 py-3 ">${payment.service_name}</h6>
    </div>
    <div class="text-center">
        <h6 class="m-0 px-5 py-3 ">${formattedDate}</h6>
    </div>
    <div class="text-center">
        <h6 class="m-0 px-5 py-3 ">${payment.amount}</h6>
    </div>
  </div>
  </div>
  `;
}

async function getOverdues() {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': tokenAccessBearer
    }
  };

  try {
    const role = localStorage.getItem('isSuperUser')
    if (role === 'true') {
      const response = await fetch(url_overdue, options);
      if (response.ok) {
        const data = await response.json();
        //console.log(data.data);
        data.data.forEach((overdue) => {
          if (overdue.penalty_fee_amount != null) {
            container_overdue.innerHTML += renderOverdue(overdue);
          }

        });
      }
    } else {
      const id = localStorage.getItem('currentlyIdUser')
      const response = await fetch(url_overdue + id, options);
      if (response.ok) {
        const data = await response.json();
        //console.log(data.data);
        data.data.forEach((overdue) => {
          if (overdue.penalty_fee_amount != null) {
            container_overdue.innerHTML += renderOverdue(overdue);
          }
        });
      }
    }

    //console.log(response)
    // if (response.ok) {
    //   const data = await response.json();
    //   console.log(data);
    // }
    if (response.status === 401) {
      //await refreshAccessToken();
      console.log('sin permiso');
      //await getPayments();
    }
  } catch (error) {
    //console.error(error);
    //console.log(response.status)

  }
}

function renderOverdue(overdue) {
  const dateString = overdue.payment_date;
  const date = new Date(dateString);
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("es-ES", options).format(date);
  return `
  <div class="card my-2 bg-danger-subtle">
                <div class="card-body my-1 py-1 px-5 d-sm-flex align-items-center justify-content-between">
                    <div class="text-center">
                        <a class="px-3 py-3" href="#" id="navbarDropdownMenuLink" role="button">
                            <img src="${overdue.service_logo}" class="rounded-circle"
                                height="50" alt="Avatar" loading="lazy" />
                        </a>
                    </div>
                    <div class="text-center">
                        <h6 class="m-0 px-5 py-3 ">${overdue.service_name}</h6>
                    </div>
                    <div class="text-center">
                        <h6 class="m-0 px-5 py-3 ">${formattedDate}</h6>
                    </div>
                    <div class="text-center">
                        <h6 class="m-0 px-5 py-3 ">${overdue.amount}</h6>
                    </div>
                    <div class="text-center">
                        <h6 class="m-0 px-5 py-3 ">${overdue.penalty_fee_amount}</h6>
                    </div>
                </div>
            </div>
  `;
}


getPayments();
getOverdues();
