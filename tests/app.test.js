import request from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import status from "http-status";
import app from "../src/app";

const TEST_SERVER_PORT = 3500;

describe("API", () => {
  let server;
  beforeAll(() => {
    server = app.listen(TEST_SERVER_PORT);
  });

  afterAll(() => server.close());

  describe("Users", () => {
    it("should return all users", async () => {
      const response = await request(server).get("/api/users");

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
