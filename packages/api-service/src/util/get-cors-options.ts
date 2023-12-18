const allowedOrigins = [
  "http://localhost:3000",
  "https://rtw-armory.fellowoftherings.com",
  "https://webapp-ehe4ffvi7q-uc.a.run.app",
];

export const corsOptions = () => {
  return {
    origin: function (origin: any, callback: any) {
      if (allowedOrigins.includes(origin)) {
        callback(null, [origin]);
      } else {
        throw new Error("Not allowed to access from current origin.");
      }
    },
  };
};
