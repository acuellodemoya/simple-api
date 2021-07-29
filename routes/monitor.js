const express = require('express');
const Monitor = require('../models/monitor_model');
const Joi = require('Joi');
const router = express.Router();

//Esquema de validaciones
const schema = Joi.object({

    nombres: Joi.string()
        .min(3)
        .max(20)
        .required(),

    apellidos: Joi.string()
        .min(3)
        .max(20)
        .required(),
    programa: Joi.string()
        .min(5)
        .max(20)
        .required(),
    semestre: Joi.number()
        .required(),
    cedula: Joi.number()
        .required(),
    telefono: Joi.number()
        .required(),
    correo: Joi.string()
        .email()
});

//Rutas
router.get('/', (req, res) => { //GET (lista de usuarios)
    let resultado = listarMonitores();
    resultado.then(monitores => {
            res.status(200).json(monitores)
        }).catch(err => {
            res.status(400).json({err})
        });
});

router.post('/', async (req, res) => {
    let body = req.body;
    const {error, value} = schema.validate({
        nombres: body.nombres,
        apellidos: body.apellidos,
        programa: body.programa,
        semestre: body.semestre,
        cedula: body.cedula,
        telefono: body.telefono,
        correo: body.correo
    });

    if(!error){
        let resultado = crearMonitor(body);

        resultado.then( monitor => {
            res.json({
                valor: monitor
            });
        }).catch(err => {
            res.status(400).json({ err: err });
        });
    }else{
        res.status(400).json({ error: error});
    }
});

router.put('/:id', (req, res) => {
    let body = req.body;
    const {error, value} = schema.validate({
        nombres: body.nombres,
        apellidos: body.apellidos,
        programa: body.programa,
        semestre: body.semestre,
        cedula: body.cedula,
        telefono: body.telefono,
        correo: body.correo
    });

    if(!error){
        let resultado = actualizarMonitor(req.params.id, body);
        resultado.then(valor => {
            res.json({valor: valor})
        }).catch(err => {
            res.status(400).json({err: err});
        });
    }else{
        res.status(400).json({error: error});
    }
});

router.delete('/:id', (req, res) => {
    let resultado = eliminarMonitor(req.params.id);
    resultado.then(valor => {
        res.json({
            mensaje: "Eliminado Exitosamente"
        })
    }).catch(err => {
        res.status(400).json({err: err })
    });
});


//Otras funciones
const listarMonitores = async () => {
    let monitores = await Monitor.find({"estado": true});
    return monitores;
};

const crearMonitor = async (body) => {
    let monitor = new Monitor({
        nombres: body.nombres,
        apellidos: body.apellidos,
        programa: body. programa,
        semestre: body.semestre,
        cedula: body.cedula,
        telefono: body.telefono,
        correo: body.correo
    });

    return await monitor.save();
};

const actualizarMonitor = async (id, body) => {
    let monitor = await Monitor.findOneAndUpdate({"_id": id}, {
        $set: {
            nombres: body.nombres,
            apellidos: body.apellidos,
            programa: body.programa,
            semestre: body.semestre,
            cedula: body.cedula,
            telefono: body.telefono,
            correo: body.correo
        }
    }, {new: true});
    return monitor;
};

const eliminarMonitor = async (id) => {
    let monitor = await Monitor.findOneAndUpdate({"_id": id}, {
        $set: {
            estado: false
        }
    }, {new: true});
    return monitor;
};


module.exports = router;