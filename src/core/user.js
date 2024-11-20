import Joi from "joi";

const userSchema = Joi.object({
  id: Joi.string().optional(),
  firstName: Joi.string().min(3).max(255).required(),
  lastName: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  createdAt: Joi.date().optional(),
});

export function validateUser(user) {
  const { error, value } = userSchema.validate(user, { abortEarly: false });

  if (error) {
    const messages = error.details.map((detail) => detail.message);

    throw new Error(`Validation errors: ${messages.join(",")}`);
  }

  return Object.freeze(value);
}

export function createUserService(userRepository) {
  const create = async (userData) => {
    const user = userRepository.generateId(validateUser(userData));

    await userRepository.save({ ...user, createdAt: new Date() });

    return { ...user, createdAt: new Date() };
  };

  const findAll = async () => userRepository.findAll();

  const findById = async (userId) => {
    if (!userId) throw new Error('Validation error: no "id"');

    return userRepository.findById(userId);
  };

  const findAndUpdate = async (userId, userUpdates) => {
    if (!userId) throw new Error('Validation error: no "id"');

    const { id } = await userRepository.findById(userId);

    if (id) return userRepository.update(id, userUpdates);

    throw new Error("Validation error: user not found");
  };

  const remove = async (userId) => {
    if (!userId) throw new Error('Validation error: no "id"');
    return userRepository.remove(userId);
  };

  const search = async (query) => {
    if (!query) throw new Error('Validation error: empty "_search"');

    return userRepository.search(query);
  };

  return { create, findAll, findById, findAndUpdate, remove, search };
}
