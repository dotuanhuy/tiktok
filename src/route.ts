import Elysia from "elysia";
import { v1 } from "./controllers/v1";

export const tiktokRoute = new Elysia({ 
    name: "route.tiktok", 
    prefix : "/tiktok" 
})
    .use(v1)
    .compile()
