import config from "config";
import { CookieOptions } from "express";
import path from "path";
export const BASE_DIR = process.cwd();
export const MEDIA_ROOT = path.join(BASE_DIR, "media");
export const MEDIA_URL = "media";
export const PROFILE_URL = "uploads";
export const OAUTH_REDIRECT_URL = "http://localhost:3000";

export const configuration = {
  version: require("./../../package.json").version,
  name: require("./../../package.json").name,
  nameAliase: config.get("name"),
  db: config.get("db") as string | undefined | null,
  port: config.get("port") as string | undefined | null,
  registry: {
    url: config.get("registry.url") as string,
    version: config.get("registry.version") as string,
  },
  oauth: {
    google_id: config.get("google_client_id") as string,
    google_secrete: config.get("google_client_secrete") as string,
    github_id: config.get("github_client_id") as string,
    github_secrete: config.get("github_client_secrete") as string,
    auth_secrete: config.get("auth_secrete") as string,
    access_token_age: config.get("token.access_expiry") as string,
    refresh_token_age: config.get("token.refresh_expiry") as string,
  },
  authCookieConfig: {
    name: "session-token",
    config: {
      MAX_AGE: 30 * 24 * 60 * 60,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    } as CookieOptions,
  },
};
export {
  isValidURL,
  parseMessage,
  registry,
  expressMulterFileToFile,
  multerMemoryFilesToFileArray,
  objectToFormData,
} from "./helpers";
export { default as dbHelpers } from "./dbHelpers";
export * from "./oauth";
export const messageBroker = {
  url: config.get("message_broker_url") as string,
  exchanges: {
    hive: {
      name: config.get("message_broker.exchanges.hive.name") as string,
      queues: {
        logging: {
          name: config.get(
            "message_broker.exchanges.hive.queues.logging.name"
          ) as string,
          binding_key: config.get(
            "message_broker.exchanges.hive.queues.logging.binding_key"
          ) as string,
        },
      },
    },
  },
};
