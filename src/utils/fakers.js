import { faker } from "@faker-js/faker";

export function fakeValidUser() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    city: faker.location.city(),
    country: faker.location.country(),
  };
}

export function fakeInvalidUser() {
  return {};
}