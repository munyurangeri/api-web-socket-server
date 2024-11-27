import createRepositoryPort from "../../core/repository-port";
import { User } from "../../core/user";
import { keysToSnakeCase } from "../../utils/convert-case";
import { BadRequestError } from "../../../src/utils/http-errors";

export default function createUserRepository() {
  const users = new Map();
  let idCounter = 0;

  const generateId = (userData) => {
    const id = (++idCounter).toString();
    return { ...User(userData), id };
  };

  const save = async (userData) => {
    const user = User(userData);

    if (!user.id) throw new BadRequestError();

    users.set(user.id, keysToSnakeCase(user));
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

  const clear = async () => {
    users.clear();
    idCounter = 0;
  };

  return {
    ...createRepositoryPort(),
    generateId,
    save,
    findById,
    findAll,
    remove,
    search,
    clear,
  };
}
