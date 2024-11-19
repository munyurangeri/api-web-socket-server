import createUser from "./model";

const createUserService = (userRepository) => {
  return {
    async create(userData) {
      const userModel = createUser(userData);
      const user = userRepository.generateId(userModel);

      await userRepository.save({ ...user, createdAt: new Date() });

      return { ...user, createdAt: new Date() };
    },

    async findAll() {
      return userRepository.findAll();
    },

    async findById(userId) {
      return userRepository.findById(userId);
    },
  };
};

export default createUserService;
