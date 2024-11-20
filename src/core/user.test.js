import { describe, it, expect, vi, afterEach } from "vitest";
import { faker } from "@faker-js/faker";
import { validateUser, createUserService } from "./user";
import { createRepositoryMock } from "./repository-port";

describe("User domain", () => {
  afterEach(() => vi.restoreAllMocks());

  describe("Model", () => {
    it("should validate User object and return it frozen IF valid", () => {
      const userObj = fakeValidUser();

      const user = validateUser(userObj);

      expect(user).toEqual(userObj);
    });

    it("should throw error if any of required field is not provided nor valid", () => {
      expect(() => validateUser(fakeInvalidUser())).toThrow(
        /Validation errors/
      );
    });

    it("should throw error if you you mutate any user property", () => {
      const userObj = fakeValidUser();

      const user = validateUser(userObj);

      expect(() => (user.firstName = "Peter")).toThrow(/read only/);
    });
  });

  describe("Service", () => {
    const repoMock = createRepositoryMock(vi);
    // eslint-disable-next-line no-unused-vars
    const { create, findById, findAll, findAndUpdate, remove } =
      createUserService(repoMock);

    it("should add/create and return a USER object", async () => {
      const userObj = fakeValidUser();
      const expectedUser = { ...userObj, id: "1", createdAt: expect.any(Date) };

      repoMock.generateId.mockReturnValue(expectedUser);
      repoMock.save.mockResolvedValue(undefined);

      const result = await create(userObj);

      expect(repoMock.generateId).toHaveBeenCalledWith(userObj);
      expect(result).toEqual(expectedUser);
    });

    // TODO: Test findById, findAll, findAndUpdate and remove functions
  });
});

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
