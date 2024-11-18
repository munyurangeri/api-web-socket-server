import status from "http-status";
import { broadcast } from "../websocket.js";

export const createUser = (req, res) => {
  const { name } = req.body;

  if (!name)
    return res.status(status.BAD_REQUEST).json({ error: "Name is required" });

  const user = { id: new Date().getTime(), name };

  broadcast("new-user", user);

  res.status(status.CREATED).json(user);
};

export const getAllUsers = (req, res) => {
  let { _page, _per_page, _search = "" } = req.query;

  if (_search) {
    // TODO: Implement searching/filter and send result as response!
    console.log(`searching ${_search}...`);
  }

  _page = parseInt(_page) || 1;
  _per_page = parseInt(_per_page) || 20;

  const start = (_page - 1) * _per_page;
  const end = start + _per_page;
  const totalItems = 120;

  // TODO: Query and send found data

  res.status(status.OK).json({
    page: _page,
    per_page: _per_page,
    next: _page + 1,
    previous: _page - 1 >= 1 ? _page - 1 : null,
    first: 1,
    last: Math.ceil(totalItems / _per_page),
    items: totalItems,
    data: [],
  });
};
