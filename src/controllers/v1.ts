import Elysia from "elysia";
import { connectController } from "./connect";
import { shopController } from "./shops";
import { productController } from "./product";
import { messageController } from "./messages";

export const v1 = new Elysia({ 
    name: "api.tiktok.v1", 
    prefix: "/v1" 
})
    .use(connectController)
    .use(shopController)
    .use(productController)
    .use(messageController)
    .compile()
