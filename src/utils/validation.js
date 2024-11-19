import { toSnakeCase } from "./convert-case";
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function checkMissingAndInvalidFields(data) {
  return Object.entries(data).reduce((acc, [key, value]) => {
    if (!value) acc.push(`${toSnakeCase(key)} is required.`);

    if (value?.length < 3)
      acc.push(`${toSnakeCase(key)} (${value}) is too short.`);

    if (key === "email" && !isValidEmail(value))
      acc.push(`${toSnakeCase(key)} (${value}) format is not valid.`);

    return acc;
  }, []);
}
