import React from "react";
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";

const Button = ({ clientInfo }) => {
  const generatePDF = () => {
    // Al clickear el botón, el archivo PDF se descargará
  };

  return (
    <PDFDownloadLink document={<Document>
        <Page>
          <Text>ID: {clientInfo.user_id}</Text>
          <Text>Nombre: {clientInfo.name}</Text>
          <Text>Apellido paterno: {clientInfo.first_last_name}</Text>
          <Text>Apellido materno: {clientInfo.second_last_name}</Text>
          <Text>Fecha de nacimiento: {clientInfo.date_of_birth}</Text>
          <Text>Nacionalidad: {clientInfo.nationality}</Text>
          <Text>Estado de nacimiento: {clientInfo.state_of_birth}</Text>
          <Text>Actividad económica: {clientInfo.economic_activity}</Text>
          <Text>CURP: {clientInfo.curp}</Text>
          <Text>Género: {clientInfo.gender}</Text>
          <Text>Número de teléfono: {clientInfo.phone_number}</Text>
          <Text>Correo electrónico: {clientInfo.email}</Text>
        </Page>
      </Document>} fileName="client_info.pdf">
      {({ blob, url, loading, error }) =>
        loading ? "Generando PDF..." : <button onClick={generatePDF}>Generar PDF</button>
      }
    </PDFDownloadLink>
  );
};

export default Button;

/* === CÓDIGO DE PRUEBA ===
import React, { useState } from "react";
import PDFGenerator from "./components/PDFGenerator";

function App() {
  const [clientInfo, setClientInfo] = useState({
    user_id: "123",
    name: "Juan",
    first_last_name: "Pérez",
    second_last_name: "García",
    date_of_birth: "01/01/1990",
    nationality: "Mexicana",
    state_of_birth: "Ciudad de México",
    economic_activity: "Empleado",
    curp: "PERJ900101HCMMRN00",
    gender: "Masculino",
    phone_number: "5555555555",
    email: "juan.perez@example.com",
  });

  return (
    <div className="App">
      <PDFGenerator clientInfo={clientInfo} />
    </div>
  );
}

export default App; */