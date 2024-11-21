import { describe, expect, it } from "vitest";
import createUserRepository from "./user";
import { keysToSnakeCase } from "../../utils/convert-case";
import { fakeValidUser, fakeInvalidUser } from "../../utils/fakers";

describe("In-memory-db adaptor", () => {
  it("should generate and save USER with ID if all required fields are provided and valid", async () => {
    const { generateId, save } = createUserRepository();
    const data = fakeValidUser();

    const user = generateId(data);

    expect(user).toMatchObject(data);
    await expect(save(user)).resolves.not.toThrow();
  });

  it("should NOT generate USER with ID but THROW if User data NOT valid", () => {
    const { generateId } = createUserRepository();
    const data = fakeInvalidUser();

    expect(() => generateId(data)).toThrow();
  });

  it("should NOT save USER but THROW if User ID is missing", async () => {
    const { save } = createUserRepository();
    const data = fakeValidUser();

    await expect(save(data)).rejects.toThrow();
  });

  it("should return User with ID equal to '1'", async () => {
    const { generateId, save, findById } = createUserRepository();
    const data = fakeValidUser();

    const user = generateId(data);
    await save(user);

    await expect(findById("1")).resolves.toMatchObject(keysToSnakeCase(user));
  });

  it("should return any array of Users of length of 1", async () => {
    const { generateId, save, findAll } = createUserRepository();
    const data = fakeValidUser();

    const user = generateId(data);
    const expected = [keysToSnakeCase(user)];
    await save(user);

    await expect(findAll()).resolves.toMatchObject(expected);
  });
});
