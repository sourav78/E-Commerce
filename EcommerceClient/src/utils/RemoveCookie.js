import Cookies from 'js-cookie'

const RemoveCookie = (cookieName) => {
    return Cookies.remove(cookieName, {
        path: '/', // Specify the path if it was set when the cookie was created
        domain: 'https://s78-store.vercel.app', // Uncomment and set the domain if it was set when the cookie was created
        secure: true, // Uncomment if the cookie was set with the secure flag
        sameSite: 'Strict' // Uncomment if the cookie was set with the sameSite attribute
    });
}

export default RemoveCookie