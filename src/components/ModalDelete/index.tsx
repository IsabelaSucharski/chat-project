import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

import { Button } from "..";

interface CustomDialogProps {
  open: boolean;
  handleCancel: () => void;
  handleSave: () => void;
  id: string;
  label: string;
  deleteApi: () => void;
}

const ModalDelete: React.FC<CustomDialogProps> = ({
  open,
  handleCancel,
  handleSave,
  label,
  deleteApi,
}) => {
  const { isError, isSuccess, isLoading, mutate } = useMutation(async () => {
    const data = deleteApi();
    return data;
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        `${label} deletad${
          label.includes("Documento") ? "o" : "a"
        } com sucesso!`
      );
      handleSave();
    }

    if (isError) {
      toast.error(
        `Não foi possível deletar ${
          label.includes("Documento") ? "o" : "a"
        } ${label.toLowerCase()}`
      );
      handleCancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess, isLoading]);

  const handleDelete = async () => {
    mutate();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleCancel} PaperProps={{ elevation: 0 }}>
        <DialogTitle>Deletar {label.toLowerCase()}</DialogTitle>
        <DialogContent>
          <Typography>
            Deseja deletar {label.includes("Documento") ? "o" : "a"}{" "}
            {label.toLowerCase()} selecionad
            {label.includes("Documento") ? "o" : "a"}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" label="Cancelar" onClick={handleCancel} />
          <LoadingButton
            onClick={handleDelete}
            variant="contained"
            loading={isLoading}
          >
            Salvar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalDelete;
