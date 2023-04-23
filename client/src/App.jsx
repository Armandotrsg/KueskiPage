

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

export default App; 