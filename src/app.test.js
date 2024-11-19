import request from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import status from "http-status";
import app from "./app";

const TEST_SERVER_PORT = 3500;

describe("API", () => {
  let server;
  beforeAll(() => {
    server = app.listen(TEST_SERVER_PORT);
  });

  afterAll(() => server.close());

  describe("Users", () => {
    it("should return all users", async () => {
      const data = {
        first_name: "Caka",
        last_name: "Umutoni",
        email: "caka.umutoni@fakemail.com",
        city: "Oklahoma",
        country: "USA",
      };

      await request(app).post("/api/users").send(data);
      await request(app).post("/api/users").send(data);
      await request(app).post("/api/users").send(data);

      const response = await request(server)
        .get("/api/users")
        .query({ _page: 1, _per_page: 1, _search: "dupond dupont" });

      // console.log(response.body);

      expect(response.status).toBe(status.OK);
      expect(response.body.next).toBe(2);
      Object.keys(data).forEach((key) => {
        expect(response.body.data[0]).toHaveProperty(key);
      });
    });

    it("should add a new user", async () => {
      const data = {
        first_name: "Caka",
        last_name: "Umutoni",
        email: "caka.umutoni@fakemail.com",
        city: "Oklahoma",
        country: "USA",
      };

      const response = await request(app).post("/api/users").send(data);

      expect(response.status).toBe(status.CREATED);
      Object.keys(data).forEach((key) => {
        expect(response.body.user).toHaveProperty(key);
      });
    });

    it("should NOT add a new user IF any REQUIRED field is missing", async () => {
      const response = await request(app).post("/api/users").send({});

      expect(response.status).toBe(status.BAD_REQUEST);
      expect(response.body.message).toContain('"first_name"');
    });
  });
});
