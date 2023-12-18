import cors from "cors";
const allowedOrigins = [
  "http://localhost:3000",
  "https://rtw-armory.fellowoftherings.com",
  "https://webapp-ehe4ffvi7q-uc.a.run.app",
];

export const corsMiddleware = () => {
  return cors({
    credentials: true,
    origin(origin, callback) {
      if (origin) {
        if (allowedOrigins.includes(origin)) {
          callback(null, [origin]);
        } else {
          throw new Error("Not allowed to access from current origin.");
        }
      }
    },
  });
};
