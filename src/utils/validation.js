import { BadRequestError } from "./app-errors";

export function isRequired(message) {
  if (message) throw new BadRequestError(message);

  throw new BadRequestError();
}
