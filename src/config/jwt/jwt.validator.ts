import { NextFunction, Request, Response } from "express";
import { verify, JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  uid?: string;
  name?: string;
}

export const jwtValidator = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "There's no token in the request !!",
    });
  }

  try {
    const payload = verify(token, process.env.JWT_SEED!) as JwtPayload;
    req.uid = payload.uid as string;
    req.name = payload.name as string;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "No valid token !!",
    });
  }

  next();
};
