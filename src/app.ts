import { envs } from "./config";
import { mongoConnection } from "./data";
import { AppRoutes, Server } from "./presentation";

(async () => {
  main();
})();

async function main() {
  mongoConnection();

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}
