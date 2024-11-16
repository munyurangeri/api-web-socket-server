import status from "http-status";

const ACCESS_LIST = {
  admin: {
    "/api/users": ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },

  guest: {
    "/api/users": ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },

  user: { "/api/users": ["GET"] },
};

const authorize = (roles) => {
  return (req, res, next) => {
    const userRole = req.headers["x-user-role"] || "guest";
    const permissions = roles.includes(userRole) ? ACCESS_LIST[userRole] : null;

    if (!permissions || !permissions[req.baseUrl].includes(req.method))
      return res.status(status.FORBIDDEN).json({ error: "Access denied!!!" });

    next();
  };
};

export default authorize;
