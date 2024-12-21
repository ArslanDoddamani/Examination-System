import Cookies from "js-cookie";

function loggedIn(){
    const token = Cookies.get("token"); // Get the token from cookies
    return !!token; // Return true if token exists, else false
};

export const isLoggedIn = loggedIn();
