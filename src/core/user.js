import Joi from "joi";
import { BadRequestError, NotFoundError } from "../utils/app-errors";
import { toSnakeCase } from "../utils/convert-case";

const { object, string, date } = Joi.types();

const userSchema = object.keys({
  id: string.optional(),
  firstName: string.min(3).max(255).required(),
  lastName: string.min(3).max(255).required(),
  email: string.email().required(),
  city: string.required(),
  country: string.required(),
  createdAt: date.optional(),
});

export function createUser(userData) {
  const { error, value } = userSchema.validate(userData, { abortEarly: false });

  if (error) {
    const messages = error.details.map((detail) => toSnakeCase(detail.message));

    throw new BadRequestError("Invalid user object", `${messages.join(",")}`);
  }

  return Object.freeze(value);
}

export function createUserService(userRepository) {
  const create = async (userData) => {
    const user = userRepository.generateId(createUser(userData));

    await userRepository.save({ ...user, createdAt: new Date() });

    return { ...user, createdAt: new Date() };
  };

  const findAll = async () => userRepository.findAll();

  const findById = async (userId) => {
    if (!userId) throw new NotFoundError("User");

    return userRepository.findById(userId);
  };

  const findAndUpdate = async (userId, userUpdates) => {
    if (!userId) throw new BadRequestError();

    const { id } = await userRepository.findById(userId);

    if (id) return userRepository.update(id, userUpdates);

    throw new NotFoundError("User");
  };

  const remove = async (userId) => {
    if (!userId) throw new BadRequestError();
    return userRepository.remove(userId);
  };

  const search = async (query) => {
    if (!query) throw new BadRequestError();

    return userRepository.search(query);
  };

  return { create, findAll, findById, findAndUpdate, remove, search };
}
