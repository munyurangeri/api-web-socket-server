import request from "supertest";
import status from "http-status";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import app from "./app";
import { fakeValidUser, fakeInvalidUser } from "./core/user.test";
import { keysToSnakeCase } from "./utils/convert-case";

const TEST_SERVER_PORT = 3500;

describe("API", () => {
  let server;
  beforeAll(() => {
    server = app.listen(TEST_SERVER_PORT);
  });

  afterAll(() => server.close());

  describe("Users", () => {
    it("should return all users", async () => {
      const data = keysToSnakeCase(fakeValidUser());
      await request(app).post("/api/users").send(data);
      for (let i = 0; i < 9; i++)
        await request(app)
          .post("/api/users")
          .send(keysToSnakeCase(fakeValidUser()));

      const response = await request(server)
        .get("/api/users")
        .query({ _page: 1, _per_page: 1, _search: "dupond dupont" });

      expect(response.status).toBe(status.OK);
      expect(response.body.next).toBe(2);
      Object.keys(data).forEach((key) => {
        expect(response.body.data[0]).toHaveProperty(key);
      });
    });

    it("should add a new user", async () => {
      const data = keysToSnakeCase(fakeValidUser());

      const response = await request(app).post("/api/users").send(data);

      expect(response.status).toBe(status.CREATED);
      Object.keys(data).forEach((key) => {
        expect(response.body.user).toHaveProperty(key);
      });
    });

    it("should NOT add a new user IF any REQUIRED field is missing", async () => {
      const response = await request(app)
        .post("/api/users")
        .send(keysToSnakeCase(fakeInvalidUser()));

      expect(response.status).toBe(status.BAD_REQUEST);
      expect(response.body.message).toContain('"first_name"');
    });
  });
});
