import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { Loader } from "./Loader";

export const Historial = () => {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [shouldRefetch, setShouldRefetch] = useState(false);
    // const [searchText, setSearchText] = useState("");
    // const [searchBy, setSearchBy] = useState("name"); // Por defecto, buscar en la columna "name"
    
    const columns = [
        {
            name: "ID",
            selector: row => row.registro_arco_id,
            sortable: true,
            center: true,
            grow: 0.5,
            width: "60px",
            style: { fontWeight: "bold" },
            format: (row) => <div>{row.registro_arco_id}</div>,
        },
        {
            name: "User ID",
            selector: row => row.user_id,
            sortable: true,
            center: true,
            grow: 1,
            width: "flex",
            format: (row) => <div>{row.user_id}</div>,
        },
        {
            name: "Derecho ARCO",
            selector: row => row.arco_type,
            sortable: true,
            center: true,
            grow: 1,
            width: "flex",
            format: (row) => <div>{row.arco_type === "A" ? "Acceso" : row.arco_type === "R" ? "Rectificación" : row.arco_type === "C" ? "Cancelación" : "Oposición"}</div>,
        },
        {
            name: "Mensaje",
            selector: row => row.message,
            sortable: true,
            center: true,
            grow: 1,
            width: "flex",
            format: (row) => <div>{row.message}</div>,
        },
        {
            name: "Fecha de cumplimiento",
            selector: row => row.created_at,
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
   }

    useEffect(() => {
        fetchTableData();
    }, [shouldRefetch]);

    /* const handleSearch = (e) => {
        setSearchText(e.target.value);
    }; */

   /*  const handleSearchByChange = (e) => { // Función para manejar el cambio de campo de búsqueda
        setSearchBy(e.target.value);
        setSearchText(""); // Borrar texto de búsqueda al cambiar el campo de búsqueda
    }; */

    /* const filteredData = tableData.filter((item) => // Buscar en el campo seleccionado
        item[searchBy].toLowerCase().includes(searchText.toLowerCase())
    ); */

    return (
        <div className="flex flex-col pl-5 pr-5 pb-5 md:h-screen w-screen md:overflow-scroll">
            {/*Título de la página*/}
            <h1 className="text-2xl font-bold mx-auto mt-4 p-4">Historial</h1>
            <div className=" overflow-x-auto shadow-md sm:rounded-lg mt-5"></div>

            <section>
                <div class="flex items-center justify-center">
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input name="start" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 " placeholder="Select date start"></input>
                    </div>
                    <span class="mx-4 text-gray-500">to</span>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input name="end" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Select date end"></input>
                    </div>
                </div>
            </section>

            <main className="mt-5">
                {/* Creación de la tabla*/}
                {
                    loading ? (
                        <Loader />
                    ) : (
                        <DataTable
                            columns={columns}
                            data={tableData}
                            progressPending={loading}
                            pagination
                            searchable
                            className="z-0 w-full text-sm text-left text-black dark:text-black"
                        ></DataTable>
                    )
                }
            </main>
        </div>
    );
};
