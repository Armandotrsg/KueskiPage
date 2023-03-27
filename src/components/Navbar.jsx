import { useState } from "react"
import arrow from "../assets/img/arrow.svg"
import kueskiLogo from "../assets/img/kueskiLogo.png"

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    return(
        <aside className={`${isOpen ? "w-72" : "w-20"} h-screen bg-blue-500 relative duration-300 ease-in-out`}>
            {/* Botón para ocultar y mostrar la navbar */}
            <button onClick={() => setIsOpen(!isOpen)}>
                <img src={arrow} alt="Arrow" className={`${isOpen ? "transform-gpu -rotate-180" : ""} absolute -right-3 top-9 w-7 border-2 border-blue-900 rounded-full bg-white duration-300 ease-in-out`} />
            </button>
            {/* Barra de navegación */}
            <div className="flex gap-x-4 items-center">
                {/* Logo */}
                <img src={kueskiLogo} alt="Logo de Kueski" className="w-10 h-10 duration-700" />
                <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!isOpen ? "scale-0" : ""}`}>Kueski</h1>
            </div>
            <nav>
                
            </nav>

        </aside>
    )
}