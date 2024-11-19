import { describe, expect, it, vi } from "vitest";
import createUserService from "./service";

describe("User Service", () => {
  const userRepositoryMock = {
    generateId: vi.fn(),
    save: vi.fn(),
    findById: vi.fn(),
    findAll: vi.fn(),
  };

  const { create } = createUserService(userRepositoryMock);

  it("should add User and return the new record ID as string", async () => {
    // Arrange
    const userData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@service.com",
      city: "New York",
      country: "USA",
    };
    const expectedUser = { ...userData, id: "1", createdAt: expect.any(Date) };

    userRepositoryMock.generateId.mockReturnValue(expectedUser);
    userRepositoryMock.save.mockResolvedValue(undefined);

    // Act
    const result = await create(userData);

    // Assert
    expect(userRepositoryMock.generateId).toHaveBeenCalledWith(userData);
    expect(result).toEqual(expectedUser);
  });
});
