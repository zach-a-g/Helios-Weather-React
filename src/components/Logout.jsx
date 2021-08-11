import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Logout = () => {
    const { user, logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <>
                <button type="button" id="logoutButton" onClick={() => logout()}>
                        Logout
                </button>   
            
                <img id="navPic" src={user.picture} alt={user.name} />
            </>
        )
    )
}

export default Logout;