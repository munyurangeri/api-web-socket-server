import { NotImplementedError } from "../../utils/app-errors";
import { isRequired } from "../../utils/validation";

/* eslint-disable no-unused-vars */
export default function createRepositoryPort() {
  return {
    generateId(_data) {
      throw new NotImplementedError("generateId() not implemented");
    },

    save(_data) {
      return Promise.reject(new NotImplementedError("save() not implemented"));
    },

    findById(_id) {
      return Promise.reject(
        new NotImplementedError("findById() not implemented")
      );
    },

    findAll() {
      return Promise.reject(
        new NotImplementedError("findAll() not implemented")
      );
    },
    update(_id, _data) {
      return Promise.reject(
        new NotImplementedError("update() not implemented")
      );
    },
    remove(_id) {
      return Promise.reject(
        new NotImplementedError("remove() not implemented")
      );
    },
    search(_query) {
      return Promise.reject(
        new NotImplementedError("search() not implemented")
      );
    },
    emptyDB() {
      return Promise.reject(
        new NotImplementedError("emptyDB() not implemented")
      );
    },
  };
}

export function createRepositoryMock(
  mock = isRequired("Mock object with fn function is required.")
) {
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
