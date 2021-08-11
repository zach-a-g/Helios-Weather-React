import React from "react";
// import Signin from "./Signin";
// import Logout from "./Logout";

const NavBar = () => {

    return (
        <nav id="navbar">
            <div id="navWidth">
                <div id="navLogo">
                    <a href="/">
                        <h1><i class="fas fa-sun"></i> Helios Weather</h1>
                    </a>
                </div>
                <div id="navBarRight">
                    <ul>
                        
                        <li id="navLinks">
                            {/* <Signin /> */}
                        </li>

                        <li id="navLinks">
                            <a id="homeNav" href="/">
                                Home
                            </a>
                        </li>
                        
                        <li id="navLinks">
                            {/* <Logout /> */}
                        </li>
                
                    </ul>
                </div>
            </div>
        </nav>
    )
}  

export default NavBar;