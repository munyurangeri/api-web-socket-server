import createRepositoryPort from "../../core/repository-port";
import { validateUser } from "../../core/user";
import { keysToSnakeCase } from "../../utils/convert-case";
import { BadRequestError } from "../../http-errors";

export default function createUserRepository() {
  const users = new Map();
  let idCounter = 0;

  const generateId = (user) => {
    const id = (++idCounter).toString();
    return { ...validateUser(user), id };
  };

  const save = async (user) => {
    const data = validateUser(user);

    if (!data.id) throw new BadRequestError();

    users.set(data.id, keysToSnakeCase(data));
  };

  const findById = async (userId) => {
    return users.get(userId) || null;
  };

  const findAll = async () => {
    return Array.from(users.values());
  };

  const search = async (query) => {
    return Array.from(users.values()).filter((el) => {
      return (
        el.first_name?.includes(query) ||
        el.last_name?.includes(query) ||
        el.city?.includes(query) ||
        el.country?.includes(query)
      );
    });
  };

  const remove = async (userId) => {
    users.delete(userId);
  };

  return {
    ...createRepositoryPort(),
    generateId,
    save,
    findById,
    findAll,
    remove,
    search,
  };
}
