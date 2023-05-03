
import React from "react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: "0.5cm",
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
    position: "absolute",
    top: "2cm",
    left: "0cm",
  },
  container: {
    width: "100%",
  },
  section: {
    marginBottom: "1cm",
    textAlign: "left",
    marginLeft: "1.5cm",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: "0.50cm",
    textAlign: "left",
    marginLeft: "-0.7cm",
    borderBottom: "1px solid black",
    paddingBottom: "0.5cm",
  },
  bold: {
    fontWeight: "bold",
  },
  text: {
    fontSize: "12pt",
    lineHeight: 1.7,
  },
  info: {
    marginBottom: "0.5cm",
  },
  align: {
    textAlign: "center",
  }
});
  
  const Button = ({ clientInfo }) => {
    const generatePDF = () => {
    };
  
    return (
      <PDFDownloadLink
        document={
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.heading}>
                        <Text>Reporte de información del usuario</Text>
                    </Text>
                </View>
                <View style={styles.section}>
                <Text style={styles.info}>Información del usuario</Text>
                  <Text style={styles.text}>
                    <Text style={styles.bold}>ID:</Text> {clientInfo.user_id}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={styles.bold}>Nombre:</Text> {clientInfo.name}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={styles.bold}>Apellido paterno:</Text>{" "}
                    {clientInfo.first_last_name}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={styles.bold}>Apellido materno:</Text>{" "}
                    {clientInfo.second_last_name}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={styles.bold}>Fecha de nacimiento:</Text>{" "}
                    {clientInfo.date_of_birth}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={styles.bold}>Nacionalidad:</Text>{" "}
                    {clientInfo.nationality}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={styles.bold}>Estado de nacimiento:</Text>{" "}
                    {clientInfo.state_of_birth}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={styles.bold}>Actividad económica:</Text>{" "}
                    {clientInfo.economic_activity}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={styles.bold}>CURP:</Text> {clientInfo.curp}
                  </Text>
                </View>
              </View>
            </Page>
          </Document>
        }
        fileName="cliente.pdf"
      >
        <button onClick={generatePDF}>Descargar PDF</button>
      </PDFDownloadLink>
    );
  };
  
  export default Button;