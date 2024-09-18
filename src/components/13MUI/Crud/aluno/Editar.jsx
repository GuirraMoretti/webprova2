import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Editar = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [ira, setIra] = useState("0.0");
  const [iraError, setIraError] = useState(false); // Estado para controlar o erro de IRA

  // Como [] está vazia, useEffect funciona como um construtor!
  useEffect(() => {
    axios
      .get(`http://localhost:3001/aluno/retrieve/${id}`)
      .then((response) => {
        setNome(response.data.nome);
        setCurso(response.data.curso);
        setIra(response.data.ira);
      })
      .catch((error) => console.log(error));
  }, [id]);

  function handleSubmit(event) {
    event.preventDefault();
    const alunoAtualizado = { nome, curso, ira };
    axios
      .put(`http://localhost:3001/aluno/update/${id}`, alunoAtualizado)
      .then((response) => {
        alert(`Aluno ID ${response.data._id} atualizado!`);
        navigate("/listarAluno");
      })
      .catch((error) => console.log(error));
  }

  // Função para lidar com a mudança do valor de IRA
  const handleIraChange = (e) => {
    const value = parseFloat(e.target.value);
    if (value > 10) {
      setIraError(true);
      setIra(10);
    } else {
      setIraError(false); 
      setIra(value);
    }
  };

  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        Editar Aluno
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="nome"
          name="nome"
          label="Nome Completo"
          value={nome}
          autoFocus
          onChange={(event) => setNome(event.target.value)}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="curso"
          name="curso"
          label="Curso"
          value={curso}
          onChange={(event) => setCurso(event.target.value)}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="ira"
          label="IRA"
          name="ira"
          type="number"
          value={ira}
          inputProps={{
            maxLength: 10,
            step: "0.1",
          }}
          onChange={handleIraChange}
          error={iraError} // Mostra o erro na borda
          helperText={iraError ? "O valor do IRA não pode ser maior que 10" : ""}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: iraError ? "red" : "default",
              },
            },
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button type="submit" variant="contained" sx={{ my: 3 }}>
            Atualizar
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Editar;
