import { serverOf, serverStart } from "./server";
import * as dotenv from "dotenv";

dotenv.config();

const port = parseInt(process.env.FASTIFY_PORT || "8888");
const server = serverOf();

serverStart(port)(server)
  .then(() => {
    console.log(`Server start successfully`);
  })
  .catch((error) => {
    console.log(`Failed to start server: ${error}`);
  });
