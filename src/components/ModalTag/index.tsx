import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Button, TextField } from "..";
import { IParams } from "../../@types";
import { APITags } from "../../api";
import { useTags } from "../../utils/hooks/useTags";

interface CustomDialogProps {
  open: boolean;
  handleCancel: () => void;
  handleSave: () => void;
}

const ModalTag: React.FC<CustomDialogProps> = ({
  open,
  handleCancel,
  handleSave,
}) => {
  const [tagName, setTagName] = useState("");
  const { setTagsList } = useTags();

  const handleCloseAndClear = () => {
    handleCancel();
    setTagName("");
  };

  const {
    isError,
    isSuccess,
    isLoading,
    mutate: createTag,
  } = useMutation(
    async (params: IParams) => {
      const data = await APITags.createTag(params);
      return data;
    },
    {
      onSuccess({ data }) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setTagsList((prev: any) => [...prev, data]);
      },
    }
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success("Tag criada com sucesso!");
      handleSave();
    }

    if (isError) {
      toast.error("Não foi possível criar a tag");
      handleCloseAndClear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess, isLoading]);

  const handleSubmitForm = async () => {
    const params: IParams = {
      name: tagName,
      bot: "rh",
    };

    if (params) {
      createTag(params);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleCancel} PaperProps={{ elevation: 0 }}>
        <DialogTitle>Adicionar Tag</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome da Tag"
            variant="standard"
            multiline={false}
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            label="Cancelar"
            onClick={handleCloseAndClear}
          />

          <LoadingButton
            onClick={handleSubmitForm}
            variant="contained"
            loading={isLoading}
          >
            Enviar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalTag;
