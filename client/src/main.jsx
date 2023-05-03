import React from "react";
import ReactDOM from "react-dom";
import PDFGenerator from "./components/PDFGenerator";

const clientInfo = {
  user_id: "123",
  name: "Juan",
  first_last_name: "Pérez",
  second_last_name: "Gómez",
  date_of_birth: "01/01/1990",
  nationality: "Mexicana",
  state_of_birth: "Jalisco",
  economic_activity: "Empleado",
  curp: "PEJG900101HJCRRN00",
  gender: "Masculino",
  phone_number: "5551234567",
  email: "juan@example.com",
};

ReactDOM.render(
  <PDFGenerator clientInfo={clientInfo} />,
  document.getElementById("root")
);
