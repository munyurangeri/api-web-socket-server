import createRepositoryPort from "../../core/ports/repository";
import validateUser from "../../core/user/model";
import { keysToSnakeCase } from "../../utils/convert-case";

const createUserRepository = () => {
  const users = new Map();
  let idCounter = 0;

  return {
    ...createRepositoryPort(),

    generateId(user) {
      const id = (++idCounter).toString();
      return { ...validateUser(user), id };
    },

    async save(user) {
      const data = validateUser(user);

      if (!data.id) throw new Error('Validation error: "id" is required');

      users.set(data.id, keysToSnakeCase(data));
    },

    async findById(userId) {
      return users.get(userId) || null;
    },

    async findAll() {
      return Array.from(users.values());
    },
  };
};

export default createUserRepository;
