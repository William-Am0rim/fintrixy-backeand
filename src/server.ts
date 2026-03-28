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

app.use(helmet());
const allowedOriginsList = process.env.ALLOWED_ORIGINS?.split(",").map(origin => 
  origin.trim()
) || [];

function normalizeOrigin(origin: string): string {
  if (!origin) return origin;
  if (!origin.startsWith('http')) {
    return `https://${origin}`;
  }
  return origin;
}

function getAllowedOrigins(): string[] {
  const defaults = ["http://localhost:3000"];
  if (allowedOriginsList.length === 0) return defaults;
  return [...allowedOriginsList.map(normalizeOrigin), ...defaults];
}

app.use((req, res, next) => {
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }
      const normalizedOrigin = normalizeOrigin(origin);
      const allowedOrigins = getAllowedOrigins();
      
      if (allowedOrigins.includes(normalizedOrigin) || allowedOrigins.includes('*')) {
        callback(null, normalizedOrigin);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS policy`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })(req, res, next);
});

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
