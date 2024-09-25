const kongUrl = import.meta.env.VITE_KONG_URL;
const apiSync = `${kongUrl}/knowledge/sync/v1`;

export const tagsPath = `${apiSync}/tags`;
export const createTag = `${tagsPath}/create`;
export const getTagsCount = `${tagsPath}/count`;
export const getAllTags = `${tagsPath}/search`;
export const deleteTag = (id: string) => `${tagsPath}/delete/${id}`;
