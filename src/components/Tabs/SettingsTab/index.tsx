import { Check } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { TextField } from "../..";
import { APIPrompt } from "../../../api";

const SettingsTab: React.FC = () => {
  const [textFieldValue, setTextFieldValue] = useState<string>("");
  const [botId, setBotId] = useState<string>("");

  const botName = "rh";

  const { isLoading, isError } = useQuery(["getPrompt", botName], async () => {
    const data = await APIPrompt.getBotPrompt(botName);
    setTextFieldValue(data?.prompt);
    setBotId(data?.internal_id);
    return data;
  });

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextFieldValue(event.target.value);
  };

  const {
    isError: isErrorLoading,
    isSuccess,
    isLoading: loadingUpdated,
    mutate: updatePrompt,
  } = useMutation(
    async () => {
      const data = await APIPrompt.updateBotPrompt(botId, {
        prompt: textFieldValue,
      });
      return data;
    },
    {
      onSuccess: (data) => {
        setTextFieldValue(data?.prompt);
      },
    }
  );

  const handleUpdatePrompt = async () => {
    updatePrompt();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Prompt atualizada com sucesso!");
    }

    if (isErrorLoading) {
      toast.error("Não foi possível atualizar o prompt");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorLoading, isSuccess, isLoading]);

  return (
    <Grid container mt={2} gap={1}>
      <Grid item xs={12}>
        <Typography>Defina o estilo da resposta da IA</Typography>
      </Grid>
      <Grid item xs={12} paddingTop={2}>
        <TextField
          label="Prompt"
          variant="outlined"
          multiline={true}
          value={!isError ? textFieldValue : ""}
          onChange={handleTextFieldChange}
          minRows={13}
        />
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <LoadingButton
          onClick={handleUpdatePrompt}
          variant="contained"
          loading={loadingUpdated}
          startIcon={!loadingUpdated && <Check />}
        >
          Enviar
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default SettingsTab;
