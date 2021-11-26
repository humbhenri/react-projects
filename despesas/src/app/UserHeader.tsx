import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useAuthContext } from "./authContext";

export default function UserHeader() {
  const { user, onSignout } = useAuthContext();
  return (
    <Box display="flex" alignItems="center">
      <Box>
        <h1>
          <strong>Despesas</strong>
        </h1>
      </Box>
      <Box flex="1"></Box>
      <Box marginRight="1em">Olá {user.nome}</Box>
      <Button color="primary" variant="contained" onClick={onSignout}>
        SAIR
      </Button>
    </Box>
  );
}
