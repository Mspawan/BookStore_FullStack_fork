import { NavLink } from "react-router-dom";
import { navLinks } from "../../../constants/constants";
import bookStoreLogo from "../../../assets/images/BookStore_Logo.png";
import hamburgerMenuLogo from "../../../assets/icons/hamburger-menu.svg";
import xMenuLogo from "../../../assets/icons/x-menu.svg";
import { useState } from "react";

export const Navbar = () => {

    const [hamburgerMenuClicked, setHamburgerMenuClicked] = useState(false);

    return (

        <header className="max-lg:bg-teal-200 z-10 w-full h-[70px] fixed">

            <nav className="flex justify-between items-center max-container h-[100%] px-6 gap-5 ">

                <NavLink to="/" className="flex items-center gap-3">

                    <img src={bookStoreLogo} alt="logo" width={70} height={70} />
                    <p className="text-3xl text-teal-700 whitespace-nowrap">Book Store</p>

                </NavLink>

                <div className={`${!hamburgerMenuClicked && "max-lg:hidden"} fixed top-[70px] right-0 lg:static flex-1 flex flex-col lg:flex-row gap-1 w-full lg:max-w-[800px] justify-between items-center py-7 lg:py-0 lg:px-7 max-lg:bg-teal-100 max-lg:origin-right max-lg:animate-open-menu`}>

                    {navLinks.map(
                        
                        (link) => (
                                
                            <NavLink className="duration-200 text-lg max-lg:w-full px-3 py-1 max-lg:py-4 hover:lg:bg-teal-100 text-teal-700 whitespace-nowrap hover:shadow-md lg:rounded-md max-lg:text-center"
                                to={link.href} key={link.id} onClick={() => setHamburgerMenuClicked(false)}>
                                
                                {link.title}

                            </NavLink>
                        )
                        
                    )}

                    <button className="lg:hidden mt-4 bg-teal-300 rounded-md py-3 px-10 text-lg text-teal-700 hover:shadow-lg hover:bg-teal-200 active:shadow-none duration-200 whitespace-nowrap border-teal-700 border">
                        
                        Sign In

                    </button>

                </div>

                <button className="max-lg:hidden bg-teal-100 rounded-md py-2 px-5 text-lg text-teal-700 hover:shadow-lg hover:bg-teal-100 active:shadow-none duration-200 whitespace-nowrap border-teal-700 border">
                    
                    Sign In
                
                </button>

                <button className="rounded-lg p-1 hidden max-lg:block" onClick={() => setHamburgerMenuClicked(!hamburgerMenuClicked)}>
                    
                    <img src={hamburgerMenuClicked ? xMenuLogo : hamburgerMenuLogo} alt="menu" width={40} height={40} />

                </button>

            </nav>
            
        </header>

    )
}