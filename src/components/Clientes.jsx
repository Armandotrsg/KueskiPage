import React from "react";

export const Clientes = () => {

    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch("http://localhost:3001/api/users")
            .then((res) => res.json())
            .then((data) => {
                setData(data[0].name);
                console.log(data); // Imprime la respuesta completa del servidor en la consola del navegador
            })
            .catch((error) => {
                console.log(error); // Imprime cualquier error en la consola del navegador
            });
    }, []);
    

    return (
        <div className="flex">
            <h1 className="text-2xl font-bold ml-4">Clientes</h1>
            <p>{!data ? "Loading...": data}</p>
        </div>
    )
}