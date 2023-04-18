import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import data from "../shared/data.json";

export const Clientes = () => {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    
    const handleDropdownToggle = () => {
        setDropdownMenuOpen(!dropdownMenuOpen);
    }
      
    const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);

    const columns = [
        {
          name: "ID",
          selector: "id",
          sortable: true,
          center: true,
          grow: 0.5,
          width: "60px",
          style: { fontWeight: "bold" },
          format: (row) => <div>{row.id}</div>,
        },
        {
          name: "Nombre",
          selector: "name",
          sortable: true,
          center: true,
          grow: 1,
          width: "flex",
          format: (row) => <div>{row.name}</div>,
        },
        {
          name: "Apellido Paterno",
          selector: "apellidoPaterno",
          sortable: true,
          center: true,
          grow: 1,
          width: "flex",
          format: (row) => <div>{row.apellidoPaterno}</div>,
        },
        {
          name: "Apellido Materno",
          selector: "apellidoMaterno",
          sortable: true,
          center: true,
          grow: 1,
          width: "flex",
          format: (row) => <div>{row.apellidoMaterno}</div>,
        },
        {
          name: "CURP",
          selector: "curp",
          sortable: true,
          center: true,
          grow: 1,
          width: "flex",
          format: (row) => <div>{row.curp}</div>,
        },
        {
          name: "RFC",
          selector: "rfc",
          sortable: true,
          center: true,
          grow: 1,
          width: "flex",
          format: (row) => <div>{row.rfc}</div>,
        },
      ];


    useEffect(() => {
        setLoading(true)
        setTableData(data);
        setLoading(false)
    }, []);

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };
    
    const filteredData = tableData.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    


    return (
        <div className="flex flex-col pl-5 pr-5 pb-5 h-screen w-screen overflow-scroll">
            {/*Título de la página*/}
            <h1 className="text-2xl font-bold">Clientes</h1>
            <div class=" overflow-x-auto shadow-md sm:rounded-lg mt-5"></div>

                {/*Busqueda*/}
                <div class="pb-4 bg-white dark:bg-white ">
                    <label for="table-search" class="sr-only">Search</label>
                    <div class="relative mt-1">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input type="text" value={searchText} onChange={handleSearch} id="table-search" class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar"/>
                    </div>
                </div>
                {/*Filtro ARCO*/}
                <div class="pb-1 bg-white dark:bg-white d-flex justify-content-start">
                    <button id="dropdownAction" onClick = {handleDropdownToggle} data-dropdown-toggle="dropdownAction" class="flex w-max items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-white dark:text-black dark:border-gray-200 dark:hover:bg-gray-300 dark:hover:border-gray-600 dark:focus:ring-gray-400" type="button">
                        <span class="sr-only">Action button</span>
                        Acción
                        <svg class="w-3 h-3 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>

                    {dropdownMenuOpen && (
                        <div id="dropdownActionButton" class="flex z-10 w-max text-black bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-white dark:text-black dark:border-gray-200 dark:hover:bg-gray-100 dark:hover:border-gray-100 dark:focus:ring-gray-200">
                            <ul class="py-1 text-sm text-black dark:text-black" aria-labelledby="dropdownActionButton">
                                <li>
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-black font-medium rounded-lg text-sm">A-Acceso</a>
                                </li>
                                <li>
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-black font-medium rounded-lg text-sm">R-Rectificación</a>
                                </li>
                                <li>
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-black font-medium rounded-lg text-sm">C-Cancelación</a>
                                </li>
                                <li>
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 dark:hover:text-black font-medium rounded-lg text-sm">O-Oposición</a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                <div>
                    

                    {/* Creación de la tabla*/}
                    <DataTable columns={columns} data={filteredData} progressPending={loading} pagination searchable class="z-0 w-full text-sm text-left text-black dark:text-black">
                    </DataTable>
                </div>
        </div>
    )
}