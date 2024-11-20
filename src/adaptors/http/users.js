import status from "http-status";
import { keysToCamelCase, keysToSnakeCase } from "../../utils/convert-case.js";
import { flatPromise, paginate } from "./helpers.js";

const createUserController = (Repository) => ({
  async getAllUsers(req, res) {
    const { findAll } = Repository;
    let { _page, _per_page } = req.query;
    const data = await findAll();

    if (!_page) return res.status(status.OK).json(data);

    _page = parseInt(_page) || 1;
    _per_page = parseInt(_per_page) || 20;
    const result = paginate(_page, _per_page, data);

    res.status(status.OK).json(result);
  },

  async getUserById(req, res, next) {
    const { findById } = Repository;
    const { id } = req.params;
    const [error, user] = await flatPromise(findById(id));

    if (error) return next(error);

    res.status(status.OK).json(user);
  },

  async searchUsers(req, res, next) {
    const { search } = Repository;
    let { _search } = req.query;
    const [error, users] = await flatPromise(search(_search));

    if (error) return next(error);

    res.status(status.OK).json(users);
  },

  async addUser(req, res, next) {
    const { create } = Repository;
    const [error, user] = await flatPromise(create(keysToCamelCase(req.body)));

    if (error) return next(error);

    res.status(status.CREATED).json({ user: keysToSnakeCase(user) });
  },

  async removeUserById(req, res, next) {
    const { remove } = Repository;
    const { id } = req.params;
    const [error] = await flatPromise(remove(id));

    if (error) return next(error);

    res.status(status.OK).json({ message: "user deleted" });
  },
});

export default createUserController;
