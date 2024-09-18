import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Link,
} from "@mui/material";

const Signin = () => {
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          autoFocus
          label="Endereço de e-mail"
          //onde vai ter o foco
          id="email"
          //nome da variavel que vai ta la no estado
          name="email"
          type="email"
        />

        <TextField
          margin="normal"
          required
          fullWidth
          label="Senha"
          //onde vai ter o foco
          id="password"
          //nome da variavel que vai ta la no estado
          name="password"
          type="password"
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            //margin top margin bottom
            my: 2,
          }}
        >
          SIGN IN
        </Button>

        <Box
          //colocar style
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Link underline="none" href="#">
            Esqueceu a senha?
          </Link>
          <Link underline="none" href="#">
            Cadastre-se!
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Signin;
