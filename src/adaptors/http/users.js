import status from "http-status";
import { keysToCamelCase, keysToSnakeCase } from "../../utils/convert-case.js";

const createUserController = ({ create, findAll }) => ({
  async getAllUsers(req, res) {
    let { _page, _per_page, _search = "" } = req.query;

    if (_search) {
      // TODO: Implement searching/filter and send result as response!
      console.log(`searching ${_search}...`);
    }

    _page = parseInt(_page) || 1;
    _per_page = parseInt(_per_page) || 20;

    const start = (_page - 1) * _per_page;
    const end = start + _per_page;

    const data = await findAll();
    const sliced = data.slice(start, end);
    const totalItems = data.length;

    res.status(status.OK).json({
      page: _page,
      per_page: _per_page,
      next: end < totalItems ? _page + 1 : null,
      previous: _page - 1 >= 1 ? _page - 1 : null,
      first: totalItems ? 1 : null,
      last: Math.ceil(totalItems / _per_page),
      items: totalItems,
      data: sliced,
    });
  },

  async addUser(req, res, next) {
    try {
      const user = await create(keysToCamelCase(req.body));
      res.status(status.CREATED).json({ user: keysToSnakeCase(user) });
    } catch (error) {
      next(error);
    }
  },
});

export default createUserController;
