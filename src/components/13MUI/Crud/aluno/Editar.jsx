import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

const Editar = () => {

    let {id} = useParams()
    const navigate = useNavigate()

    const [nome, setNome] = useState("")
    const [curso, setCurso] = useState("")
    const [ira, setIra] = useState("0.0")

    //como [] esta vazia, useEffect funciona como um construtor!
    useEffect(
       ()=>{
            axios.get(`http://localhost:3001/aluno/retrieve/${id}`)
            .then(
                (response) => {
                    setNome(response.data.nome)
                    setCurso(response.data.curso)
                    setIra(response.data.ira)
                }
            )
            .catch(error=>console.log(error))
       }
       ,
       []
    )

    function handleSubmit(event) {
        event.preventDefault()
        const alunoAtualizado = {nome, curso, ira}
        axios.put(`http://localhost:3001/aluno/update/${id}`, alunoAtualizado)
            .then(
                (response) => {
                    alert(`Aluno ID ${response.data._id} atualizado!`)
                    navigate("/listarAluno")
                }
            )
            .catch(error => console.log(error))
    }

    return (
        <>
             <Typography variant="h5" fontWeight="bold">
                Editar Aluno
             </Typography>
             <Box
                component="form"
                onSubmit={handleSubmit}
             >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="nome"
                    name="nome"
                    label="Nome Completo"
                    value={nome}
                    autoFocus
                    onChange={(event)=>setNome(event.target.value)}
                >
                </TextField>

                <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="curso"
                        name="curso"
                        label="Curso"
                        value={curso}
                        onChange={(event)=>setCurso(event.target.value)}
                    >
                </TextField>

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
                        step: "0.1"
                    }}
                    onChange={(e) => setIra(parseFloat(e.target.value))}
                />

                <Box sx={{display:"flex", justifyContent:"center"}}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ my: 3 }}
                    >
                        Atualizar
                    </Button>
                </Box>
             </Box>
        </>
    )
}

export default Editar