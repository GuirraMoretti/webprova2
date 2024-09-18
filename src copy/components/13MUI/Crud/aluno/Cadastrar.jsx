import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cadastrar = () => {
  const [nome, setNome] = useState("");
  {
    /*criando a variavei de estado com valor padrao do curso de si*/
  }
  const [curso, setCurso] = useState("SI");
  const [ira, setIra] = useState("0.0");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const novoAluno = { nome, curso, ira };
    axios
      .post("http://localhost:3001/aluno/register", novoAluno)
      .then((response) => {
        alert(`Aluno ID ${response.data._id} adicionado!`);
        navigate("/listarAluno");
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        Cadastrar Aluno
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="nome"
          name="nome"
          label="Nome Completo"
          autoFocus
          onChange={(event) => setNome(event.target.value)}
        ></TextField>

        {/* APLICANDO O SELECT CURSO USANDO UM FORM CONTROLL*/}
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="select-tit-label">curso</InputLabel>
          <Select
            labelId="select-tit-label"
            label="Titulação"
            value={curso}
            onChange={(event) => setCurso(event.target.value)}
          >
            {/*criando todos os items selecionaveis*/}
            <MenuItem value="SI">SI</MenuItem>
            <MenuItem value="DD">DD</MenuItem>
            <MenuItem value="EC">EC</MenuItem>
            <MenuItem value="ES">ES</MenuItem>
            <MenuItem value="CC">CC</MenuItem>
            <MenuItem value="RC">RC</MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          required
          fullWidth
          id="ira"
          label="IRA"
          name="ira"
          type="number"
          inputProps={{
            maxLength: 10,
            step: "0.1",
          }}
          onChange={(e) => setIra(parseFloat(e.target.value))}
        />

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button type="submit" variant="contained" sx={{ my: 3 }}>
            Cadastrar
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Cadastrar;
