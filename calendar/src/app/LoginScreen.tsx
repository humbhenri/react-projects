import { Button, Container, TextField } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import { Box } from "@material-ui/system";
import { useState } from "react";
import { IUser, signInEndpoint } from "./services/backend";

const useStyles = makeStyles({
  error: {
    backgroundColor: "rgb(253, 236, 234)",
    padding: "16px",
    borderRadius: "4px",
    margin: "16px 0",
  },
});

interface LoginProps {
  onSignIn: (user: IUser) => void;
}

export default function LoginScreen(props: LoginProps) {
  const { onSignIn } = props;
  const [email, setEmail] = useState<string>("danilo@email.com");
  const [password, setPassword] = useState<string>("1234");
  const [error, setError] = useState<string>("");

  async function signIn(evt: React.FormEvent) {
    evt.preventDefault();
    try {
      const user = await signInEndpoint(email, password);
      onSignIn(user);
    } catch (error: any) {
      setError("E-mail não encontrado ou senha incorreta");
    }
  }

  const classes = useStyles();
  return (
    <Container maxWidth="sm">
      <h1>Agenda React</h1>
      <p>
        Digite e-mail e senha para entrar no sistema. Para testar, use o email{" "}
        <kbd>danilo@email.com</kbd> e senha <kbd>1234</kbd>
      </p>
      <form onSubmit={signIn}>
        <TextField
          margin="normal"
          label="E-mail"
          fullWidth
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          margin="normal"
          label="Senha"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className={classes.error}>{error}</div>}
        <Box textAlign="right" marginTop="1em">
          <Button variant="contained" color="primary" type="submit">
            Sign in
          </Button>
        </Box>
      </form>
    </Container>
  );
}
