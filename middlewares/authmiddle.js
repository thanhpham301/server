import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // validate token
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    if (email) {
      req.jwt = { email };
      next();
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

export default authMiddleware;
