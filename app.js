const express = require('express');
const mongoose = require('mongoose');
const monitor = require('./routes/monitor');
const monitoria = require('./routes/monitoria');

const app = express();

//Coneccion a BD
mongoose.connect('mongodb://acuellodemoya:12345@cluster0-shard-00-00.rmq1t.mongodb.net:27017,cluster0-shard-00-01.rmq1t.mongodb.net:27017,cluster0-shard-00-02.rmq1t.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-wbu96u-shard-0&authSource=admin&retryWrites=true&w=majority',{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err  => console.log(`Ha ocurrido un error: \n ${err}`));

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Rutas
app.use('/api/monitor', monitor);
app.use('/api/monitoria', monitoria);

//Levantando servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API funcionando en el puerto ${port}...`);
});
