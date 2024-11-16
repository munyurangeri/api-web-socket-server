import express from "express";
import authorize from "../middleware/authorization.js";
import { getAllUsers, createUser } from "../controllers/users.js";

const ROLES = ["guest"];

const router = express.Router();

router.get("/", authorize([...ROLES, "admin", "user"]), getAllUsers);
router.post("/", authorize([...ROLES, "admin"]), createUser);

export default router;
