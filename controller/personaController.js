require('rootpath')();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const persona_db = require("./../model/persona.js")

//rutas del endpoint
app.get('/', getAll);
app.get('/:apellido', getByApellido);
app.post('/create', createPersona);
app.put('/edit/:dni', editPersona);
app.delete('/delete/:dni', deletePersona);

//funciones de los endpoints
function getByApellido(req, res){
    persona_db.getAll((err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
};


function getAll(req, res){
    persona_db.getAll((err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
};


function createPersona(req, res) {

    let persona_register = req.body;
    persona_db.create(persona_register, (err, result)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.json(result);
        }
    });

};

function editPersona(req, res) {

    let persona_edit = req.body;
    let dni = req.params.dni;
    persona_db.edit(persona_edit, dni, (err, result)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.json(result);
        }
    });

};

function deletePersona(req, res){
    let dni = req.params.dni;
    persona_db.delete(dni, (err, result)=>{
        if (err) {
            res.status(500).send(err);
        } else {
            if (result_model.detail.affectedRows == 0) {
                res.status(404).send(result_model.message);
            } else {
                res.send(result_model.message);
            }
        }
    })
}


module.exports = app;