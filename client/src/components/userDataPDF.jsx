import React from 'react';
import PDFGenerator from './PDFGenerator';

function Main() {
  // Datos del usuario
  const userData = {
    userId: 1234,
    firstName: 'John',
    lastName1: 'Doe',
    lastName2: 'Smith',
    birthDate: '01/01/1990',
    nationality: 'Mexican',
    birthState: 'Jalisco',
    economicActivity: 'Software Developer',
    curp: 'DOES900101HMNXXX00',
    gender: 'Male',
    phone: '+52 1234567890',
    email: 'john.doe@example.com',
    isClient: true,
    isBlocked: false,
    creationDate: '01/01/2021',
    clientUpdateDate: '02/01/2021',
    clientDeleteDate: '',
    rfc: 'DOES900101XXX',
    identificationId: 1,
    identificationType: 'Passport',
    identificationNumber: 'A12345678',
    identificationCreationDate: '01/02/2021',
    identificationUpdateDate: '01/03/2021',
    identificationDeleteDate: '',
    addressId: 1,
    country: 'Mexico',
    state: 'Jalisco',
    city: 'Guadalajara',
    neighborhood: 'Centro',
    postalCode: '44100',
    street: 'Av. Juárez',
    exteriorNumber: '123',
    interiorNumber: '',
    addressCreationDate: '01/04/2021',
    addressUpdateDate: '01/05/2021',
    addressDeleteDate: '',
  };

  return (
    <div>
      <PDFGenerator {...userData} />
    </div>
  );
}

export default Main;
