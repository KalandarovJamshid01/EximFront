function getCookie(name) {
    let foundCookie = false;
    document.cookie.split(';').map(cookie => {
        if (cookie.split('=')[0].includes(name)) foundCookie = cookie.split('=')[1];
    });
    return foundCookie;
}

export default getCookie;