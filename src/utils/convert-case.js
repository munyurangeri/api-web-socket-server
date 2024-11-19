export function toCamelCase(input) {
  return input.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
}

export function toSnakeCase(input) {
  return input.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
}

export function keysToCamelCase(data) {
  const converted = Object.entries(data).reduce((acc, [key, value]) => {
    acc.push([toCamelCase(key), value]);

    return acc;
  }, []);

  return Object.fromEntries(converted);
}

export function keysToSnakeCase(data) {
  const converted = Object.entries(data).reduce((acc, [key, value]) => {
    acc.push([toSnakeCase(key), value]);

    return acc;
  }, []);

  return Object.fromEntries(converted);
}


