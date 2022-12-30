//const tokenRefresh = localStorage.getItem('tokenRefresh');

function isLoggedIn() {
  const tokenAccess = localStorage.getItem('tokenAccess');
  console.log('logeado');
  return tokenAccess;
}


function redirectIfNotLoggedIn() {
  if (!isLoggedIn()) {
    window.location = '/login.html';
  }
}

async function retrievingDataFromCurrentUser() {
  const IdUser = localStorage.getItem('currentlyIdUser');
  try {
    const response = await fetch('https://payment-service-api-production.up.railway.app/api/v2/users/' + IdUser);
    if (response.ok) {
      const data = await response.json();
      //console.log(data);
      const isSuperUser = data.is_superuser;
      localStorage.setItem('isSuperUser', isSuperUser);
      const currentlyUsername = data.username;
      localStorage.setItem('currentlyUsername', currentlyUsername);
      
      // const anchor = document.getElementById('currentUser');
      // anchor.innerHTML = data.username;
      //currentUser
      
    } else {
      throw new Error('Error getting data');
    }
    location.reload(false);
  } catch (error) {
    console.error(error);
  }
}

if (!localStorage.getItem('currentlyUsername')) {
  retrievingDataFromCurrentUser();
  //console.log('hola');
}


redirectIfNotLoggedIn();

