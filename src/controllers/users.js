import status from "http-status";
import { broadcast } from "../websocket.js";

export const getAllUsers = (req, res) => {
  res.status(status.OK).json([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
  ]);
};

export const createUser = (req, res) => {
  const { name } = req.body;

  if (!name)
    return res.status(status.BAD_REQUEST).json({ error: "Name is required" });

  const user = { id: new Date().getTime(), name };

  broadcast("new-user", user);

  res.status(status.CREATED).json(user);
};
