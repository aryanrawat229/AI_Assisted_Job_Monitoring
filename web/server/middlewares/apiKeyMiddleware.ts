import type { Request, Response, NextFunction } from "express";

export function apiKeyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiKey = req.header("x-api-key");

  if (!apiKey) {
    res.status(401).json({ error: "API key missing" });
    return;
  }

  if (apiKey !== process.env.API_KEY) {
    res.status(403).json({ error: "Invalid API key" });
    return;
  }

  next();
}
