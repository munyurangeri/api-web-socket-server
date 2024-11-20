import request from "supertest";
import status from "http-status";
import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} from "vitest";
import app from "../src/app";
import { fakeValidUser, fakeInvalidUser } from "../src/core/user.test";
import { keysToSnakeCase } from "../src/utils/convert-case";

const TEST_SERVER_PORT = 3500;

describe("API", () => {
  let server;
  beforeEach(() => {
    server = app.listen(TEST_SERVER_PORT);
  });

  afterEach(() => server.close());

  describe("Users API routes", () => {
    describe("Add/Delete USER", () => {
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

      it("should delete USER with ID '100", async () => {
        const data = keysToSnakeCase(fakeValidUser());
        await request(app).post("/api/users").send(data);

        const response = await request(server).delete("/api/users/100");

        expect(response.status).toBe(status.OK);
      });
    });

    describe("Get users", () => {
      it("should return all users", async () => {
        const data = keysToSnakeCase(fakeValidUser());
        await request(app).post("/api/users").send(data);
        for (let i = 0; i < 9; i++)
          await request(app)
            .post("/api/users")
            .send(keysToSnakeCase(fakeValidUser()));

        const response = await request(server)
          .get("/api/users")
          .query({ _page: 1, _per_page: 1 });

        expect(response.status).toBe(status.OK);
        expect(response.body.next).toBe(2);
        Object.keys(data).forEach((key) => {
          expect(response.body.data[0]).toHaveProperty(key);
        });
      });

      it("should return user with ID '1'", async () => {
        const data = keysToSnakeCase(fakeValidUser());
        await request(app).post("/api/users").send(data);

        const response = await request(server).get("/api/users/1");

        expect(response.status).toBe(status.OK);
        expect(response.body.id).toBe("1");
      });
    });

    describe("Search users", () => {
      it("should return found users", async () => {
        const data = keysToSnakeCase(fakeValidUser());
        await request(app).post("/api/users").send(data);
        for (let i = 0; i < 9; i++)
          await request(app)
            .post("/api/users")
            .send(keysToSnakeCase(fakeValidUser()));

        const response = await request(server)
          .get("/api/users/search")
          .query({ _search: data.first_name });

        expect(response.status).toBe(status.OK);
        Object.keys(data).forEach((key) => {
          expect(response.body[0]).toHaveProperty(key);
        });
      });

      it("should return bad request if no search query provided", async () => {
        const response = await request(server).get("/api/users/search");

        expect(response.status).toBe(status.BAD_REQUEST);
      });
    });
  });
});
