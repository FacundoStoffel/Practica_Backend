const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
morgan(':method :url :status :res[content-length] - :response-time ms');

const config = require("./config.json");
const controllerUser = require("./controller/usuarioController.js");
const controllerPersona = require("./controller/personaController.js");

app.use('/usuario', controllerUser);
app.use('/persona', controllerPersona);



app.listen(config.server.port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('servidor escuchando en el puerto ' + config.server.port)
    }
});