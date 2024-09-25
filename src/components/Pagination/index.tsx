import {
  Button,
  Pagination as MuiPagination,
  PaginationItem,
} from "@mui/material";
import React from "react";

interface IPaginationProps {
  count: number;
  page: number;
  onChange: (_event: React.ChangeEvent<unknown>, value: number) => void;
  handleChangePage?: (type: string) => void;
}

const Pagination: React.FC<IPaginationProps> = ({
  count,
  page,
  onChange,
  handleChangePage,
}) => {
  return (
    <MuiPagination
      count={count}
      page={page}
      onChange={onChange}
      renderItem={(item) => {
        const { selected, ...itemProps } = item;
        if (item.type === "start-ellipsis" || item.type === "end-ellipsis") {
          return <PaginationItem {...itemProps} disabled />;
        }
        if (item.type === "previous") {
          return (
            <Button
              className="pagination-button"
              disabled={page === 1 || count === 0}
              onClick={() => handleChangePage && handleChangePage(item.type)}
            >
              PÁGINA ANTERIOR
            </Button>
          );
        }
        if (item.type === "next") {
          return (
            <Button
              className="pagination-button"
              disabled={page === count || count === 0}
              onClick={() => handleChangePage && handleChangePage(item.type)}
            >
              PRÓXIMA PÁGINA
            </Button>
          );
        }
        return (
          <PaginationItem
            {...itemProps}
            className="pagination-item"
            size="large"
            shape="rounded"
            sx={{
              backgroundColor: selected ? "rgba(0, 0, 0, 0.08)" : "inherit",
              borderRadius: "100px",
            }}
          />
        );
      }}
    />
  );
};

export default Pagination;
