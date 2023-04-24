import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { ModalClient } from "./ModalClient";
import { Loader } from "./Loader";
import { Tooltip } from "react-tooltip";
import { Button } from "./Button";

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
        Oposición: { isEditable: false, archoRightModal: "Oposición" },
    };

    //Definimos las columnas de nuestra tabla
    const columns = [
        {
            name: "ID",
            selector: (row) => row.user_id,
            sortable: true,
            center: true,
            grow: 0.5,
            width: "60px",
            style: { fontWeight: "bold" },
            format: (row) => <div>{row.user_id}</div>,
        },
        {
            name: "Nombre",
            selector: (row) => row.name,
            sortable: true,
            center: true,
            grow: 1,
            width: "flex",
            format: (row) => <div>{row.name}</div>,
        },
        {
            name: "Apellido Paterno",
            selector: (row) => row.first_last_name,
            sortable: true,
            center: true,
            grow: 1,
            width: "flex",
            format: (row) => <div>{row.first_last_name}</div>,
        },
        {
            name: "Apellido Materno",
            selector: (row) => row.second_last_name,
            sortable: true,
            center: true,
            grow: 1,
            width: "flex",
            format: (row) => <div>{row.second_last_name}</div>,
        },
        {
            name: "CURP",
            selector: (row) => row.curp,
            sortable: true,
            center: true,
            grow: 1,
            width: "flex",
            format: (row) => <div>{row.curp}</div>,
        },
        {
            name: "Nacionalidad",
            selector: (row) => row.nationality,
            sortable: true,
            center: true,
            grow: 1,
            width: "flex",
            format: (row) => <div>{row.nationality}</div>,
        },
        {
            name: "Ver",
            selector: "id",
            sortable: false,
            cell: (row) => (
                <Button
                    onClick={() => handleView(row)}
                    toolTipContent={modalarcoRight}
                    id={Math.floor(Math.random() * 10000).toString()}
                    toolTipHide={1800}
                    className={"hover:underline"}
                >
                    Ver
                </Button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const loadData = () => {
        setLoading(true);
        fetch("/api/users")
            .then((response) => response.json())
            .then((data) => {
                //Map through the data and remove the repated user_id's and don't add the ones where the name is null
                const uniqueData = data.filter(
                    (item, index, self) =>
                        index ===
                            self.findIndex((t) => t.user_id === item.user_id) &&
                        item.name !== null
                );
                setTableData(uniqueData);
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    };

    //Carga todos los datos de los "users" desde la API
    useEffect(() => {
        loadData();
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

    const filteredData = tableData.filter(
        (
            item // Buscar en el campo seleccionado
        ) => item[searchBy].toLowerCase().includes(searchText.toLowerCase())
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
            });
    };

    return (
        <div className="flex flex-col pl-5 pr-5 pb-5 h-screen w-screen overflow-scroll ">
            {/*Título de la página*/}
            <h1 className="text-2xl font-bold mx-auto p-4">Clientes</h1>
            <section className="flex flex-col md:flex-row md:flex-wrap items-center lg:items-baseline justify-between m-3">
                <div className="lg:flex">
                    {/* Lupa de la barra de búsqueda */}
                    <div className="relative top-[1.8rem] lg:top-0 flex items-center pl-3 pointer-events-none">
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

                    {/* Input de la búsqueda */}
                    <div>
                        <input
                            type="text"
                            value={searchText}
                            onChange={handleSearch}
                            id="table-search"
                            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-72 sm:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:-ml-8"
                            placeholder="Buscar"
                        />
                    </div>
                </div>
                {/*Busqueda*/}

                <div className="flex flex-row md:flex-row mt-5 space-x-4">
                    {/* Filtro para la busqueda */}
                    <label
                        htmlFor="FiltroBusqueda"
                        className="flex text-lg text-center font-semibold font-sm text-gray-900 dark:text-black"
                    >
                        Filtro de búsqueda:
                    </label>
                    <select
                        id="FiltroBusqueda"
                        value={searchBy}
                        onChange={handleSearchByChange}
                        data-dropdown-toggle="dropdownAction"
                        className="flex ml-3 my-auto w-max max-h-10 items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-auto px-3 py-1.5 dark:bg-white dark:text-black dark:border-gray-200 dark:hover:bg-gray-300 dark:hover:border-gray-600 dark:focus:ring-gray-400"
                        type="button"
                    >
                        <option value="name">Nombre</option>
                        <option value="first_last_name">
                            Apellido Paterno
                        </option>
                        <option value="second_last_name">
                            Apellido Materno
                        </option>
                        <option value="curp">CURP</option>
                        <option value="nationality">Nacionalidad</option>
                    </select>
                </div>

                {/*Filtro ARCO*/}
                <div className="flex items-start pb-4 bg-white dark:bg-white mt-5">
                    <h1 class="flex text-lg my-auto text-center font-semibold font-sm text-gray-900 dark:text-black">
                        Filtro derecho ARCO:
                    </h1>
                    <div className="pb-1 bg-white dark:bg-white d-flex justify-content-start ml-4 my-auto">
                        <button
                            id="dropdownAction"
                            onClick={handleDropdownToggle}
                            data-dropdown-toggle="dropdownAction"
                            className="flex items-center w-full sm:w-auto text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-white dark:text-black dark:border-gray-200 dark:hover:bg-gray-300 dark:hover:border-gray-600 dark:focus:ring-gray-400 "
                            type="button"
                            data-tooltip-content={
                                "Escoge qué derecho ARCO deseas realizar"
                            }
                            data-tooltip-id={"dropdownAction"}
                            data-tooltip-delay-show={1000}
                            data-tooltip-variant={"dark"}
                        >
                            {actionButton}
                            <svg
                                className="w-3 h-3 ml-12"
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
                        <Tooltip
                            id={"dropdownAction"}
                            place={"right"}
                            type="dark"
                            effect="solid"
                        />

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
                                        const { isEditable, archoRightModal } =
                                            arcoRightOptions[arcoRight];
                                        return (
                                            <li
                                                key={index}
                                                onClick={() => {
                                                    setActionButton(arcoRight);
                                                    setDropdownMenuOpen(false);
                                                    setModalisEditable(
                                                        isEditable
                                                    );
                                                    setModalarchoRight(
                                                        archoRightModal
                                                    );
                                                }}
                                            >
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-black font-medium rounded-lg text-sm"
                                                >
                                                    {`${arcoRight} - ${arcoRight[0]}`}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <main>
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
                        <ModalClient
                            isOpen={modalOpen}
                            arcoRight={modalarcoRight}
                            isEditable={modalisEditable}
                            onClose={() => setModalOpen(false)}
                            userData={modalData}
                            loadData={loadData}
                        />
                    </>
                )}
            </main>
        </div>
    );
};
