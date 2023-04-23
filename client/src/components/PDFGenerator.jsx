import React from "react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: "2cm",
  },
  section: {
    marginBottom: "0.5cm",
  },
  heading: {
    fontWeight: "bold",
    fontSize: "16pt",
    marginBottom: "0.50cm",
  },
  bold: {
    fontWeight: "bold",
  },
  text: {
    fontSize: "12pt",
    lineHeight: 1.5, // Añade más espacio vertical entre las líneas de texto
  },
});

const Button = ({ clientInfo }) => {
  const generatePDF = () => {
    // Al clickear el botón, el archivo PDF se descargará
  };

  return (
    <PDFDownloadLink document={
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.heading}>
              <Text style={styles.bold}>Información del cliente</Text>
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>ID:</Text> {clientInfo.user_id}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Nombre:</Text> {clientInfo.name}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Apellido paterno:</Text> {clientInfo.first_last_name}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Apellido materno:</Text> {clientInfo.second_last_name}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Fecha de nacimiento:</Text> {clientInfo.date_of_birth}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Nacionalidad:</Text> {clientInfo.nationality}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Estado de nacimiento:</Text> {clientInfo.state_of_birth}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Actividad económica:</Text> {clientInfo.economic_activity}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>CURP:</Text> {clientInfo.curp}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Género:</Text> {clientInfo.gender}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Número de teléfono:</Text> {clientInfo.phone_number}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Correo electrónico:</Text> {clientInfo.email}
            </Text>
          </View>
        </Page>
      </Document>
    } fileName="client_info.pdf">
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