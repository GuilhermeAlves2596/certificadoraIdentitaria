var express = require('express')
var router = express.Router();
var professorDAO = require('../model/professores')
const CPFValidation = require("../validators/cpfValidator");


// Login
router.post('/login', async (req, res) => {

    const { login, senha } = req.body;
    let profCadastrado = await professorDAO.consultaLogin(login, senha);

    if (!!profCadastrado) {
        res.json({ user: profCadastrado, status: true, msg: "Login efetuado com sucesso" })
    } else {
        res.status(403).json({ status: false, msg: 'Usuario/Senha invalidos' })
    }

})

// List all
router.get('/', async (req, res) => {

    const page = parseInt(req.query.page);

    let professor = await professorDAO.list(page);
    res.json({ status: true, msg: 'Professores cadastrados: ', professor })
})

// List by id
router.get('/:id', async (req, res) => {
    try {
        let professor = await professorDAO.getById(req.params.id)
        if (professor) {
            res.json({ status: true, msg: 'Professor encontrado', professor })
        } else {
            res.json({ status: false, msg: 'Professor não encontrado.' })
        }
    } catch (error) {
        res.status(500).json({ status: false, msg: 'Erro ao buscar o Professor' })
    }
})

// Relatorio de professores por curso
router.post('/curso', async (req, res) => {
    
        const { curso }  = req.body
        let professores = await professorDAO.getProfByCurso(curso);
        if(professores.length > 0) {
            res.json({ status: true, msg: 'Professores encontrados', professores })
        } else {
            res.json({ status: false, msg: 'Professor não encontrado.' })
        }

})

// Save
router.post('/save', CPFValidation.validationRulesCPF, CPFValidation.validateCPF, async (req, res) => {
    const { nome, login, senha, cpf, idade, rua, cidade, telefone, email, curso, apoiador, voluntario } = req.body;

    // Verificar se já existe um professor cadastrado no banco de dados com o mesmo login
    const verificaProf = await professorDAO.getProfByUsuario(login);
    if (verificaProf) {
        return res.status(403).json({ status: false, msg: 'Já existe um professor cadastrado com esse login' });
    }

    professorDAO
        .save(nome, login, senha, cpf, idade, rua, cidade, telefone, email, curso, apoiador, voluntario)
        .then((professor) => {
            res.json({ status: true, msg: "Professor cadastrado com sucesso", professor })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ status: false, msg: "Professor não cadastrado", err })
        })
})

// Update professor
router.put('/update/:id', CPFValidation.validationRulesCPF, CPFValidation.validateCPF, async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, login, senha, cpf, idade, rua, cidade, telefone, email, curso, apoiador, voluntario } = req.body;

        let [result] = await professorDAO.update(id, nome, login, senha, cpf, idade, rua, cidade, telefone, email, curso, apoiador, voluntario)
        if (result) {
            res.json({ status: true, msg: 'Professor alterado com sucesso' })
        } else {
            res.json({ status: false, msg: 'Erro ao alterar o Professor.' })
        }
    } catch (error) {
        res.status(500).json({ status: false, msg: 'Professor não encontrado' })
    }
})

// Delete professor
router.delete('/delete/:id', async (req, res) => {
    try {
        let professorId = await professorDAO.delete(req.params.id)
        if (professorId) {
            res.json({ status: true, msg: 'Professor excluído com sucesso' })
        } else {
            res.json({ status: false, msg: 'Erro ao excluir o Professor.' })
        }
    } catch (error) {
        res.status(500).json({ status: false, msg: 'Professor não encontrado' })
    }
})

module.exports = router;