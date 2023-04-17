import { useState } from "react";
import { useLocation } from "react-router-dom";
import arrow from "../assets/img/arrow.svg";
import kueskiLogo from "../assets/img/kueskiLogo.png";
import { Navigation } from "../shared/Navigation";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Componente para renderizar los items de la barra de navegación
    const NavigationItems = ({ name, path, icon }) => {
        return (
            <li className={`flex w-full items-center justify-center border-r-[5px] ${path === location.pathname ? "border-lime-500" : "border-transparent"}`}>
                <a
                    href={path}
                    className={`text-white text-md w-[70%] flex flex-row items-center justify-center p-2 hover:bg-gray-400 duration-200 ease-in-out rounded-md`}
                >
                    <div className={`flex flex-col items-center justify-center ${!isOpen ? "w-[100%]" : "w-[50%]"} `}>
                        <img src={icon} alt={name} className="w-6 h-6" />
                    </div>
                    <div className={`flex flex-col w-[50%] items-start justify-center text-left text-xs sm:text-sm md:text-md lg:text-lg ${!isOpen ? "hidden" : ""}`}>
                        <span className="flex">
                            {name}
                        </span>
                    </div>
                </a>
            </li>
        );
    };

    return (
        <aside
            className={`${
                isOpen ? "w-56 min-w-[43%] md:min-w-[224px]" : "w-20 min-w-[20%] md:min-w-[80px]"
            }  h-screen bg-blue-500 flex flex-col justify-start relative duration-500 ease-in-out`}
        >
            {/* Botón para ocultar y mostrar la navbar */}
            <button onClick={() => setIsOpen(!isOpen)}>
                <img
                    src={arrow}
                    alt="Arrow"
                    className={`${
                        isOpen ? "transform-gpu -rotate-180" : ""
                    } absolute -right-3 top-9 w-7 border-2 border-blue-900 rounded-full bg-white duration-300 ease-in-out`}
                />
            </button>
            {/* Barra de navegación */}
            <div className="flex flex-col gap-x-4 items-center space-y-7">
                {/* Logo */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-x-2 mt-5">
                    <img
                        src={kueskiLogo}
                        alt="Logo de Kueski"
                        className="w-10 h-10"
                    />
                    <h1
                        className={`text-white font-bold text-2xl ${
                            !isOpen ? "hidden" : ""
                        }`}
                    >
                        Kueski
                    </h1>
                </div>
                {/* Navegación */}
                <nav className="flex w-full">
                    <ul className="pt-6 flex flex-col space-y-9 w-full">
                        {Navigation.map((item, index) => (
                            <NavigationItems key={index} {...item} />
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
