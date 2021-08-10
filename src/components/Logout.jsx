import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Profile from './UserProfile';


const Logout = () => {
    const { user, logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
                <Router>
                    <Switch>
                        <Route exact path='/'>
                            <button type="button" id="logoutButton" onClick={() => logout()}>
                                    Logout
                            </button>   
                        
                            <Link href="/userprofile">
                                <img id="navPic" src={user.picture} alt={user.name} />
                            </Link>
                        </Route>
                        <Route path='/user/userprofile'>
                            <Profile />
                        </Route>

                    </Switch>
                </Router>
        )
    )
}

export default Logout;