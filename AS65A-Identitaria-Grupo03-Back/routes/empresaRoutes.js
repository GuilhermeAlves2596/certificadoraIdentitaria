var express = require('express')
var router = express.Router();
var empresaDAO = require('../model/empresas')
const cnpjValidator = require('../validators/cnpjValidator');


// List all
router.get('/', async (req, res) => {

    const page = parseInt(req.query.page);

    let empresa = await empresaDAO.list(page);
    res.json({status: true, msg: 'Empresas cadastrados: ', empresa})
})

// List by id
router.get('/:id', async (req, res) => {
    try {
        let empresa = await empresaDAO.getById(req.params.id)
        if(empresa){
            res.json({status: true, msg: 'Empresa encontrada', empresa})
        } else {
            res.json({status: false, msg: 'Empresa não encontrada.'})
        }
    } catch (error) {
        res.status(500).json({status: false, msg: 'Erro ao buscar a empresa'})
    }
})

// Save
router.post('/save', cnpjValidator.validationRulesCNPJ, cnpjValidator.validateCNPJ, async (req, res) => {
    const {nome, cnpj, rua, cidade, telefone, email, apoiador, voluntario} = req.body;

    empresaDAO
        .save(nome, cnpj, rua, cidade, telefone, email, apoiador, voluntario)
        .then((empresa) => {
            res.json({status: true, msg: "Empresa cadastrado com sucesso", empresa})
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({status: false, msg: "Empresa não cadastrada", err})
        })
})

// Update empresa
router.put('/update/:id', cnpjValidator.validationRulesCNPJ, cnpjValidator.validateCNPJ, async (req, res) => {
    try {
        const {id} = req.params;
        const {nome, cnpj, rua, cidade, telefone, email, apoiador, voluntario} = req.body;

        let [result] = await empresaDAO.update(id, nome, cnpj, rua, cidade, telefone, email, apoiador, voluntario)
        if(result){
            res.json({status: true, msg: 'Empresa alterada com sucesso'})
        } else {
            res.json({status: false, msg: 'Erro ao alterar a empresa.'})
        }
    } catch (error) {
        res.status(500).json({status: false, msg: 'Empresa não encontrada'})
    }
})

// Delete empresa
router.delete('/delete/:id', async (req, res) => {
    try {
        let empresaId = await empresaDAO.delete(req.params.id)
        if(empresaId){
            res.json({status: true, msg: 'Empresa excluída com sucesso'})
        } else {
            res.json({status: false, msg: 'Erro ao excluir a empresa.'})
        }
    } catch (error) {
        res.status(500).json({status: false, msg: 'Empresa não encontrada'})
    }
})

module.exports = router;