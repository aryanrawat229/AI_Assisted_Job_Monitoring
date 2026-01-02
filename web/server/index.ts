import express from "express";
import { apiKeyMiddleware } from "./middlewares/apiKeyMiddleware";
import jobRoutes from "./routes/jobs";
import { getDB } from "./services/db.service";

const app = express();

const PORT = process.env.PORT || 4000;
app.use(express.json());

// public
app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

// protected
app.use(apiKeyMiddleware);

app.use("/api/jobs", jobRoutes);

async function startServer() {
  try {
    await getDB();
    app.listen(PORT, () => {
      console.log("Server running on PORT:", PORT);
    });
  } catch (error) {
    console.error("Server startup failed", error);
    process.exit(1);
  }
}

startServer();
