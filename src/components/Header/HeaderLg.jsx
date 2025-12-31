import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { NavLink, useNavigate } from "react-router";

const HeaderLg = ({isHomePage}) => {
    const navigate = useNavigate();

    return (
        <header className="w-full border-b border-lite-gray/20 h-16 hidden lg:flex items-center sticky top-0 z-50 bg-dkblack">
            <div className="container h-full flex justify-between items-center">
                <h1 
                    className="text-white-shade font-bold  cursor-pointer amatic-sc-bold text-3xl"
                    onClick={() => navigate("/")}
                >
                    STANLEY OWARIETA<span className="text-goldmeat text-4xl">...</span>
                </h1>

                <nav className="flex gap-8">
                    <NavLink 
                        to="/" 
                        className={({ isActive }) =>
                            isActive ? "text-goldmaize capitalize" : "text-white capitalize hover:text-goldmeat duration-100"
                        }
                    >
                        home
                    </NavLink>


                    {
                        isHomePage && 
                        <>
                            <a href="#projects" className="text-white capitalize hover:text-goldmaize duration-100">projects</a>
                            <a href="#contact" className="text-white capitalize hover:text-goldmeat duration-100">contact</a>
                        </>
                    }

                    <NavLink 
                        to="/about" 
                        className={({ isActive }) =>
                            isActive ? "text-goldmaize capitalize" : "text-white capitalize hover:text-goldmeat duration-100"
                        }
                    >
                        about
                    </NavLink>
                    
                    
                </nav>

                <div className="flex gap-4">
                    <a href="https://github.com/Stanley-24" target="_blank"> 
                        <FaGithub className="text-lite-gray/80 text-xl hover:text-goldmeat duration-100" /> 
                    </a>

                    <a href="https://www.linkedin.com/in/stanley-owarieta/" target="_blank"> 
                        <FaLinkedin className="text-lite-gray/80 text-xl hover:text-goldmeat duration-100" /> 
                    </a>

                    <a href="https://x.com/Stanley_24_" target="_blank"> 
                        <FaX className="text-lite-gray/80 text-xl hover:text-goldmeat duration-100" /> 
                    </a>
                </div>
            </div>
        </header>
    )
}

export default HeaderLg;