import { Link, NavLink } from "react-router-dom";
import { navLinks } from "../../../constants/constants";
import bookStoreLogo from "../../../assets/images/BookStore_Logo.png";
import hamburgerMenuLogo from "../../../assets/icons/hamburger-menu.svg";
import xMenuLogo from "../../../assets/icons/x-menu.svg";
import { useState } from "react";

export const Navbar = () => {

    const [hamburgerMenuClicked, setHamburgerMenuClicked] = useState(false);

    return (

        <header className="max-lg:bg-teal-200 bg-white z-10 w-full h-[70px] fixed top-0">

            <nav className="flex justify-between items-center max-container h-[100%] px-6 gap-5 ">

                <NavLink to="/" className="flex items-center gap-3">

                    <img src={bookStoreLogo} alt="logo" width={70} height={70} />
                    <p className="text-2xl whitespace-nowrap">Book Store</p>

                </NavLink>

                <div className={`${!hamburgerMenuClicked && "max-lg:hidden"} nav-menu max-lg:origin-right max-lg:animate-open-menu`}>

                    {navLinks.map(
                        
                        (link) => (

                            <NavLink className={({ isActive }) => (isActive && "bg-teal-100 shadow-custom lg:shadow-md") + " nav-link"}
                                to={link.href} key={link.id} onClick={() => setHamburgerMenuClicked(false)}>

                                {link.title}

                            </NavLink>
                            
                        )
                        
                    )}

                    <Link to={"/login"} className="btn-main lg:hidden mt-4 bg-teal-300 px-10 hover:bg-teal-200">
                        
                        Sign In

                    </Link>

                </div>

                <Link to={"/login"} className="max-lg:hidden btn-main">
                    
                    Sign In
                
                </Link>

                <button className="rounded-lg p-1 hidden max-lg:block" onClick={() => setHamburgerMenuClicked(!hamburgerMenuClicked)}>
                    
                    <img src={hamburgerMenuClicked ? xMenuLogo : hamburgerMenuLogo} alt="menu" width={40} height={40} />

                </button>

            </nav>
            
        </header>

    )
}