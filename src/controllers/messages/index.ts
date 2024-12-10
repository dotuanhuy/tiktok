import Elysia, { t } from "elysia";
import { generateSign } from "../../utils/generate-sign";

export const messageController = new Elysia({
    prefix: '/message'
})
    .get("", async ({ query: { shopCipher } }) => {
        try {
            const now = Math.floor(Date.now() / 1000);
            const startTime = now - 4 * 60;

            const sign = generateSign({
                uri: `${process.env.TIKTOK_API_URL}/customer_service/202309/conversations`,
                headers: {
                    "x-tts-access-token": `${process.env.ACCESSTOKEN}`,
                    "content-type": 'application/json'
                },
                qs: {
                    "app_key": process.env.APP_KEY + "",
                    "timestamp": startTime,
                    "shop_cipher": shopCipher,
                    "page_size": "10",
                }
            }, process.env.APP_SECRET + "");

            const response = await fetch(
                `${process.env.TIKTOK_API_URL}/customer_service/202309/conversations?shop_cipher=${shopCipher}&sign=${sign}&timestamp=${startTime}&app_key=${process.env.APP_KEY}&page_size=10`,
                {
                    headers: {
                        "content-type": 'application/json',
                        "x-tts-access-token": `${process.env.ACCESSTOKEN}`,
                    },
                });
            const result = await response.json();
            if (!response.ok) {
                console.log('Message sent:', result);
            }
            return {
                result
            }
        
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }, {
        query: t.Object({
            shopCipher: t.String(),
        }),
        detail: {
            tags: ["Message"],
            description: "Get conversation",
        },
    })
