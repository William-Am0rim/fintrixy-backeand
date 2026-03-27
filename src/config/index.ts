import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "4000"),
  nodeEnv: process.env.NODE_ENV || "development",
  jwt: {
    secret: process.env.JWT_SECRET || "default-secret-change-me",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },
  cors: {
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
    
  },
  database: {
    url: process.env.DATABASE_URL || "",
  },
};
