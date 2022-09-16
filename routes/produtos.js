const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const multer = require ('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

let produtos = [];

// RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
    res.json(produtos);
    res.status(200).send({
        mensagem: 'Retorna todos os produtos',
    });
});

// INSERE UM PRODUTO
router.post('/', upload.single('imagem_produto'), (req, res, next) => {

    console.log(req.file);

    const produto = {
        nome: req.body.nome,
        preco: req.body.preco,
        imagem: req.body.imagem_produto
    };
    produtos.push(produto);
    produto.id = uuidv4();

    res.json(produto)

    res.status(201).send({
        mensagem: 'Insere um produto',
        produtoCriado: produto
    })
});

// RETORNA OS DADOS DE UM PRODUTOS
router.get('/:id', (req, res, next) => {
    const { id } = req.params;

    if (id === 'especial') {
        res.status(200).send ({
            mensagem: 'Você descobriu o ID especial',
            id: id
        });
    } else {
        const produto = produtos.find(produto => produto.id === id)
      
        res.json(produto)
        }
    });

// ALTERA UM PRODUTO
router.put('/:id', (req, res, next) => {

    const { id } = req.params;
    const { nome, preco } = req.body

    const produto = produtos.find(produto => produto.id === id)

    produto.nome = nome,
    produto.preco = preco
    
    res.json(produto)

    res.status(201).send({
        mensagem: 'Produto alterado'
    })
});

// DELETA UM PRODUTO
router.delete('/:id', (req, res, next) => {
    const { id } = req.params;

    produtos.splice(id, 1);
    return res.json({ 
        mensagem: 'O usuário ${id} foi deletado'});
});

module.exports = router;