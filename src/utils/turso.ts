import type { RequestEventBase } from "@builder.io/qwik-city";
import { createClient, type Client } from "@libsql/client";

export function tursoClient(requestEvent: RequestEventBase): Client {
  const url = requestEvent.env.get("PRIVATE_TURSO_DATABASE_URL")?.trim();
  if (url === undefined) {
    console.error("PRIVATE_TURSO_DATABASE_URL is not defined");
    throw new Error("Database configuration is missing. Please check your environment variables.");
  }

  const authToken = requestEvent.env.get("PRIVATE_TURSO_AUTH_TOKEN")?.trim();
  if (authToken === undefined) {
    if (!url.includes("file:")) {
      console.error("PRIVATE_TURSO_AUTH_TOKEN is not defined");
      throw new Error("Database authentication is missing. Please check your environment variables.");
    }
  }

  try {
    return createClient({
      url,
      authToken,
    });
  } catch (error) {
    console.error("Failed to create Turso client:", error);
    throw new Error("Failed to connect to database. Please check your configuration.");
  }
}
