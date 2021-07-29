const mongoose = require('mongoose');
const Monitor = require('./monitor_model');

const monitoriaSchema = new mongoose.Schema({
    materia: {
        type: String,
        required: true
    },
    monitor: {
        type: String, //Se solicita la cedula del monitor
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    salon: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Monitoria', monitoriaSchema);