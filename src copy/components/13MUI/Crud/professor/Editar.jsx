import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

const Editar = () => {

    let {id} = useParams()
    const navigate = useNavigate()

    /*const professores = [
        {id:0, nome:"Rapozinha", curso:"SI", titulacao:"MEST", ai:{es:true, al:false, ds:false, mc:false}},
        {id:1, nome:"Renato Augusto", curso:"EC", titulacao:"DOUT", ai:{es:false, al:false, ds:false, mc:false}},
        {id:2, nome:"Romarinho", curso:"DD", titulacao:"GRAD", ai:{es:false, al:false, ds:false, mc:false}},
        {id:3, nome:"Romero", curso:"SI", titulacao:"MEST", ai:{es:false, al:false, ds:false, mc:false}},
        {id:4, nome:"Ralf", curso:"RC", titulacao:"GRAD", ai:{es:false, al:true, ds:false, mc:false}},
        {id:5, nome:"Richard", curso:"ES", titulacao:"MEST", ai:{es:true, al:false, ds:false, mc:false}},
    ]*/

        /*function getProfessorById(id) {
        for (let i=0; i<professores.length; i++) {
            if (id == professores[i].id) {
                return professores[i]
            }
        }
        return null
    }*/

    const [nome, setNome] = useState("")
    const [curso, setCurso] = useState("")
    const [titulacao, setTitulacao] = useState("GRAD")
    const [ai, setAi] = useState({es:false, al:false, ds:false, mc:false})
    const {es,al,ds,mc} = ai

    //como [] esta vazia, useEffect funciona como um construtor!
    useEffect(
       ()=>{
            /*let professor = getProfessorById(id)
            setNome(professor.nome)
            setCurso(professor.curso)
            setTitulacao(professor.titulacao)
            setAi(professor.ai)*/
            axios.get(`http://localhost:3001/professor/retrieve/${id}`)
            .then(
                (response) => {
                    setNome(response.data.nome)
                    setCurso(response.data.curso)
                    setTitulacao(response.data.titulacao)
                    setAi(response.data.ai)
                }
            )
            .catch(error=>console.log(error))
       }
       ,
       []
    )

    function handleSubmit(event) {
        event.preventDefault()
        const professorAtualizado = {nome, curso, titulacao, ai}
        axios.put(`http://localhost:3001/professor/update/${id}`, professorAtualizado)
            .then(
                (response) => {
                    alert(`Professor ID ${response.data._id} atualizado!`)
                    navigate("/listarProfessor")
                }
            )
            .catch(error => console.log(error))
    }

    function handleCheckBox(event) {
        setAi({
            ...ai,
            [event.target.name]:event.target.checked,
        })
    }

    return (
        <>
             <Typography variant="h5" fontWeight="bold">
                Editar Professor
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

                <FormControl fullWidth sx={{mt:2}}>
                    <InputLabel id="select-tit-label">Titulação</InputLabel>
                    <Select
                        labelId="select-tit-label"
                        label="Titulação"
                        value={titulacao}
                        onChange={(event)=>setTitulacao(event.target.value)}
                    >
                        <MenuItem value="GRAD">Graduação</MenuItem>
                        <MenuItem value="MEST">Mestrado</MenuItem>
                        <MenuItem value="DOUT">Doutorado</MenuItem>
                    </Select>
                </FormControl>

                <FormControl
                    component="fieldset"
                    variant="standart"
                    sx={{mt:2, ml:2}}
                >
                    <FormLabel
                        component="legend"
                        sx={{fontSize:12, mb:2}}
                    >
                        Áreas de Interesse
                    </FormLabel>

                    <FormGroup>
                        <FormControlLabel control={<Checkbox checked={es} name="es" onChange={handleCheckBox}/>} label="Engenharia de Software"/>
                        <FormControlLabel control={<Checkbox checked={al} name="al" onChange={handleCheckBox}/>} label="Algoritmos"/>
                        <FormControlLabel control={<Checkbox checked={ds} name="ds" onChange={handleCheckBox}/>} label="Desenvolvimento Web"/>
                        <FormControlLabel control={<Checkbox checked={mc} name="mc" onChange={handleCheckBox}/>} label="Matemática Computacional"/>
                    </FormGroup>
                </FormControl>

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