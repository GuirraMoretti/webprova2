import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ListarPorCurso = () => {
  const [alunos, setAlunos] = useState([]);
  const [isHighlighting, setIsHighlighting] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/aluno/listar")
      .then((response) => {
        setAlunos(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  function deleteAlunoById(id) {
    if (window.confirm("Deseja Excluir?")) {
      axios
        .delete(`http://localhost:3001/aluno/delete/${id}`)
        .then((response) => {
          const resultado = alunos.filter((aluno) => aluno._id !== id);
          setAlunos(resultado);
        })
        .catch((error) => console.log(error));
      alert("Aluno " + id + " excluído com sucesso!");
    }
  }

  // Função para agrupar alunos por curso
  const agruparAlunosPorCurso = (alunos) => {
    return alunos.reduce((cursos, aluno) => {
      const curso = aluno.curso;
      if (!cursos[curso]) {
        cursos[curso] = [];
      }
      cursos[curso].push(aluno);
      return cursos;
    }, {});
  };

  // Obter o agrupamento dos alunos por curso
  const alunosPorCurso = agruparAlunosPorCurso(alunos);

  // Alternar o estado de destaque
  const handleHighlightToggle = () => {
    setIsHighlighting((prev) => !prev);
  };

  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        Listar Aluno por Curso
      </Typography>

      {/* Botão para destacar alunos com IRA > 7 */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleHighlightToggle}
        sx={{ marginBottom: 2 }}
      >
        {isHighlighting ? "Remover Destaque" : "Destacar Alunos com IRA > 7"}
      </Button>

      {Object.keys(alunosPorCurso).map((curso) => (
        <TableContainer component={Paper} key={curso} sx={{ marginBottom: 2 }}>
          <Typography variant="h6" sx={{ margin: 2 }}>
            {curso}
          </Typography>
          <Table sx={{ minWidth: 650 }} arial-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>NOME</TableCell>
                <TableCell>CURSO</TableCell>
                <TableCell>IRA</TableCell>
                <TableCell>AÇÕES</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alunosPorCurso[curso].map((aluno) => (
                <TableRow
                  key={aluno._id}
                  sx={{
                    backgroundColor:
                      isHighlighting && aluno.ira > 7 ? "lightgreen" : "inherit",
                  }}
                >
                  <TableCell>{aluno._id}</TableCell>
                  <TableCell>{aluno.nome}</TableCell>
                  <TableCell>{aluno.curso}</TableCell>
                  <TableCell>{aluno.ira}</TableCell>
                  <TableCell>
                    <Box>
                      <IconButton
                        arial-label="edit"
                        color="primary"
                        component={Link}
                        to={`/editarAluno/${aluno._id}`}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        arial-label="delete"
                        color="error"
                        onClick={() => deleteAlunoById(aluno._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ))}
    </>
  );
};

export default ListarPorCurso;
