const express = require('express');
const router = express.Router();

let usuarios = [];

// RETORNA TODOS OS LOGINS
router.get('/', (req, res) => {
    res.json(usuarios);
});

// FAZ CADASTRO NO SISTEMA
router.post('/', function (req, res) {

    const usuario = {
        login: req.body.login,
        senha: req.body.senha
    };

    usuarios.push(usuario);

    console.log(usuarios);

    res.json(usuario);

})

module.exports = router;