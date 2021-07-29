const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Monitor = require('./monitor_model');

const monitoriaSchema = new mongoose.Schema({
    materia: {
        type: String,
        required: true
    },
    monitor: {
        type: Schema.ObjectId,
        ref: "Monitor",
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    salon: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Monitoria', monitoriaSchema);