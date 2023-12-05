"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const port = Number(process.env.PORT) || 8000;
const server = app_1.default.listen(() => {
    console.log(`api-service running on ${port}`);
});
process.on("SIGTERM", () => {
    server.close((error) => {
        if (error) {
            console.error("Error shutting down server: ", error.message);
        }
        else {
            console.log("api-service shut down successfully");
        }
    });
});
