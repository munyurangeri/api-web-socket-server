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
  const findById = async (userId) => userRepository.findById(userId);

  return { create, findAll, findById };
}
