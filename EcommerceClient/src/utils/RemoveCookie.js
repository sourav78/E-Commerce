import Cookies from 'js-cookie'

const RemoveCookie = (cookieName) => {
    return Cookies.remove(cookieName, {
        path: '/'
    });
}

export default RemoveCookie