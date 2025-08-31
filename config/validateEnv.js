import { REQUIRED_ENV_VARS } from "./requiredEnv.js";

export function validateEnv(env) {
  const missing = REQUIRED_ENV_VARS.filter((key) => !env[key]);

  if (missing.length > 0) {
    console.error("Missing required environment variables:", missing.join(", "));
    process.exit(1); 
  }
  console.log("All required environment variables are set.");
}
