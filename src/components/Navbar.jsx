import { useState } from "react";
import arrow from "../assets/img/arrow.svg";
import kueskiLogo from "../assets/img/kueskiLogo.png";
import { Navigation } from "../shared/Navigation";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Componente para renderizar los items de la barra de navegación
    const NavigationItems = ({ name, path, icon }) => {
        return (
            <li>
                <a
                    href={path}
                    className={`text-white text-sm flex flex-row items-center gap-x-4 p-2 hover:bg-gray-400 rounded-md`}
                >
                    <img src={icon} alt={name} className="w-6 h-6" />
                    <span className={`${!isOpen ? "hidden" : ""} duration-200`}>
                        {name}
                    </span>
                </a>
            </li>
        );
    };

    return (
        <aside
            className={`${
                isOpen ? "w-56" : "w-20"
            } h-screen bg-blue-500 relative duration-500 ease-in-out`}
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
                <div className="flex flex-row items-center justify-center gap-x-2">
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
                <nav className="flex">
                    <ul className="pt-6 flex flex-col space-y-9">
                        {Navigation.map((item, index) => (
                            <NavigationItems key={index} {...item} />
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};
