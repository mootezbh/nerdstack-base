import app from "./app";
import { env } from "./config/env";

const PORT = env.PORT ?? 3000;

async function start() {
  try {
    const server = app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT} (env=${env.NODE_ENV})`);
    });

    const graceful = () => {
      console.log("Shutting down...");
      server.close(() => process.exit(0));
    };

    process.on("SIGINT", graceful);
    process.on("SIGTERM", graceful);
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
