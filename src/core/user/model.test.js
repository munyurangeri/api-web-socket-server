import { describe, expect, it } from "vitest";
import validateUser from "./model";

const userData = {
  firstName: "John",
  lastName: "Doe ",
  email: "john.doe@model.com",
  city: "New York",
  country: "USA",
};

describe("User", () => {
  it("should create a valid object if all required fields are provided", () => {
    const user = validateUser(userData);

    expect(user).toMatchObject(userData);
    expect(user).toHaveProperty("firstName", "John");
    expect(user).not.toHaveProperty("location");
  });

  it("should throw error if any of required field is not provided nor valid", () => {
    expect(() =>
      validateUser({ firstName: "J", email: "john.doe@model" })
    ).toThrow(/Validation errors/);
  });

  it("should throw error if you you mutate any user property", () => {
    const user = validateUser(userData);

    expect(() => (user.firstName = "Peter")).toThrow(/read only/);
  });
});
