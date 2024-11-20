export function flatPromise(promise, errorsToCatch) {
  return promise
    .then((data) => [undefined, data])
    .catch((error) => {
      if (!errorsToCatch || errorsToCatch.length === 0) return [error];

      if (errorsToCatch.some((e) => error instanceof e)) return [error];

      throw error;
    });
}

export function paginate(page, perPage, data) {
  if (!Number.isInteger(page) || page < 1 || !Number.isInteger(perPage))
    throw new Error('Validation error: "_page" should at least be 1');

  const start = (page - 1) * perPage;
  const end = start + perPage;
  const sliced = data.slice(start, end);
  const totalItems = data.length;

  return {
    page: page,
    per_page: perPage,
    next: end < totalItems ? page + 1 : null,
    previous: page - 1 >= 1 ? page - 1 : null,
    first: totalItems ? 1 : null,
    last: Math.ceil(totalItems / perPage),
    items: totalItems,
    data: sliced,
  };
}
