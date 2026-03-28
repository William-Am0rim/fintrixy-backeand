import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { config } from "./config";
import swaggerSpec from "./config/swagger";
import routes from "./routes";
import { globalErrorHandler, notFound } from "./middlewares/error.middleware";

const app = express();

app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    "http://localhost:3000",
    "https://fintrixy-frontend-9rrf.vercel.app",
  ];
  
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", allowedOrigins[1]);
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.options("*", (req, res) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    "http://localhost:3000",
    "https://fintrixy-frontend-9rrf.vercel.app",
  ];
  
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", allowedOrigins[1]);
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.status(204).end();
});

app.use(cors({
  origin: ["http://localhost:3000", "https://fintrixy-frontend-9rrf.vercel.app"],
  credentials: true,
}));

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: "Too many requests, please try again later." },
});
app.use("/api", limiter);

app.use(morgan(config.nodeEnv === "development" ? "dev" : "combined"));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

/**
 * @swagger
 * /:
 *   get:
 *     summary: API Health Check
 *     responses:
 *       200:
 *         description: API is healthy
 */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Fintrixy API is running",
    version: "1.0.0",
    documentation: "/api-docs",
  });
});

/**
 * @swagger
 * /api-docs:
 *   get:
 *     summary: API Documentation
 *     responses:
 *       200:
 *         description: Swagger UI loaded
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "Fintrixy API Documentation",
}));

app.use("/api", routes);

app.use(notFound);
app.use(globalErrorHandler);

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
  console.log(`🌍 Environment: ${config.nodeEnv}`);
});

export default app;
