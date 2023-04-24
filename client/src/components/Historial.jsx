import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import data from "../shared/data.json";

export const Historial = () => {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchBy, setSearchBy] = useState("name"); // Por defecto, buscar en la columna "name"
    const [actionButton, setActionButton] = useState("Acceso");

    const arcoRights = ["Acceso", "Rectificación", "Cancelación", "Oposición"];
    //const filtroBusqueda = ["ID", "Nombre", "Apellido Paterno", "Apellido Materno", "CURP", "RFC"];

    const test = [
        {
            id: 1,
            arco: "Acceso",
            userid: 4,
            mensaje: "Quiero tener acceso a mis datos personales",
            creacion: "01/03/2023",
            fechacump: "20/03/2023",
        },
        {
            id: 2,
            arco: "Rectificación",
            userid: 8,
            mensaje: "Necesito corregir mi dirección en el registro",
            creacion: "05/03/2023",
            fechacump: "31/03/2023",
        },
        {
            id: 3,
            arco: "Cancelación",
            userid: 2,
            mensaje: "Quiero cancelar mi cuenta y borrar todos mis datos",
            creacion: "10/03/2023",
            fechacump: "30/03/2023",
        },
        {
            id: 4,
            arco: "Oposición",
            userid: 11,
            mensaje: "No quiero que mis datos sean compartidos con terceros",
            creacion: "15/03/2023",
            fechacump: "05/04/2023",
        },
        {
            id: 5,
            arco: "Acceso",
            userid: 7,
            mensaje: "Quiero saber qué datos personales tiene la empresa sobre mí",
            creacion: "20/03/2023",
            fechacump: "10/04/2023",
        },
        {
            id: 6,
            arco: "Rectificación",
            userid: 5,
            mensaje: "Mi nombre está mal escrito en el registro, necesito corregirlo",
            creacion: "25/03/2023",
            fechacump: "15/04/2023",
        },
    ]

    const columns = [
        {
            name: "ID",
            selector: row => row.id,
            sortable: true,
            center: true,
            grow: 0.5,
            width: "60px",
            style: { fontWeight: "bold" },
            format: (row) => <div>{row.id}</div>,
        },
        {
            name: "ARCO",
            selector: row => row.arco,
            sortable: true,
            center: true,
            grow: 1,
            width: "flex",
            format: (row) => <div>{row.arco}</div>,
        },
        {
            name: "User ID",
            selector: row => row.userid,
            sortable: true,
            center: true,
            grow: 1,
            width: "flex",
            format: (row) => <div>{row.userid}</div>,
        },
        {
            name: "Mensaje",
            selector: row => row.mensaje,
            sortable: true,
            center: true,
            grow: 1,
            width: "flex",
            format: (row) => <div>{row.mensaje}</div>,
        },
        {
            name: "Creacion",
            selector: row => row.creacion,
            sortable: true,
            center: true,
            grow: 1,
            width: "flex",
            format: (row) => <div>{row.creacion}</div>,
        },
        {
            name: "Fecha de cumplimiento",
            selector: row => row.fechacump,
            sortable: true,
            center: true,
            grow: 1,
            width: "flex",
            format: (row) => <div>{row.fechacump}</div>,
        },
    ];

    useEffect(() => {
        setLoading(true);
        setTableData(data);
        setLoading(false);
    }, []);

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };


    const handleSearchByChange = (e) => { // Función para manejar el cambio de campo de búsqueda
        setSearchBy(e.target.value);
        setSearchText(""); // Borrar texto de búsqueda al cambiar el campo de búsqueda
    };

    const filteredData = tableData.filter((item) => // Buscar en el campo seleccionado
    item[searchBy].toLowerCase().includes(searchText.toLowerCase())
    );

    
    // const dateRangePickerEl = document.getElementById('dateRangePickerId');
    //      new DateRangePicker(dateRangePickerEl, {}); 


    return (
        <div className="flex flex-col pl-5 pr-5 pb-5 h-screen w-screen overflow-scroll">
            {/*Título de la página*/}
            <h1 className="text-2xl font-bold mx-auto p-4">Historial</h1>
            <div className=" overflow-x-auto shadow-md sm:rounded-lg mt-5"></div>


            <div>
                <div date-rangepicker class="flex items-center">
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
            </div>

            <div>
                {/* Creación de la tabla*/}
                <DataTable
                    columns={columns}
                    data={test}
                    progressPending={loading}
                    pagination
                    searchable
                    className="z-0 w-full text-sm text-left text-black dark:text-black"
                ></DataTable>
            </div>
        </div>
    );
};
