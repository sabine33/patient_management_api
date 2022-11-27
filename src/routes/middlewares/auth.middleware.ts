import jwt from "jsonwebtoken";
import config from "@/config";

const getTokenFromHeader = (req) => {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

export const isAuthenticated = (req, res, next) => {
  const bearerToken = getTokenFromHeader(req);
  if (!bearerToken) {
    return res.error({
      message: "A token is required for authentication.",
      statusCode: 403,
    });
  }
  try {
    const decoded = jwt.verify(bearerToken, config.tokenKey);
    req.user = decoded;
  } catch (err) {
    return res.error({
      message: "The token you provided is not valid.",
      statusCode: 403,
    });
  }
  return next();
};
