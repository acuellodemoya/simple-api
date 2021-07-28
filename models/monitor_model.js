const mongoose = require('mongoose');

const monitorSchema = new mongoose.Schema({
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    programa: {
        type: String,
        required: true
    },
    semestre: {
        type: Number,
        required: true
    },
    cedula: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Monitor', monitorSchema);