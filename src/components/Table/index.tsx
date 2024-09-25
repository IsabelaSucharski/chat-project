/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Paper, styled, useTheme } from "@mui/material";
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridRowsProp,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { useState } from "react";
import { IDocumentsResponse, ITagsResponse } from "../../@types";
import { useDimension } from "../../utils/hooks/useDimension";
import Pagination from "../Pagination";

interface IDataTable {
  columns: GridColDef[];
  rows: GridRowsProp | readonly GridValidRowModel[];
  getRowId: (row: IDocumentsResponse | ITagsResponse) => void;
  isLoading?: boolean;
}
export default function DataTable({
  columns,
  rows,
  isLoading,
  getRowId,
}: IDataTable) {
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 6,
  });

  const theme = useTheme();
  const { isMobile } = useDimension();

  const Table: DataGridProps | any = styled(DataGrid)(
    theme.components?.MuiTable?.styleOverrides?.root
  );

  const onChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPaginationModel({ page: value - 1, pageSize: 6 });
  };

  const handleChangePage = (type: string) => {
    if (type === "previous") {
      setPaginationModel({ page: paginationModel.page - 1, pageSize: 6 });
    } else {
      setPaginationModel({ page: paginationModel.page + 1, pageSize: 6 });
    }
  };

  return (
    <Paper
      elevation={0}
      style={{ backgroundColor: "transparent", height: "100%" }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="start"
        height="100%"
        maxHeight="100%"
        gap="16px"
      >
        <Box
          className="tableBox"
          height={isMobile ? "23rem !important" : "100%"}
        >
          <Table
            columns={columns}
            rows={rows}
            getRowId={getRowId}
            loading={isLoading}
            pageSizeOptions={[6]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            disableRowSelectionOnClick
            sx={{
              borderLeft: "none",
              borderRight: "none",
              borderTop: "none",
              backgroundColor: "transparent",
            }}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="transparent"
        >
          <Pagination
            count={Math.ceil(rows.length / 6)}
            page={paginationModel.page + 1}
            onChange={onChange}
            handleChangePage={handleChangePage}
          />
        </Box>
      </Box>
    </Paper>
  );
}
