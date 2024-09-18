import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyMenu from "./MyMenuV1";
import { Container } from "@mui/material";

//paginas do professor
import EditarProfessor from "./professor/Editar";
import ListarProfessor from "./professor/Listar";
import CadastrarProfessor from "./professor/Cadastrar";

//paginas do aluno
import EditarAluno from "./aluno/Editar";
import ListarAluno from "./aluno/Listar";
import CadastrarAluno from "./aluno/Cadastrar";
import Aprovados from "./aluno/Aprovados";

const MainPage = () => {
  return (
    <BrowserRouter>
      <MyMenu />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="cadastrarProfessor" element={<CadastrarProfessor />} />
          <Route path="editarProfessor/:id" element={<EditarProfessor />} />
          <Route path="listarProfessor" element={<ListarProfessor />} />
          <Route path="cadastrarAluno" element={<CadastrarAluno />} />
          <Route path="editarAluno/:id" element={<EditarAluno />} />
          <Route path="listarAluno" element={<ListarAluno />} />
          <Route path="alunosAprovados" element={<Aprovados />}></Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default MainPage;
