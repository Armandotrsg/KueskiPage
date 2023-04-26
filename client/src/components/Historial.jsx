import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { Loader } from "./Loader";

export const Historial = () => {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedArcoType, setSelectedArcoType] = useState(null);


    const columns = [
        {
            name: "ID",
            selector: (row) => row.registro_arco_id,
            sortable: true,
            center: true,
            grow: 0.5,
            width: "60px",
            style: { fontWeight: "bold" },
            format: (row) => <div>{row.registro_arco_id}</div>,
        },
        {
            name: "User ID",
            selector: (row) => row.user_id,
            sortable: true,
            center: true,
            grow: 1,
            width: "flex",
            format: (row) => <div>{row.user_id}</div>,
        },
        {
            name: "Derecho ARCO",
            selector: (row) => row.arco_type,
            sortable: true,
            center: true,
            grow: 1,
            width: "flex",
            format: (row) => (
                <div>
                    {row.arco_type === "A"
                        ? "Acceso"
                        : row.arco_type === "R"
                        ? "Rectificación"
                        : row.arco_type === "C"
                        ? "Cancelación"
                        : "Oposición"}
                </div>
            ),
        },
        {
            name: "Mensaje",
            selector: (row) => row.message,
            sortable: true,
            center: true,
            grow: 1,
            width: "flex",
            format: (row) => <div>{row.message}</div>,
        },
        {
            name: "Fecha de cumplimiento",
            selector: (row) => row.created_at,
            sortable: true,
            center: true,
            grow: 1,
            width: "flex",
            format: (row) => <div>{row.created_at.split("T")[0]}</div>,
        },
    ];

    const fetchTableData = () => {
        setLoading(true);
        fetch("/api/arco_registers")
            .then((res) => res.json())
            .then((data) => {
                setTableData(data);
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchTableData();
    }, [shouldRefetch]);

    const filterData = (data) => {
        return data.filter((row) => {
            const createdAt = new Date(row.created_at).getTime();
            const start = startDate && Date.parse(startDate);
            let end = endDate && Date.parse(endDate);
            //Add 1 day to include the end date
            //end = end && new Date(end + 86400000).getTime();
    
            if (start && end) {
                return (
                    createdAt >= start &&
                    createdAt <= end &&
                    (!selectedArcoType || row.arco_type === selectedArcoType)
                );
            } else if (start) {
                return (
                    createdAt >= start &&
                    (!selectedArcoType || row.arco_type === selectedArcoType)
                );
            } else if (end) {
                return (
                    createdAt <= end &&
                    (!selectedArcoType || row.arco_type === selectedArcoType)
                );
            } else {
                return !selectedArcoType || row.arco_type === selectedArcoType;
            }
        });
    };
    

    const filteredData = filterData(tableData);

    return (
        <div className="flex flex-col pl-5 pr-5 pb-5 md:h-screen w-screen md:overflow-scroll">
            {/*Título de la página*/}
            <h1 className="text-2xl font-bold mx-auto mt-4 p-4">Historial</h1>
            <div className=" overflow-x-auto shadow-md sm:rounded-lg mt-5"></div>

            <section className="flex flex-col md:flex-row md:justify-between space-x-4">
                {/*Calendario de búsqueda */}
                <div class="flex items-center justify-center">
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                aria-hidden="true"
                                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </div>
                        <input
                            name="start"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
                            placeholder="Select date start"
                        ></input>
                    </div>

                    <span class="mx-4 text-gray-500">hasta</span>

                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                aria-hidden="true"
                                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </div>
                        <input
                            name="end"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                            placeholder="Select date end"
                        ></input>
                    </div>
                </div>
                
                {/*Filtro ARCO */}
                <div className="flex items-center justify-center pb-4 bg-white dark:bg-white mt-5">
                    <label
                        className="flex text-lg my-auto text-center font-semibold font-sm text-gray-900 dark:text-black"
                        htmlFor="dropdownAction"
                    >
                        Filtrar por derechos ARCO:
                    </label>
                    <div className="pb-1 bg-white dark:bg-white d-flex justify-content-start ml-4 my-auto">
                        <select value={selectedArcoType} onChange={(e) => setSelectedArcoType(e.target.value)} className="flex items-center w-full sm:w-auto text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-auto px-5 py-1.5 dark:bg-white dark:text-black dark:border-gray-200 dark:hover:bg-gray-300 dark:hover:border-gray-600 dark:focus:ring-gray-400 ">
                            <option value="">Todos los accesos</option>
                            <option value="A">Acceso</option>
                            <option value="R">Rectificación</option>
                            <option value="C">Cancelación</option>
                            <option value="O">Oposición</option>
                        </select>
                    </div>
                </div>

                
            </section>

            <main className="mt-5">
                {/* Creación de la tabla*/}
                {loading ? (
                    <Loader />
                ) : (
                    <DataTable
                        columns={columns}
                        data={filteredData}
                        progressPending={loading}
                        pagination
                        searchable
                        className="z-0 w-full text-sm text-left text-black dark:text-black"
                    ></DataTable>
                )}
            </main>
        </div>
    );
};
