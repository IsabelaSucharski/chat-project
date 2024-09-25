const kongUrl = import.meta.env.VITE_KONG_URL;
const apiSync = `${kongUrl}/knowledge/sync/v1`;

export const botPath = `${apiSync}/bots`;
export const getBotPrompt = (name: string) => `${botPath}/name/${name}`;
export const updateBotPrompt = (id: string) => `${botPath}/${id}`;
