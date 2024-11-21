import { describe, it, expect, vi, afterEach } from "vitest";
import { fakeValidUser, fakeInvalidUser } from "../utils/fakers";
import { validateUser, createUser } from "./user";
import { createRepositoryMock } from "./repository-port";

describe("User", () => {
  afterEach(() => vi.restoreAllMocks());

  describe("Validate", () => {
    it("should validate User object and return it frozen IF valid", () => {
      const userObj = fakeValidUser();

      const user = validateUser(userObj);

      expect(user).toEqual(userObj);
    });

    it("should throw error if any of required field is not provided nor valid", () => {
      expect(() => validateUser(fakeInvalidUser())).toThrow();
    });

    it("should throw error if you you mutate any user property", () => {
      const userObj = fakeValidUser();

      const user = validateUser(userObj);

      expect(() => (user.firstName = "Peter")).toThrow(/read only/);
    });
  });

  describe("Create", () => {
    const repoMock = createRepositoryMock(vi);
    // eslint-disable-next-line no-unused-vars
    const { create, findById, findAll, findAndUpdate, remove } =
      createUser(repoMock);

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
