import { Box } from "@mui/material";
import { Button } from "..";
import { useAuth } from "../../utils/hooks/authProvider";

const NoAccess = () => {
  const { setUser } = useAuth();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      height="100%"
      position="relative"
      bottom="100px"
    >
      <h3>
        Desculpe, você não possui permissão. Favor solicitar clicando no botão
        abaixo:
      </h3>
      <Box>
        <Button
          onClick={() =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setUser((prev: any) => ({
              ...prev,
              roles: [...prev.roles, "flor"],
            }))
          }
          label="Solicitar Acesso"
          variant="contained"
        />
      </Box>
    </Box>
  );
};

export default NoAccess;
