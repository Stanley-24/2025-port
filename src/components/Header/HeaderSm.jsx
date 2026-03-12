import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { LuMenu } from "react-icons/lu";
import { NavLink, useNavigate } from "react-router-dom";

const HeaderSm = ({isHomePage}) => {
    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
    const navigate = useNavigate();

    return (
        <header className="w-full border-b border-lite-gray/20 h-16 flex lg:hidden items-center sticky top-0 z-50 bg-main-dark-bg">
            <div className="h-full w-full flex justify-between items-center px-4 relative">
                <h1 
                    className="text-white-shade font-bold amatic-sc-bold text-lg"
                    onClick={() => navigate("/")}
                >STANLEY OWARIETA<span className="text-goldmeat text-3xl">...</span></h1>

                <div>
                    <button 
                        className="border border-white-shade/30 p-1.5 rounded"
                        onClick={() => setIsMobileMenuVisible(prev => !prev)}
                    > 
                        {
                            isMobileMenuVisible ? 
                            <IoMdClose className="text-white/70 text-lg" /> : <LuMenu className="text-white/70 text-lg" />
                        }
                    </button>

                    {
                        isMobileMenuVisible &&
                        <nav 
                            className="absolute left-0 top-full px-4 flex flex-col gap-8 justify-top items-center mt-3 bg-dark-bg w-full max-w-[10rem] h-[calc(100vh-2rem)] border-r border-white-shade/5 shadow-lg"
                        >
                            <ul className="flex flex-col gap-4 items-center">
                                <li>
                                    <NavLink 
                                        to="/" 
                                        className={({ isActive }) =>
                                            isActive ? "text-goldmaize capitalize" : "text-white capitalize hover:text-goldmeat duration-100"
                                        }
                                    >
                                        home
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink 
                                        to="/services" 
                                        className={({ isActive }) =>
                                            isActive ? "text-goldmaize capitalize" : "text-white capitalize hover:text-goldmeat duration-100"
                                        }
                                    >
                                        my services
                                    </NavLink>

                                    
                                </li>

                                        
                                {
                                    isHomePage && 
                                    <>
                                        <li><NavLink to="/#projects" className="text-white capitalize hover:text-goldmeat duration-100">projects</NavLink></li>

                                        <li><NavLink to="/#contact" className="text-white capitalize hover:text-goldmeat duration-100">contact</NavLink></li>
                                    </>
                                }

                                <li>
                                    <NavLink 
                                        to="/about" 
                                        className={({ isActive }) =>
                                            isActive ? "text-goldmaize capitalize" : "text-white capitalize hover:text-goldmeat duration-100"
                                        }
                                    >
                                        about
                                    </NavLink>

                                    
                                </li>


                            
                            </ul>

                            <div className="flex gap-4">
                                <a href="https://github.com/Stanley-24" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile link"> 
                                    <FaGithub className="text-lite-gray/80 text-xl hover:text-goldmeat duration-100" /> 
                                </a>
            
                                <a href="https://www.linkedin.com/in/stanley-owarieta/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile link"> 
                                    <FaLinkedin className="text-lite-gray/80 text-xl hover:text-goldmeat duration-100" /> 
                                </a>

                                <a href="https://x.com/Stanley_24_" target="_blank" rel="noopener noreferrer" aria-label="X profile link"> 
                                    <FaX className="text-lite-gray/80 text-xl hover:text-goldmeat duration-100" /> 
                                </a>
                            </div>
                        </nav>
                    }
                </div>
            </div>
        </header>
    )
}

export default HeaderSm;