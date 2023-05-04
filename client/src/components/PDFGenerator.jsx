import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { spanishKeysAddresses, spanishKeysIdentifications, spanishKeysUsers } from '../shared/SpanishKeys';

export const PDFGenerator = ({userData}) => {
  const generatePDF = () => {
    // Crear una nueva instancia de jsPDF
    const doc = new jsPDF();
    const keys = Object.keys(userData);
    const addressesKeys = Object.keys(userData.addresses[0]);
    const identificationKeys = Object.keys(userData.identifications[0]);
    const otherKeys = userData.user_data !== null ? Object.keys(userData.user_data) : [];

    // Agregar la imagen
    doc.addImage(
      'https://d1.awsstatic.com/case-studies/Latam%20Cases%20Assets/Kueski.309ce0a57d3f89bf47b176fb6f1a985e373d1e90.png',
      'PNG',
      167,
      2.5,
      30,
      20
    );

    // Agregar el título en la esquina contraria a la imagen
    doc.text('Datos de usuario', 56, 15.4, null, null, 'right');

    // Definir la tabla
    let tableData = [];

    // Agregar los datos del usuario
    keys.map((key) => {
      if (key !== 'addresses' && key !== 'identifications' && key !== 'user_data') {
        tableData.push([spanishKeysUsers[key], userData[key]]);
      }
    })

    // Agregar los datos de otros
    if (otherKeys.length > 0) {
      let otherData = [];
      otherKeys.map((key) => {
        otherData.push([key, userData.user_data[key]]);
      })
      tableData.push(otherData);
    }

    const tableHeaders = [['Campo', 'Valor']];

    // Agregar la tabla al documento
    doc.autoTable({
      head: tableHeaders,
      body: tableData,
      startY: 25, // comenzar la tabla a 30 unidades desde la parte superior
    });

    //Agregar una tabla nueva por cada dirección
    userData.addresses.map((address) => {
      let addressData = [];
      addressesKeys.map((key) => {
        addressData.push([spanishKeysAddresses[key], address[key]]);
      })
      const tableHeaders = [['Campo', 'Valor']];
      doc.autoTable({
        head: tableHeaders,
        body: addressData,
        startY: doc.autoTable.previous.finalY + 10,
      });
    })

    //Agregar una tabla nueva por cada identificación
    userData.identifications.map((identification) => {
      let identificationData = [];
      identificationKeys.map((key) => {
        identificationData.push([spanishKeysIdentifications[key], identification[key]]);
      })
      const tableHeaders = [['Campo', 'Valor']];
      doc.text(`Identificación ${identification.identification_id}`, 10, doc.autoTable.previous.finalY + 20);
      doc.autoTable({
        head: tableHeaders,
        body: identificationData,
        startY: doc.autoTable.previous.finalY + 10,
      });
    })

    // Guardar el documento como un archivo PDF con el nombre 'userData.pdf'
    doc.save('userData.pdf');
  };

  return (
    generatePDF()
  );
}

/* Ejecutar el componente botón

import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/userDataPDF';

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
);

*/