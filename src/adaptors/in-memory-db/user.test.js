import { describe, expect, it } from "vitest";
import createUserRepository from "./user";
import { keysToSnakeCase } from "../../utils/convert-case";

describe("In-memory-db adaptor", () => {
  it("should generate and save USER with ID if all required fields are provided and valid", async () => {
    const { generateId, save } = createUserRepository();
    const data = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@adaptor.com",
      city: "New York",
      country: "USA",
    };

    const user = generateId(data);

    expect(user).toMatchObject(data);
    await expect(save(user)).resolves.not.toThrow();
  });

  it("should NOT generate USER with ID but THROW if User data NOT valid", () => {
    const { generateId } = createUserRepository();
    const data = { firstName: "J", email: "john.doe" };

    expect(() => generateId(data)).toThrow(/Validation errors/);
  });

  it("should NOT save USER but THROW if User ID is missing", async () => {
    const { save } = createUserRepository();
    const data = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@adaptor.com",
      city: "New York",
      country: "USA",
    };

    await expect(save(data)).rejects.toThrow(/Validation/);
  });

  it("should return User with ID equal to '1'", async () => {
    const { generateId, save, findById } = createUserRepository();
    const data = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@adaptor.com",
      city: "New York",
      country: "USA",
    };

    const user = generateId(data);
    await save(user);

    await expect(findById("1")).resolves.toMatchObject(keysToSnakeCase(user));
  });

  it("should return any array of Users of length of 1", async () => {
    const { generateId, save, findAll } = createUserRepository();
    const data = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@adaptor.com",
      city: "New York",
      country: "USA",
    };

    const user = generateId(data);
    const expected = [keysToSnakeCase(user)];
    await save(user);

    await expect(findAll()).resolves.toMatchObject(expected);
  });
});
