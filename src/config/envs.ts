import "dotenv/config";
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),

  MONGO_DB_CONNECTION: get("MONGO_DB_CONNECTION").required().asString(),

  JWT_SEED: get("JWT_SEED").required().asString(),
};
