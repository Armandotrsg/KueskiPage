import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function PDFGenerator(props) {
  const generatePDF = () => {
    // Crear una nueva instancia de jsPDF
    const doc = new jsPDF();

    // Agregar la imagen
    doc.addImage(
      'https://d1.awsstatic.com/case-studies/Latam%20Cases%20Assets/Kueski.309ce0a57d3f89bf47b176fb6f1a985e373d1e90.png',
      'PNG',
      167,
      -2.5,
      30,
      20
    );

    // Definir la tabla
    const tableData = [      ['ID de usuario', props.userId],
      ['Nombre', props.firstName],
      ['Apellido paterno', props.lastName1],
      ['Apellido materno', props.lastName2],
      ['Fecha de nacimiento', props.birthDate],
      ['Nacionalidad', props.nationality],
      ['Estado de nacimiento', props.birthState],
      ['Actividad económica', props.economicActivity],
      ['CURP', props.curp],
      ['Género', props.gender],
      ['Número de teléfono', props.phone],
      ['Email', props.email],
      ['Es cliente', props.isClient],
      ['Está bloqueado', props.isBlocked],
      ['Fecha de creación', props.creationDate],
      ['Fecha de actualización (Cliente)', props.clientUpdateDate],
      ['Fecha de eliminación (Cliente)', props.clientDeleteDate],
      ['RFC', props.rfc],
      ['ID de identificación', props.identificationId],
      ['Tipo de identificación', props.identificationType],
      ['Número de identificación', props.identificationNumber],
      ['Fecha de creación (Identificación)', props.identificationCreationDate],
      ['Fecha de actualización (Identificación)', props.identificationUpdateDate],
      ['Fecha de eliminación (Identificación)', props.identificationDeleteDate],
      ['ID de dirección', props.addressId],
      ['País', props.country],
      ['Estado', props.state],
      ['Ciudad', props.city],
      ['Colonia', props.neighborhood],
      ['Código postal', props.postalCode],
      ['Calle', props.street],
      ['Número exterior', props.exteriorNumber],
      ['Número interior', props.interiorNumber],
      ['Fecha de creación (dirección)', props.addressCreationDate],
      ['Fecha de actualización (dirección)', props.addressUpdateDate],
      ['Fecha de eliminación (dirección)', props.addressDeleteDate],
    ];
    const tableHeaders = [['Campo', 'Valor']];

    // Agregar la tabla al documento
    doc.autoTable({
      head: tableHeaders,
      body: tableData,
    });

    // Guardar el documento como un archivo PDF con el nombre 'userData.pdf'
    doc.save('userData.pdf');
  };

  return (
    <button onClick={generatePDF}>
      Generar PDF
    </button>
  );
}

export default PDFGenerator;
