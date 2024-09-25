/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextSnippet } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Button, TagsSelect, TextField } from "..";
import { ITagsResponse } from "../../@types";
import { APIFile } from "../../api";

interface CustomDialogProps {
  open: boolean;
  handleClose: () => void;
  tags: ITagsResponse[] | any;
}

interface IFormValues {
  name: string;
  source: string;
  tags: string[];
  file: any;
}

const ModalDocument: React.FC<CustomDialogProps> = ({
  open,
  tags,
  handleClose,
}) => {
  const { control, handleSubmit } = useForm<IFormValues | any>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<any>();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleFileOpen = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files?.[0];
    setFile(fileUploaded);
  };

  const {
    isError,
    isSuccess,
    isLoading,
    mutate: uploadFiles,
  } = useMutation(async (formData: FormData) => {
    const data = await APIFile.uploadFiles(formData);
    return data;
  });

  React.useEffect(() => {
    if (isSuccess) {
      toast.success("Sucesso! O upload está sendo realizado em segundo plano");
      handleClose();
    }

    if (isError) {
      toast.error("Não foi possível realizar o upload");
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess, isLoading]);

  const handleSubmitForm = async (values: IFormValues) => {
    const formData = new FormData();
    formData.append("title", values?.name);
    formData.append("source", values?.source);
    formData.append("bot", "rh");
    file
      ? formData.append("file", file)
      : toast.error("Favor inserir um arquivo");

    formData.append("tags_name", selectedTags.join(", "));

    if (file && formData) {
      uploadFiles(formData);
    }
  };

  const handleSelectedTags = (tags: string[] | []) => {
    setSelectedTags(tags);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ elevation: 0 }}
        className="modalDocument"
      >
        <DialogTitle>Upload de documento</DialogTitle>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <DialogContent
            sx={{
              textAlign: "start",
            }}
          >
            <Button
              variant="outlined"
              icon={<TextSnippet />}
              label="ENVIAR ARQUIVO"
              onClick={handleFileOpen}
            />
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              accept=".docx, .doc, .uadt, .pptx, .ptt, .pxt, .xls, .pdf"
              onChange={handleFileChange}
            />

            {file && <Typography>{file?.name}</Typography>}

            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nome"
                  variant="standard"
                  required={true}
                  multiline={false}
                />
              )}
            />

            <Controller
              name="source"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Origem"
                  variant="standard"
                  required={true}
                  multiline={false}
                />
              )}
            />

            <TagsSelect
              handleSelectedTags={handleSelectedTags}
              options={tags}
              multiple={true}
              label="Tags"
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" label="Cancelar" onClick={handleClose} />
            <LoadingButton
              variant="contained"
              loading={isLoading}
              type="submit"
            >
              Enviar
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default ModalDocument;
