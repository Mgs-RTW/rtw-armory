import { Request, Response, NextFunction } from "express";
const allowedOrigins = [
  "http://localhost:3000",
  "https://rtw-armory.fellowoftherings.com",
  "https://webapp-ehe4ffvi7q-uc.a.run.app",
];

function applyCors(req: Request, res: Response) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
}

export const corsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.origin && allowedOrigins.includes(req.headers.origin)) {
    applyCors(req, res);
  }

  next();
};
