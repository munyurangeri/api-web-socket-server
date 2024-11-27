/* eslint-disable no-unused-vars */
export default function createRepositoryPort() {
  return {
    generateId(_data) {
      throw new Error("generateId() not implemented");
    },

    save(_data) {
      return Promise.reject(new Error("save() not implemented"));
    },

    findById(_id) {
      return Promise.reject(new Error("findById() not implemented"));
    },

    findAll() {
      return Promise.reject(new Error("findAll() not implemented"));
    },
    update(_id, _data) {
      return Promise.reject(new Error("update() not implemented"));
    },
    remove(_id) {
      return Promise.reject(new Error("remove() not implemented"));
    },
    search(_query) {
      return Promise.reject(new Error("search() not implemented"));
    },
    emptyDB() {
      return Promise.reject(new Error("emptyDB() not implemented"));
    },
  };
}

export function createRepositoryMock(mock = isRequired()) {
  return {
    generateId: mock.fn(),
    save: mock.fn(),
    findById: mock.fn(),
    findAll: mock.fn(),
    update: mock.fn(),
    remove: mock.fn(),
    search: mock.fn(),
    emptyDB: mock.fn(),
  };
}

function isRequired() {
  throw new Error(
    "Mock object with fn function is required. Use vitest vi or jest"
  );
}
