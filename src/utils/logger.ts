import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, printf, errors, colorize } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  return `${timestamp} [${level}] ${stack || message} ${
    Object.keys(meta).length ? JSON.stringify(meta) : ""
  }`;
});

const fileFormat = combine(
  timestamp(),
  errors({ stack: true }),
  logFormat
);

const consoleFormat = combine(
  colorize({ all: true }),
  timestamp(),
  errors({ stack: true }),
  logFormat
);

const fileTransport = new DailyRotateFile({
  filename: "logs/log-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: false,
  maxSize: "10m",   // 10MB
  maxFiles: "30d",  // retain logs for 30 days
  format: fileFormat
});

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  transports: [
    new winston.transports.Console({ format: consoleFormat }),
    fileTransport
  ]
});