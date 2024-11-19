const createRepositoryPort = () => ({
  generateId(data) {
    throw new Error("generateId() not implemented");
  },

  save(data) {
    return Promise.reject(new Error("save() not implemented"));
  },

  findById(id) {
    return Promise.reject(new Error("findById() not implemented"));
  },

  findAll() {
    return Promise.reject(new Error("findAll() not implemented"));
  },
});

export default createRepositoryPort;
