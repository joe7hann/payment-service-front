function gettingUsername() {
    const anchor = document.getElementById('currentUser');
    anchor.innerHTML = localStorage.getItem('currentlyUsername');
    //console.log('jasdasd')
}

function gettingAccess() {
    const role = localStorage.getItem('isSuperUser')
    if (role === 'true') {
        console.log('es admin')
        const container = document.getElementById('adminDashboard');
        const item = `<a class="nav-link" href="./create-service.html">Service(Admin)</a>`
        container.innerHTML += item;
    } else {
        console.log('no es admin')
    }
}


gettingAccess();
gettingUsername();
