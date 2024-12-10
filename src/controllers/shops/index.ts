import Elysia from "elysia";
import { generateSign } from "../../utils/generate-sign";

export const shopController = new Elysia({
    prefix: '/shops'
})
    .get("/", async () => {
        const now = Math.floor(Date.now() / 1000);
        const startTime = now - 4 * 60;

        const sign = generateSign({
            uri: `${process.env.TIKTOK_API_URL}/authorization/202309/shops`,
            headers: {
                "x-tts-access-token": `${process.env.ACCESSTOKEN}`,
                "content-type": 'application/json'
            },
            qs: {
                "app_key": process.env.APP_KEY+"",
                "timestamp": startTime
            }
        }, process.env.APP_SECRET+"");

        try {
            const response = await fetch(
                `${process.env.TIKTOK_API_URL}/authorization/202309/shops?app_key=${process.env.APP_KEY}&sign=${sign}&timestamp=${startTime}`,
                {
                    headers: {
                        "x-tts-access-token": `${process.env.ACCESSTOKEN}`,
                        "Content-type": 'application/json'
                    }
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
    })
