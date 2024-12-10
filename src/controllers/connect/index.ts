import Elysia, { t } from "elysia";

export const connectController = new Elysia({
    prefix: '/callback'
})
    .get("", async ({ query: { code } }) => {
        try {
            const response = await fetch(`${process.env.TIKTOK_SHOP_DOMAIN}/api/v2/token/get?app_key=${process.env.APP_KEY}&app_secret=${process.env.APP_SECRET}&auth_code=${code}&grant_type=authorized_code`);
            const result = await response.json();

            if (response.ok) {
                console.log('Message sent:', result);
            } else {
                console.error('Failed to send message:', response);
            }
            return {
                result
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }, {
        query: t.Object({
            code: t.String(),
        })
    })
