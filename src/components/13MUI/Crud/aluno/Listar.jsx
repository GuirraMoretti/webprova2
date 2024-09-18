import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Listar = () => {
  const [alunos, setAlunos] = useState([]);
  const [isColored, setIsColored] = useState(false); // Estado para controlar a coloração
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
        .then((reponse) => {
          const resultado = alunos.filter((aluno) => aluno._id != id);
          setAlunos(resultado);
        })
        .catch((error) => console.log(error));
      alert("Aluno " + id + " excluído com sucesso!");
    }
  }

  // Função para calcular a média dos IRAs dos alunos
  function somar(alunos) {
    let resultado = 0;
    for (let i = 0; i < alunos.length; i++) {
      resultado += parseFloat(alunos[i].ira);
    }
    let tamanho = alunos.length;
    let media = resultado / tamanho;
    return media;
  }

  const handleColorToggle = () => {
    setIsColored((prev) => !prev); // Alterna o estado para colorir ou descolorir as linhas
  };

  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        Listar Aluno
      </Typography>

      <TableContainer component={Paper}>
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
            {alunos.map((aluno) => {
              let mediaTotal = somar(alunos);

              return (
                <TableRow
                key={aluno._id}
                // Verifica se a tabela está colorida e pinta as linhas conforme a condição
                sx={
                  isColored
                    ? aluno.ira < mediaTotal
                      ? { backgroundColor: "Tomato" }
                      : { backgroundColor: "LightBlue" }
                    : {}
                }
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
              );
            })}

            <TableRow sx={{ background: "RoyalBlue" }}>
              <TableCell>Média:</TableCell>
              <TableCell>{somar(alunos)}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Button variant="contained"  sx={{backgroundColor: "white",color: "black",
                  "&:hover": {backgroundColor: "#f0f0f0",},}} onClick={handleColorToggle}>
                  {isColored ? "Normal" : "Média"}
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default Listar;