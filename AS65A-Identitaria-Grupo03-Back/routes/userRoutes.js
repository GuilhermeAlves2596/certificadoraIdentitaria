var express = require('express')
var router = express.Router();
var userDAO = require('../model/users')
const CPFValidation = require('../validators/cpfValidator')

// List all
router.get('/', async (req, res) => {

    const page = parseInt(req.query.page);

    let user = await userDAO.list(page);
    res.json({status: true, msg: 'Usuarios cadastrados: ', user})
})

// List by id
router.get('/:id', async (req, res) => {
    try {
        let user = await userDAO.getById(req.params.id)
        if(user){
            res.json({status: true, msg: 'Usuario encontrado', user})
        } else {
            res.json({status: false, msg: 'Usuario não encontrado.'})
        }
    } catch (error) {
        res.status(500).json({status: false, msg: 'Erro ao buscar o usuario'})
    }
})

// Save
router.post('/save', CPFValidation.validationRulesCPF, CPFValidation.validateCPF, async (req, res) => {
    const {nome, cpf, idade, rua, cidade, telefone, email, profissao, apoiador, voluntario} = req.body;

    userDAO
        .save(nome, cpf, idade, rua, cidade, telefone, email, profissao, apoiador, voluntario)
        .then((user) => {
            res.json({status: true, msg: "Usuario cadastrado com sucesso", user})
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({status: false, msg: "Usuario não cadastrado", err})
        })
})

// Update user
router.put('/update/:id', CPFValidation.validationRulesCPF, CPFValidation.validateCPF, async (req, res) => {
    try {
        const {id} = req.params;
        const {nome, cpf, idade, rua, cidade, telefone, email, profissao, apoiador, voluntario} = req.body;

        let [result] = await userDAO.update(id, nome, cpf, idade, rua, cidade, telefone, email, profissao, apoiador, voluntario)
        if(result){
            res.json({status: true, msg: 'Usuário alterado com sucesso'})
        } else {
            res.json({status: false, msg: 'Erro ao alterar o usuario.'})
        }
    } catch (error) {
        res.status(500).json({status: false, msg: 'Usuario não encontrado'})
    }
})

// Delete user
router.delete('/delete/:id', async (req, res) => {
    try {
        let userId = await userDAO.delete(req.params.id)
        if(userId){
            res.json({status: true, msg: 'Usuário excluído com sucesso'})
        } else {
            res.json({status: false, msg: 'Erro ao excluir o usuario.'})
        }
    } catch (error) {
        res.status(500).json({status: false, msg: 'Usuario não encontrado'})
    }
})

module.exports = router;