/* eslint-disable @typescript-eslint/no-explicit-any */
import { Add, DeleteOutlined } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Button, ModalDelete, ModalTag, Search, Table } from "../..";
import { IParams, ITagsResponse } from "../../../@types";
import { APITags } from "../../../api";
import { useTags } from "../../../utils/hooks/useTags";

const TagsTab: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [tagId, setTagId] = useState("");
  const [defaultParams, setDefaultParams] = useState<IParams | any>("");

  const { tagsList, setTagsList, tagsCount } = useTags();

  useEffect(() => {
    setDefaultParams({
      bot: "rh",
      from_: 0,
      to: tagsCount,
    });
  }, [tagsCount]);

  const { isLoading, data, refetch } = useQuery(
    ["getTags", tagsCount, defaultParams],
    async () => {
      const data = await APITags.getAllTags(defaultParams);
      return data;
    },
    { enabled: !!tagsCount && !!defaultParams }
  );

  const handleList = (data: any) => {
    const list =
      Array.isArray(data) &&
      data.map((data: any, index: number) => {
        return { ...data, id: index + 1 };
      });
    setTagsList(list);
  };

  const { isLoading: loadingSearch, mutate: searchTags } = useMutation(
    async (params: IParams) => {
      const data = await APITags.getAllTags(params);
      return data;
    },
    {
      onSuccess: (data) => {
        handleList(data);
      },
    }
  );

  useEffect(() => {
    handleList(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleModalTag = () => {
    setOpen((open) => !open);
  };

  const handleDeleteModal = (id?: string) => {
    setOpenDelete((openDelete) => !openDelete);
    if (id) setTagId(id);
  };

  const handleSearchTags = useCallback(
    (tag: string) => {
      const params = {
        bot: "rh",
        query: tag || "",
        from_: 0,
        to: tagsCount,
      };
      searchTags(params);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tagsCount]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns: GridColDef[] = [
    {
      field: "tag",
      headerName: "Tag",
      sortable: true,
      flex: 1,
      disableColumnMenu: true,
      resizable: false,
      headerClassName: "headerFont",
    },
    {
      field: "actions",
      headerName: "Ações",
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      headerClassName: "headerFont",
      renderCell: (params) => (
        <IconButton
          aria-label="delete"
          size="medium"
          onClick={() => handleDeleteModal(params.row.internal_id)}
        >
          <DeleteOutlined fontSize="inherit" />
        </IconButton>
      ),
    },
  ];

  const memoizedTags = useMemo(() => {
    return (
      tagsList &&
      tagsList.map((item: ITagsResponse) => ({
        id: item?.id,
        internal_id: item?.internal_id,
        tag: item?.name,
      }))
    );
  }, [tagsList]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rows = memoizedTags || [];

  const deleteTag = async () => {
    const data = await APITags.deleteTag(tagId);
    return data;
  };

  const memoizedTable = useMemo(() => {
    return (
      <Table
        columns={columns}
        rows={rows}
        isLoading={isLoading || loadingSearch || !rows?.length}
        getRowId={(row: any) => row?.internal_id}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, columns, loadingSearch, rows]);

  return (
    <Box display="flex" flexDirection="column" gap={2} mt={2} height="100%">
      <Box display="flex" gap={4} alignItems="center">
        <Box flexGrow={8}>
          <Search onSearch={handleSearchTags} label="Pesquisar tags" />
        </Box>
        <Box flexGrow={1}>
          <Button
            variant="contained"
            icon={<Add />}
            label="ADICIONAR TAG"
            onClick={() => handleModalTag()}
            fullWidth
          />
        </Box>
      </Box>
      <Box height="100%">{memoizedTable}</Box>
      {open && (
        <ModalTag
          open={open}
          handleCancel={() => {
            handleModalTag();
          }}
          handleSave={() => {
            handleModalTag();
          }}
        />
      )}
      {openDelete && (
        <ModalDelete
          open={openDelete}
          id={tagId}
          label="Tag"
          deleteApi={deleteTag}
          handleCancel={() => {
            handleDeleteModal();
          }}
          handleSave={() => {
            handleDeleteModal();
            refetch();
          }}
        />
      )}
    </Box>
  );
};

export default TagsTab;
