const express = require('express');
const Monitoria = require('../models/monitoria_model');
const Joi = require('Joi');
const router = express.Router();


//Esquema de validaciones
const schema = Joi.object({
    materia: Joi.string()
        .min(3)
        .max(20)
        .required(),
    monitor: Joi.string()
        .min(5)
        .max(20)
        .required(),
    fecha: Joi.date()
        .required(),
    salon: Joi.string()
        .min(5)
        .max(20)
        .required()
});

router.get('/', (req, res) => {
    let resultado = listarMonitorias();
    resultado.then(monitorias => {
        res.json(monitorias);
    }).catch(err => {
        res.status(400).json({err: err });
    });
});

router.post('/', (req, res) => {
    let resultado = crearMonitoria(req.body);
    resultado.then(monitoria => {
        res.json({mensaje: "¡Monitoria creada con Exito!"});
    }).catch(err => {
        res.status(400).json({err: err });
    });
});

router.put('/:id', (req, res) => {
    let resultado = modificarMonitoria(req.params.id, req.body);
    resultado.then(monitoria => {
        res.json({mensaje: '¡Monitoria modificada con exito!'});
    }).catch(err => {
        res.status(400).json({err: err });
    });
});

router.delete('/:id', (req, res) => { //Se realiza una eliminacion logica cambiando un estado a false.
    let resultado = eliminarMonitoria(req.params.id);
    resultado.then(monitoria => {
        res.json({mensaje: '¡Monitoria Eliminada con Exito!'});
    }).catch(err => {
        res.status(400).json({err: err});
    });
});

//Otras funciones
const listarMonitorias = async () => {
    let monitorias = await Monitoria.find({"estado": true});
    return monitorias;
};

const crearMonitoria = async (body) => {
    let monitoria = new Monitoria({
        materia: body.materia,
        monitor: body.monitor,
        fecha: body.fecha,
        salon: body.salon
    })
    return await monitoria.save();
};

const modificarMonitoria = async (id, body) => {
    let monitoria = await Monitoria.findByIdAndUpdate(id, {
        $set: {
            materia: body.materia,
            monitor: body.monitor,
            fecha: body.fecha,
            salon: body.salon
        }
    }, {new: true});
    return monitoria;
};

const eliminarMonitoria = async (id) => {
    let monitoria = await Monitoria.findByIdAndUpdate(id, {
        $set: {
            estado: false
        }
    }, {new: true});
    return monitoria;
};

module.exports = router;