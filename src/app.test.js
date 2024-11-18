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
      const response = await request(server)
        .get("/api/users")
        .query({ _page: 2, _per_page: 20, _search: "dupond dupont" });

      console.log(response.body);

      expect(response.status).toBe(status.OK);
    });

    it("should add a new user", async () => {
      const response = await request(app)
        .post("/api/users")
        .send({ name: "Umutoni Caka" });

      expect(response.status).toBe(status.CREATED);
    });
  });
});
