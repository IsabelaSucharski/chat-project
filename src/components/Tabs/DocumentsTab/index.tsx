/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Close,
  DeleteOutlined,
  FileUpload,
  OpenInNew,
} from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  Button,
  Chip,
  ModalDelete,
  ModalDocument,
  Search,
  Table,
  TagsSelect,
} from "../..";
// import api from "../../../api";
import { IDocumentsResponse, IParams } from "../../../@types";
import { APIDocument, APITags } from "../../../api";
import { getDocumentById } from "../../../api/documents";
import { useDocuments } from "../../../utils/hooks/useDocuments";
import { useTags } from "../../../utils/hooks/useTags";

interface IDocumentsTab {
  handleShowDocument: (value: boolean, document: IDocumentsResponse[]) => void;
  handleActionButton: boolean;
  tabsValue: number;
}

const DocumentsTab: React.FC<IDocumentsTab> = ({
  handleShowDocument,
  handleActionButton,
  tabsValue,
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [documentId, setDocumentId] = useState<string>("");
  const [tagFilterValue, setTagFilterValue] = useState<any>("");
  const [documentsList, setDocumentsList] = useState<
    IDocumentsResponse[] | any
  >([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [activeRow, setActiveRow] = useState<string | null>(null);

  const {
    showDocument,
    setShowDocument,
    setDocument,
    document,
    documentsCount,
    handleDocumentsCount,
  } = useDocuments();

  const { tagsList, setTagsList, tagsCount, handleTagsCount } = useTags();

  useEffect(() => {
    handleDocumentsCount();
    handleTagsCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (tabsValue !== 0) setDocument([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabsValue]);

  const { isLoading, data, refetch } = useQuery(
    ["getDocuments", documentsCount],
    async () => {
      const defaultParams = {
        query: "",
        bot: "rh",
        tags_name: [],
        from_: 0,
        to: documentsCount,
        aggregate: true,
      };
      const data = await APIDocument.getAllDocuments(defaultParams);
      return data;
    },
    { enabled: !!documentsCount }
  );

  const { isLoading: loadingSearch, mutate: searchDocuments } = useMutation(
    async (params: IParams) => {
      const data = await APIDocument.getAllDocuments(params);
      return data;
    },
    {
      onSuccess: (data) => {
        handleList(data);
      },
    }
  );

  const { data: tags } = useQuery(
    ["getTags", tagsCount],
    async () => {
      const params = {
        bot: "rh",
        from_: 0,
        to: tagsCount,
      };
      const data = await APITags.getAllTags(params);
      return data;
    },
    { enabled: !!tagsCount }
  );

  const handleList = (data: any) => {
    const list =
      Array.isArray(data) &&
      data.map((data: any, index: number) => {
        return { ...data, id: index + 1 };
      });
    setDocumentsList(list);
  };

  useEffect(() => {
    handleList(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const list =
      Array.isArray(tags) &&
      tags?.map((tag: any, index: number) => {
        return { ...tag, id: index + 1 };
      });
    setTagsList(list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  const handleModal = () => {
    setOpenModal((openModal) => !openModal);
  };

  const handleViewDocument = useCallback(
    async (internalId: string) => {
      const params: IParams = {
        internal_id: internalId,
        from_: 0,
        to: 20,
      };

      if (internalId === activeRow && data) {
        setShowDocument((prev: any) => !prev);
      } else {
        const data = await getDocumentById(params);
        setDocument(data);
        setDocumentId(internalId);
        setShowDocument(true);
      }
    },
    [activeRow, data, setDocument, setShowDocument]
  );

  const handleSearchDocuments = useCallback(
    (query?: string, tag?: string[]) => {
      setTagFilterValue(tag);
      const params = {
        query: query || "",
        bot: "rh",
        tags_name: tag || [],
        from_: 0,
        to: documentsCount,
        aggregate: true,
      };
      searchDocuments(params);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [documentsCount]
  );

  useEffect(() => {
    handleShowDocument(showDocument, document);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDocument, document]);

  const icon = useCallback(
    (isActiveRow: boolean) => {
      if (isActiveRow && handleActionButton) {
        return <Close />;
      } else {
        return <OpenInNew />;
      }
    },
    [handleActionButton]
  );

  const handleDeleteModal = (id?: string) => {
    setOpenDelete((openDelete) => !openDelete);
    if (id) setDocumentId(id);
  };

  const handleActions = useCallback(
    (params?: any) => {
      const { row } = params || {};
      const isActiveRow = row?.internal_id === activeRow;
      return (
        <>
          <IconButton
            onClick={() => {
              setDocumentId(row?.internal_id);
              setActiveRow((prev) =>
                prev === row?.internal_id ? null : row?.internal_id
              );
              handleViewDocument(row?.internal_id);
            }}
          >
            {icon(isActiveRow)}
          </IconButton>
          <IconButton
            aria-label="delete"
            size="medium"
            onClick={() => handleDeleteModal(row.internal_id)}
          >
            <DeleteOutlined fontSize="inherit" />
          </IconButton>
        </>
      );
    },
    [activeRow, icon, handleViewDocument]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns: GridColDef[] = [
    {
      field: "documents",
      headerName: "Documento",
      sortable: true,
      flex: 4,
      disableColumnMenu: true,
      resizable: false,
      headerClassName: "headerFont",
    },
    {
      field: "tags",
      headerName: "Tags",
      sortable: false,
      flex: 3,
      disableColumnMenu: true,
      resizable: false,
      headerClassName: "headerFont",
      renderCell: (params) => {
        return (
          <Box display="flex" gap={1} alignItems="center" height="100%">
            {params.value.split(", ").map((tag: string, index: React.Key) => (
              <Chip
                key={index}
                label={tag}
                handleSearchDocuments={handleSearchDocuments}
              />
            ))}
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Ações",
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      headerClassName: "headerFont",
      renderCell: (params) => handleActions(params),
    },
  ];

  const memoizedDocuments = useMemo(() => {
    return (
      documentsList &&
      documentsList.map((item: IDocumentsResponse) => ({
        id: item?.id,
        internal_id: item?.internal_id,
        documents: item?.title,
        tags: item?.tags.join(", "),
      }))
    );
  }, [documentsList]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rows = memoizedDocuments || [];

  const deleteDocument = async () => {
    const data = await APIDocument.deleteDocument(documentId);
    return data;
  };

  return (
    <>
      <Box display="flex" flexDirection="column" gap={2} mt={2} height="100%">
        <Box display="flex" gap={4} alignItems="center">
          <Box flexGrow={4}>
            <Search
              onSearch={handleSearchDocuments}
              label="Pesquisar documentos"
            />
          </Box>
          <Box flexGrow={3}>
            <TagsSelect
              options={tagsList}
              tagFilterValue={tagFilterValue}
              handleSearchDocuments={handleSearchDocuments}
              label="Tags"
            />
          </Box>
          <Box flexGrow={1}>
            <Button
              variant="contained"
              icon={<FileUpload />}
              label="upload"
              onClick={() => handleModal()}
              fullWidth
            />
          </Box>
        </Box>

        <Box height="100%">
          <Table
            columns={columns}
            rows={rows}
            isLoading={isLoading || loadingSearch || !rows?.length}
            getRowId={(row: any) => row?.internal_id}
          />
        </Box>
        {openModal && (
          <ModalDocument
            open={openModal}
            tags={tagsList}
            handleClose={() => {
              handleModal();
              refetch();
            }}
          />
        )}
      </Box>
      {openDelete && (
        <ModalDelete
          open={openDelete}
          id={documentId}
          label="Documento"
          deleteApi={deleteDocument}
          handleCancel={() => {
            handleDeleteModal();
          }}
          handleSave={() => {
            handleDeleteModal();
            refetch();
          }}
        />
      )}
    </>
  );
};

export default DocumentsTab;
