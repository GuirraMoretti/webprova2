import {
  AppBar,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { RiComputerLine } from "react-icons/ri";
import { useState } from "react";
import { Link } from "react-router-dom";

const MyMenu = () => {
  const [anchorElProfessor, setAnchorElProfessor] = useState(null);

  const handleOpenAnchorElProfessor = (event) => {
    setAnchorElProfessor(event.currentTarget);
  };
  const handleCloseAnchorElProfessor = (event) => {
    setAnchorElProfessor(null);
  };

  const [anchorElAluno, setAnchorElAluno] = useState(null);

  const handleOpenAnchorElAluno = (event) => {
    setAnchorElAluno(event.currentTarget);
  };
  const handleCloseAnchorElAluno = (event) => {
    setAnchorElAluno(null);
  };

  function dropProfMenu() {
    return (
      <Box>
        <Button
          sx={{
            color: "white",
            my: 2,
          }}
          onClick={handleOpenAnchorElProfessor}
        >
          Professores
        </Button>
        <Menu
          anchorEl={anchorElProfessor}
          open={Boolean(anchorElProfessor)}
          onClose={handleCloseAnchorElProfessor}
        >
          <MenuItem
            onClick={handleCloseAnchorElProfessor}
            component={Link}
            to={"cadastrarProfessor"}
          >
            Cadastrar
          </MenuItem>

          <MenuItem
            onClick={handleCloseAnchorElProfessor}
            component={Link}
            to={"listarProfessor"}
          >
            Listar
          </MenuItem>
        </Menu>
      </Box>
    );
  }

  function dropAluMenu() {
    return (
      <Box>
        <Button
          sx={{
            color: "white",
            my: 2,
          }}
          onClick={handleOpenAnchorElAluno}
        >
          Alunos
        </Button>
        <Menu
          anchorEl={anchorElAluno}
          open={Boolean(anchorElAluno)}
          onClose={handleCloseAnchorElAluno}
        >
          <MenuItem
            onClick={handleCloseAnchorElAluno}
            component={Link}
            to={"cadastrarAluno"}
          >
            Cadastrar
          </MenuItem>

          <MenuItem
            onClick={handleCloseAnchorElProfessor}
            component={Link}
            to={"listarAluno"}
          >
            Listar
          </MenuItem>
          <MenuItem
            onClick={handleCloseAnchorElProfessor}
            component={Link}
            to={"listarPorCurso"}
          >
            Listar por curso
          </MenuItem>
        </Menu>
      </Box>
    );
  }

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <RiComputerLine sx={{ display: { xs: "none", md: "flex" }, mr: 3, fontSize: 30 }} />
          <Typography
            variant="h5"
            component="a"
            href="/"
            sx={{
              textDecoration: "none",
              color: "white",
              fontFamily: "monospace",
              letterSpacing: ".3rem",
              fontWeight: 800,
            }}
          >
            AP2_WEB 
          </Typography>
          <Box
            sx={{
              ml: 3,
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {dropProfMenu()}
            {dropAluMenu()}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MyMenu;
