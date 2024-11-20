export default function createRepositoryPort() {
  return {
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
  };
}

export function createRepositoryMock(mock) {
  return {
    generateId: mock.fn(),
    save: mock.fn(),
    findById: mock.fn(),
    findAll: mock.fn(),
  };
}
