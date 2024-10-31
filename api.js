const dbCategoria = require('./dbCategoria');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const Categoria = require('./Categoria');

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.route('/categorias').get((request, response)=>{
    dbCategoria.getAllCategoria().then(result => {
        response.json(result);
    })
})

router.route('/categoria/:id').get((request, response) =>{
    dbCategoria.getOneCategoria(request.params.id).then(result => {
        response.json(result);
    })
})

router.route('/categoria/guardar').post((request, response) =>{
    let categoria = {...request.body}
    dbCategoria.insertCategoria(categoria).then(result => {
        response.json(result);
    })
})

router.route('/categoria/actualizar').put((request, response) =>{
    let categoria = {...request.body}
    dbCategoria.updateCategoria(categoria).then(result => {
        response.json(result);
    })
})

router.route('/categoria/eliminar/:id').delete((request, response) =>{
    dbCategoria.deleteCategoria(request.params.id).then(result => {
        response.json(result);
    })
})

var port = process.env.PORT || 8090;
app.listen(port);
console.log('Categoria API iniciando en el puerto : ' + port);

