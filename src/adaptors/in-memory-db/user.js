import createRepositoryPort from "../../core/repository-port";
import { validateUser } from "../../core/user";
import { keysToSnakeCase } from "../../utils/convert-case";

export default function createUserRepository() {
  const users = new Map();
  let idCounter = 0;

  const generateId = (user) => {
    const id = (++idCounter).toString();
    return { ...validateUser(user), id };
  };

  const save = async (user) => {
    const data = validateUser(user);

    if (!data.id) throw new Error('Validation error: "id" is required');

    users.set(data.id, keysToSnakeCase(data));
  };

  const findById = async (userId) => {
    return users.get(userId) || null;
  };

  const findAll = async () => {
    return Array.from(users.values());
  };

  return {
    ...createRepositoryPort(),
    generateId,
    save,
    findById,
    findAll,
  };
}
