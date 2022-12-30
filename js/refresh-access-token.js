// refresh-access-token.js

async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('tokenRefresh'); // retrieve refresh token from local storage
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            refresh: refreshToken
        })
    };

    try {
        const response = await fetch('https://payment-service-api-production.up.railway.app/api/v2/users/jwt/refresh/', options);
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('tokenAccess', data.access); // save new access token to local storage
            //localStorage.setItem('tokenRefresh', data.refresh_token); // save new refresh token to local storage
        } else {
            throw new Error('Error refreshing access token');
        }
    } catch (error) {
        console.error(error);
    }
}

export default refreshAccessToken;

