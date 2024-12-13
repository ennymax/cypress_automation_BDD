import { faker } from '@faker-js/faker';

export const dates = () => {
  const currentDate = new Date();

  currentDate.setDate(currentDate.getDate() - 1);

//MM/DD/YYYY
  const yesterdayDate = `${String(currentDate.getMonth() + 1).padStart(2, '0')}/${String(currentDate.getDate()).padStart(2, '0')}/${currentDate.getFullYear()}`;

  const tomorrowDate = `${String(currentDate.getMonth() + 1).padStart(2, '0')}/${String(currentDate.getDate() + 2).padStart(2, '0')}/${currentDate.getFullYear()}`;

  const todayDate = `${String(currentDate.getMonth() + 1).padStart(2, '0')}/${String(currentDate.getDate()+1).padStart(2, '0')}/${currentDate.getFullYear()}`;

  return {
    todayDate,
    yesterdayDate,
    tomorrowDate,
  };
}

export const generateRandomUser = () => {
  const areaCode = faker.string.numeric(3); // Generate a 3-digit area code
  const exchangeCode = faker.string.numeric(3); // Generate a 3-digit exchange code
  const lineNumber = faker.string.numeric(4); // Generate a 4-digit line number
  const streetAddress = faker.location.streetAddress();
  const zipcode = faker.location.zipCode();
  const city = faker.location.city();

  const usPhoneNumber = `(${areaCode}) ${exchangeCode}-${lineNumber}`;
  const fullName = faker.person.fullName();
  const firstName = faker.person.firstName();
  const email = faker.internet.email();
  const middleName = faker.person.middleName();
  const lastName = faker.person.lastName();
  const recipientCode = faker.person.zodiacSign();
  const tenDigitNumber = faker.number.int({
    max: 9_999_999_999,
    min: 1_000_000_000,
  });
  const Description = faker.lorem.sentence(20);

  return {
    areaCode,
    city,
    zipcode,
    streetAddress,
    fullName,
    usPhoneNumber,
    email,
    Description,
    firstName,
    lastName,
    middleName,
    recipientCode,
    tenDigitNumber,
  };
};
