const kongUrl = import.meta.env.VITE_KONG_URL;
const apiFileUpload = `${kongUrl}/knowledge/file-upload/v1`;

export const uploadFiles = `${apiFileUpload}/files/general`;
