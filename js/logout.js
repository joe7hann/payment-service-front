const logoutButton = document.getElementById('logout-button');
  logoutButton.addEventListener('click', logout);

  function logout() {
    localStorage.clear();
    //localStorage.removeItem('tokenAccess');
    window.location = '/login.html';
  }