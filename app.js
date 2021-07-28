const express = require('express');
const mongoose = require('mongoose');

const app = express();

//Coneccion a BD
mongoose.connect('mongodb+srv://acuellodemoya:12345@cluster0.rmq1t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err  => console.log(`Ha ocurrido un error: \n ${err}`));

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));



//Levantando servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API funcionando en el puerto ${port}...`);
});
