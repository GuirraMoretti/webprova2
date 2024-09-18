const ProfessorModel = require("../models/professor.models")

let professores = [
    {id:0, nome:"Rapozinha", curso:"SI", titulacao:"MEST", ai:{es:true, al:false, ds:false, mc:false}},
    {id:1, nome:"Renato Augusto", curso:"EC", titulacao:"DOUT", ai:{es:false, al:false, ds:false, mc:false}},
    {id:2, nome:"Romarinho", curso:"DD", titulacao:"GRAD", ai:{es:false, al:false, ds:false, mc:false}},
    {id:3, nome:"Romero", curso:"SI", titulacao:"MEST", ai:{es:false, al:false, ds:false, mc:false}},
    {id:4, nome:"Ralf", curso:"RC", titulacao:"GRAD", ai:{es:false, al:true, ds:false, mc:false}},
    {id:5, nome:"Richard", curso:"ES", titulacao:"MEST", ai:{es:true, al:false, ds:false, mc:false}},
]

let id = 6;

class ProfessorService {

    static list() {
        return professores
    }

    static register(data) {
        let professor = new ProfessorModel(
            id++,
            data.nome,
            data.curso,
            data.titulacao,
            data.ai
        )
        professores.push(professor)
        return professor
    }

    static update(id, data) {
        for (let professor of professores) {
            if(professor.id == id) {
                professor.nome = data.nome
                professor.curso = data.curso
                professor.titulacao = data.titulacao
                professor.ai = data.ai
                return professor
            }
        }
        return null
    }

    static delete(id){
        for (let i = 0; i < professores.length; i++) {
            if (professores[i].id == id) {
                professores.splice(i, 1)
                return true
            }
        }  
        return false      
    }

    static retrieve(id){
        for (let i = 0; i < professores.length; i++) {
            if (professores[i].id == id) {
                return professores[i];
            }
        }
        return {}
    }
}

module.exports = ProfessorService