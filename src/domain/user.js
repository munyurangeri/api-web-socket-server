const createUser = ({ id, firstName, lastName, email, city, country }) => {
  const requiredField = { firstName, lastName, email, city, country };

  for (const [key, value] of Object.entries(requiredField)) {
    if (!value)
      throw new Error(
        `${key.charAt(0).toUpperCase() + key.slice(1)} is required`
      );
  }

  return Object.freeze({ id, ...requiredField });
};

export default createUser;
