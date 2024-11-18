import { describe, expect, it } from "vitest";
import createUser from "./user";

const userData = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  city: "New York",
  country: "USA",
};

describe("User", () => {
  it("should create user object if all required fields are provided", () => {
    const user = createUser(userData);

    expect(user).toMatchObject(userData);
    expect(user).toHaveProperty("firstName", "John");
    expect(user).not.toHaveProperty("location");
  });

  it("should throw error if any of required field is not provided", () => {
    expect(() => createUser({ id: "1" })).toThrow(/required/);
  });

  it("should throw error if you you mutate any user property", () => {
    const user = createUser(userData);

    expect(() => (user.id = 2)).toThrow(/read only/);
  });
});
