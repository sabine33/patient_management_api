import Logger from "@/loaders/logger.loader";
import express from "express";
import process from "process";
import config from "@/config";
import customExpress from "./customExpress";
const app = express();

/**
 * Adding features to express response
 */
const customExpressResponse = Object.create(app.response, customExpress);

//override express response
app.response = Object.create(customExpressResponse);

export const server = app
  .listen(config.port || 3000, async () => {
    await require("./loaders").default({ expressApp: app });

    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
  })
  .on("error", async (err) => {
    Logger.error(err);
    process.exit(1);
  });

process.on("SIGTERM", () => {
  console.info("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.info("HTTP server closed");
  });
});

process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });
