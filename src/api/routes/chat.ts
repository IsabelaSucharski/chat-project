const kongUrl = import.meta.env.VITE_KONG_URL;
const apiAskBots = `${kongUrl}/knowledge/ask-bots/v1`;

export const askBot = `${apiAskBots}/api/ask`;
