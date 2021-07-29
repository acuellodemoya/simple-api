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

module.exports = router;