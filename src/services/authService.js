import jwtDecode from "jwt-decode";
const tokenKey = "token";
export function logout() {
    localStorage.removeItem(tokenKey);
}
export function authUser() {
    try {
        let jwt = localStorage.getItem("token");
        return jwtDecode(jwt);
    } catch (ex) {
        return null
    }
}
export function getJwt() {
    return localStorage.getItem("token");
}
export default {
    logout,
    authUser,
    getJwt
}