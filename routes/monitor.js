const express = require('express');
const Monitor = require('../models/monitor_model');
const Joi = require('Joi');
const router = express.Router();

//Esquema de validaciones
const schema = Joi.object({
    nombre: Joi.string()
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


module.exports = router;