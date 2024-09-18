import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios" 

const Listar = () => {
    /*const professores = [
        {id:0, nome:"Rapozinha", curso:"SI", titulacao:"MEST"},
        {id:1, nome:"Renato Augusto", curso:"EC", titulacao:"DOUT"},
        {id:2, nome:"Romarinho", curso:"DD", titulacao:"GRAD"},
        {id:3, nome:"Romero", curso:"SI", titulacao:"MEST"},
        {id:4, nome:"Ralf", curso:"RC", titulacao:"GRAD"},
        {id:5, nome:"Richard", curso:"ES", titulacao:"MEST"},
    ]*/

    const [professores, setProfessores] = useState([])
    //const [mudou, setMudou] = useState(false)
    const navigate = useNavigate()

    useEffect(
        () => {
            axios.get("http://localhost:3001/professor/listar")
                .then(
                    (response) => {
                        setProfessores(response.data)
                    }
                )
                .catch(error => console.log(error))
        } 
        ,
        []
    )

    function deleteProfessorById(id) {
        if(window.confirm("Deseja Excluir?")){
            axios.delete(`http://localhost:3001/professor/delete/${id}`)
                .then(
                    (reponse) => {
                        const resultado = professores.filter(professor => professor._id != id)
                        setProfessores(resultado)
                    })
                .catch(error => console.log(error))
            alert("Professor " + id + " excluído com sucesso!")
        }
    }

    function deleteByIdSplice(id){
        for (let i = 0; i < professores.length; i++) {
            if (professores[i]._id == id) {
                professores.splice(i, 1)
                return true
            }
        }  
        return false      
    }

    return (
        <>
            <Typography variant="h5" fontWeight="bold">
                Listar Professor
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{minWidth:650}} arial-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>NOME</TableCell>
                            <TableCell>CURSO</TableCell>
                            <TableCell>TITULACAO</TableCell>
                            <TableCell>AÇÕES</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            professores.map(
                                (professor)=>{
                                    return (
                                        <TableRow>
                                            <TableCell>{professor._id}</TableCell>
                                            <TableCell>{professor.nome}</TableCell>
                                            <TableCell>{professor.curso}</TableCell>
                                            <TableCell>{professor.titulacao}</TableCell>                              
                                            <TableCell>
                                                <Box>
                                                    <IconButton arial-label="edit" color="primary" component={Link} to={`/editarProfessor/${professor._id}`}>
                                                        <EditIcon />
                                                    </IconButton>

                                                    <IconButton arial-label="delete" color="error" onClick={()=>deleteProfessorById(professor._id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Box>    
                                            </TableCell>            
                                        </TableRow>
                                    )
                                }
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    )
}




export default Listar