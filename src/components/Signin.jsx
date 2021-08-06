import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Signin = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <li>
                <button id="signinButton" onClick={() => loginWithRedirect()}>
                    Sign In
                </button>
            </li>
        )
    );
};

export default Signin;