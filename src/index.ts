import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { tiktokRoute } from "./route";

const app = new Elysia()
  .use(swagger())
  .use(tiktokRoute)
  .listen(3000);