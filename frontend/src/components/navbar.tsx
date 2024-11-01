import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-white.png";

export function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <nav className="fixed top-0 left-0 w-full bg-[#0d6efd] text-white">
            <div className="flex justify-between lg:p-4 xs:p-2">
                <Link to="/appointments"><img src={logo} className="h-9 mr-16" alt="Logo" /></Link>

                {/* Botão do menu hamburguer */}
                <button className="lg:hidden p-2" onClick={toggleMenu} aria-label="Toggle navigation">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        )}
                    </svg>
                </button>
        
                {/* Menu para telas grandes */}
                <div className="hidden lg:flex justify-between items-center w-full">
                    <ul className="flex space-x-4">
                        <li><Link className="hover:underline" to="/appointments">Agendamentos</Link></li>
                        <li><Link className="hover:underline" to="/doctors">Médicos</Link></li>
                    </ul>

                    {/* Dropdown Menu */}
                    <div className="relative">
                        <button className="flex items-center hover:underline focus:outline-none" onClick={toggleDropdown}>
                            Samuel Costa
                            <svg className={`w-4 h-4 ml-1 transition-transform ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                                <Link className="block px-4 py-2 hover:bg-gray-200" to="#" onClick={() => setIsDropdownOpen(false)}>
                                    Meu Perfil
                                </Link>
                                <hr className="border-t border-gray-300" />
                                <button className="block px-4 py-2 hover:bg-gray-200 w-full text-left" onClick={() => {
                                    setIsDropdownOpen(false);
                                }}>
                                    Desconectar
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Menu para telas pequenas */}
            {isOpen && (
                <div className="lg:hidden bg-blue-500">
                    <ul className="flex flex-col space-y-2 p-3 text-sm">
                        <li><Link className="hover:underline" to="/appointments">Agendamentos</Link></li>
                        <li><Link className="hover:underline" to="/doctors">Médicos</Link></li>
                        <li><Link className="hover:underline" to="#">Meu Perfil</Link></li>
                        <li><button className="hover:underline">Desconectar</button></li>
                    </ul>
                </div>
            )}
        </nav>
    );
}
