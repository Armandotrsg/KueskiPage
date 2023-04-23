    import DataTable from "react-data-table-component";
    import { useState, useEffect } from "react";
    import {ModalClient} from "./ModalClient"
    import { Loader } from "./Loader";

    export const Clientes = () => {
        const [tableData, setTableData] = useState([]);
        const [loading, setLoading] = useState(false);
        const [searchText, setSearchText] = useState("");
        const [searchBy, setSearchBy] = useState("name");
        const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);
        const [actionButton, setActionButton] = useState("Acceso");
        const [shouldRefetch, setShouldRefetch] = useState(false);
        const [modalOpen, setModalOpen] = useState(false);
        const [modalData, setModalData] = useState(null);
        const [modalisEditable, setModalisEditable] = useState(false);
        const [modalarcoRight, setModalarchoRight] = useState("Acceso");
        
        const arcoRights = ["Acceso", "Rectificación", "Cancelación", "Oposición"];

        //Toggle para el DropDown Menu
        const handleDropdownToggle = () => {
            setDropdownMenuOpen(!dropdownMenuOpen);
        };

        //Definimos las variables del modal según el derecho ARCO que se seleccione
        const arcoRightOptions = {
            Acceso: { isEditable: false, archoRightModal: "Acceso" },
            Rectificación: { isEditable: true, archoRightModal: "Rectificación" },
            Cancelación: { isEditable: false, archoRightModal: "Cancelación" },
            Oposición: { isEditable: false, archoRightModal: "Oposición" }
        };

        //Definimos las columnas de nuestra tabla
        const columns = [
            {
                name: "ID",
                selector: row => row.user_id,
                sortable: true,
                center: true,
                grow: 0.5,
                width: "60px",
                style: { fontWeight: "bold" },
                format: (row) => <div>{row.user_id}</div>,
            },
            {
                name: "Nombre",
                selector: row => row.name,
                sortable: true,
                center: true,
                grow: 1,
                width: "flex",
                format: (row) => <div>{row.name}</div>,
            },
            {
                name: "Apellido Paterno",
                selector: row => row.first_last_name,
                sortable: true,
                center: true,
                grow: 1,
                width: "flex",
                format: (row) => <div>{row.first_last_name}</div>,
            },
            {
                name: "Apellido Materno",
                selector: row => row.second_last_name,
                sortable: true,
                center: true,
                grow: 1,
                width: "flex",
                format: (row) => <div>{row.second_last_name}</div>,
            },
            {
                name: "CURP",
                selector: row => row.curp,
                sortable: true,
                center: true,
                grow: 1,
                width: "flex",
                format: (row) => <div>{row.curp}</div>,
            },
            {
                name: "RFC",
                selector: row => row.rfc,
                sortable: true,
                center: true,
                grow: 1,
                width: "flex",
                format: (row) => <div>{row.rfc}</div>,
            },
            {
                name: 'Ver',
                selector: 'id',
                sortable: false,
                cell: (row) => <button onClick={() => handleView(row)}>Ver</button>,
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
            },
        ];  

        //Carga todos los datos de los "users" desde la API
        useEffect(() => {
            setLoading(true);
            fetch("/api/users")
                .then((response) => response.json())
                .then((data) => {
                    //Map through the data and remove the repated user_id's
                    const uniqueData = data.filter(
                        (item, index, self) =>
                            index ===
                            self.findIndex((t) => t.user_id === item.user_id)
                    );
                    setTableData(uniqueData);
                })
                .catch((error) => console.log(error))
                .finally(() => setLoading(false));
        }, [shouldRefetch]); // add shouldRefetch as a dependency

        const handleRefresh = () => {
            setShouldRefetch(true);
        };

        //Función para buscar el texto ingresado
        const handleSearch = (e) => {
            setSearchText(e.target.value);
        };

        // Función dinámica para manejar el cambio de campo de búsqueda
        const handleSearchByChange = (e) => { 
            setSearchBy(e.target.value);
            setSearchText(""); // Borrar texto de búsqueda al cambiar el campo de búsqueda
        };
        
        const filteredData = tableData.filter((item) => // Buscar en el campo seleccionado
        item[searchBy].toLowerCase().includes(searchText.toLowerCase())
        );

        //Carga los datos de la fila seleccionada a partir de la API y carga el modal una vez se presione el botón "Ver" de la misma
        const handleView = (row) => {
            fetch(`/api/users/${row.user_id}`)
                .then((response) => response.json())
                .then((data) => {
                    //setActionButton("Ver");
                    setModalData(data[0]);
                    setModalOpen(true);       
                    console.log(data[0]);
                }
            )
        };
        

        return (
            <div className="flex flex-col pl-5 pr-5 pb-5 h-screen w-screen overflow-scroll">
                {/*Título de la página*/}
                <h1 className="text-2xl font-bold mx-auto p-4">Clientes</h1>
                <div className=" overflow-x-auto shadow-md sm:rounded-lg mt-5"></div>

                {/*Busqueda*/}
                <div className="flex pb-4 bg-white dark:bg-white ">
                    <label for="table-search" className="sr-only">
                        Search
                    </label>
                    <div className="flex flex-row-reverse relative mt-1 space-x-4">
                        <div className="absolute inset-y-0 left-3.5 flex items-center pl-3 pointer-events-none">
                            <svg
                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </div>
                        
                        
                        {/* Filtro pra la busqueda */}
                        <div className="flex pb-1 bg-white dark:bg-white d-flex justify-content-start ml-4">
                            <label htmlFor="FiltroBusqueda" className="flex text-lg text-center font-semibold font-sm top-4 text-gray-900 dark:text-black">Filtro de busqueda:</label>
                            <select 
                                id="FiltroBusqueda" 
                                value={searchBy} 
                                onChange={handleSearchByChange}
                                data-dropdown-toggle="dropdownAction"
                                className="flex w-max items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-white dark:text-black dark:border-gray-200 dark:hover:bg-gray-300 dark:hover:border-gray-600 dark:focus:ring-gray-400"
                                type="button"
                            >
                                <option value="name">Nombre</option>
                                <option value="first_last_name">Apellido Paterno</option>
                                <option value="second_last_name">Apellido Materno</option>
                                <option value="curp">CURP</option>
                                {/* <option value="rfc">RFC</option> */}
                            </select>
                            
                        </div>


                        <input
                            type="text"
                            value={searchText}
                            onChange={handleSearch}
                            id="table-search"
                            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Buscar"
                        />
                    </div>
                </div>
                {/*Filtro ARCO*/}
                <div className="pb-1 bg-white dark:bg-white d-flex justify-content-start ml-4">
                    <button
                        id="dropdownAction"
                        onClick={handleDropdownToggle}
                        data-dropdown-toggle="dropdownAction"
                        className="flex w-max items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-white dark:text-black dark:border-gray-200 dark:hover:bg-gray-300 dark:hover:border-gray-600 dark:focus:ring-gray-400 "
                        type="button"
                    >
                        {actionButton}
                        <svg
                            className="w-3 h-3 ml-2"
                            aria-hidden="true"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 9l-7 7-7-7"
                            ></path>
                        </svg>
                    </button>

                    {dropdownMenuOpen && (
                        <div
                            id="dropdownActionButton"
                            className="absolute flex z-10 w-max text-black bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-white dark:text-black dark:border-gray-200 dark:hover:bg-gray-100 dark:hover:border-gray-100 dark:focus:ring-gray-200"
                        >
                            <ul
                                className="py-1 text-sm text-black dark:text-black"
                                aria-labelledby="dropdownActionButton"
                            >
                                {arcoRights.map((arcoRight, index) => {
                                    const { isEditable, archoRightModal } = arcoRightOptions[arcoRight];
                                    return (
                                        <li key={index} onClick={() => {
                                            setActionButton(arcoRight); 
                                            setDropdownMenuOpen(false);
                                            setModalisEditable(isEditable);
                                            setModalarchoRight(archoRightModal);
                                            }}>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-black font-medium rounded-lg text-sm"
                                            >
                                                {`${arcoRight} - ${arcoRight[0]}`}</a>
                                        </li>
                                
                                    );
                                })}
                                
                            </ul>
                            
                        </div>
                    )}
                </div>
                                
                <div>
                    {/* Creación de la tabla y el modal*/}
        
                    {loading ? (
                        <Loader />
                    ) : (
                        <>
                            <DataTable
                            columns={columns}
                            data={filteredData}
                            pagination
                            className="z-0 w-full text-sm text-left text-black dark:text-black"
                            />
                           <ModalClient isOpen={modalOpen} arcoRight={modalarcoRight} isEditable={modalisEditable} onClose={() => setModalOpen(false)} userData={modalData}/>
                         </>
                    )}
                </div>

            </div>
        );
    };
