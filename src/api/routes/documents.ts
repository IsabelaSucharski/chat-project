const kongUrl = import.meta.env.VITE_KONG_URL;
const apiSync = `${kongUrl}/knowledge/sync/v1`;

const getAllDocuments = `${apiSync}/knowledge/search`;
const getDocumentsById = `${getAllDocuments}/id`;
const getDocumentsCount = `${apiSync}/knowledge/count`;
const deleteDocument = (id: string) => `${apiSync}/knowledge/delete/${id}`;

export { deleteDocument, getAllDocuments, getDocumentsById, getDocumentsCount };
