export default (category: string) => {
  if (category == "SYNC") return import.meta.env.VITE_TOKE_API_SYNC;
  if (category == "FILES") return import.meta.env.VITE_TOKE_API_FILES;
  if (category == "CHAT") return import.meta.env.VITE_TOKE_API_CHAT;
};
