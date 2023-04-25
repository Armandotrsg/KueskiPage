import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import arrow from "../assets/img/arrow.svg";
import kueskiLogo from "../assets/img/kueskiLogo.png";
import { Navigation } from "../shared/Navigation";
import { Tooltip } from "react-tooltip";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50 && !isOpen) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [])

    // Componente para renderizar los items de la barra de navegación
    const NavigationItems = ({ name, path, icon }) => {
        return (
            <li
                className={`flex w-full items-center justify-center md:border-r-[5px] ${
                    path === location.pathname
                        ? isOpen
                            ? "border-r-[5px] border-lime-500"
                            : "md:border-lime-500"
                        : "border-transparent"
                }`}
            >
                <a
                    href={path}
                    className={`text-white text-md w-[70%] flex flex-row items-center justify-center p-2 hover:bg-gray-400 duration-200 ease-in-out rounded-md`}
                    data-tooltip-content={"Ir a " + name}
                    data-tooltip-id={name}
                    data-tooltip-delay-show={1000}
                    data-tooltip-variant={"info"}
                >
                    <div
                        className={`flex flex-col items-center justify-center ${
                            !isOpen ? "w-[100%]" : "w-[50%]"
                        } `}
                    >
                        <img src={icon} alt={name} className="w-6 h-6" />
                    </div>
                    <div
                        className={`flex flex-col w-[50%] items-start justify-center text-md lg:text-lg ${
                            !isOpen ? "hidden" : ""
                        }`}
                    >
                        <span className="flex">{name}</span>
                    </div>
                </a>
                <Tooltip id={name} place={"right"} type="dark" effect="solid" />
            </li>
        );
    };

    return (
        <React.Fragment>
            {/* Botón para ocultar y mostrar la navbar en dispositivos móviles */}
            <button onClick={() => {setIsOpen(!isOpen); setScrolled(false)}}>
                <img
                    src={arrow}
                    alt="Arrow"
                    className={`${
                        isOpen ? "transform-gpu -rotate-180" : ""
                    } fixed z-50 top-2 left-2 border-2 border-blue-900 rounded-full bg-white duration-300 ease-in-out md:invisible hover:opacity-100 ${scrolled ? "opacity-5" : "opacity-100"}`}
                />
            </button>
            <aside
                className={`${
                    isOpen ? "w-56 md:min-w-[224px]" : "w-0 md:min-w-[80px]"
                }  h-screen bg-blue-500 flex flex-col justify-start fixed md:relative duration-700 md:duration-500 ease-in-out z-40`}
            >
                {/* Botón para ocultar y mostrar la navbar */}
                <button onClick={() => setIsOpen(!isOpen)}>
                    <img
                        src={arrow}
                        alt="Arrow"
                        className={`${
                            isOpen ? "transform-gpu -rotate-180" : ""
                        } absolute -right-3 top-9 w-7 border-2 border-blue-900 rounded-full bg-white duration-300 ease-in-out invisible md:visible`}
                    />
                </button>
                {/* Barra de navegación */}
                <div className="flex flex-col gap-x-4 items-center space-y-7">
                    {/* Logo */}
                    <a href="/" className="flex flex-col md:flex-row items-center justify-center gap-x-2 mt-5">
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
                    </a>
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
        </React.Fragment>
    );
};
