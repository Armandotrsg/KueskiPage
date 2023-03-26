import React from 'react';
import jsPDF from 'jspdf';

const GenerarPDF = () => {

  const generarPDF = () => {
    // Crea un nuevo objeto jsPDF
    const doc = new jsPDF();

    // Agrega contenido al PDF
    doc.text('Hola mundo!', 10, 10);

    // Descarga el PDF generado
    doc.save('mi-pdf.pdf');
  };

  return (
    <div>
      <button onClick={generarPDF}>Generar PDF</button>
    </div>
  );
};

export default GenerarPDF;

