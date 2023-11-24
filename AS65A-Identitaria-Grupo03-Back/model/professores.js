const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd")

const professorModel = sequelize.define('Professores',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: DataTypes.STRING,
        login: DataTypes.STRING,
        senha: DataTypes.STRING,
        cpf: DataTypes.STRING,
        idade: DataTypes.INTEGER,
        rua: DataTypes.STRING,
        cidade: DataTypes.STRING,
        telefone: DataTypes.STRING,
        email: DataTypes.STRING,
        curso: DataTypes.STRING,
        apoiador: DataTypes.BOOLEAN,
        voluntario: DataTypes.BOOLEAN
    }

)

module.exports = {

    list: async function (page) {
        const limit = 10;
        const offset = (page - 1) * limit;
        const professor = await professorModel.findAll({
            offset,
            limit,
        });
        const countProfessor = await professorModel.count();

        return { data: professor, total: countProfessor };
    },

    save: async function (nome, login, senha, cpf, idade, rua, cidade, telefone, email, curso, apoiador, voluntario) {

        const professor = professorModel.create({
            nome: nome,
            login: login,
            senha: senha,
            cpf: cpf,
            idade: idade,
            rua: rua,
            cidade: cidade,
            telefone: telefone,
            email: email,
            curso: curso,
            apoiador: apoiador,
            voluntario: voluntario
        })
        return professor;
    },

    update: async function (id, nome, login, senha, cpf, idade, rua, cidade, telefone, email, curso, apoiador, voluntario) {
        return await professorModel.update({
            nome: nome, login: login, senha: senha, cpf: cpf, idade: idade, rua: rua, cidade: cidade,
            telefone: telefone, email: email, curso: curso, apoiador: apoiador, voluntario: voluntario
        },
            {
                where: { id: id }
            })
    },

    delete: async function (id) {
        const professor = await professorModel.findByPk(id)
        return professor.destroy();
    },

    getById: async function (id) {
        return await professorModel.findByPk(id);
    },

    consultaLogin: async function (login, senha) {
        try {
            const professor = await professorModel.findOne({
                where: {
                    login: login,
                    senha: senha
                }
            });
            return professor;
        } catch (error) {
            console.error("Login ou senha incorretos", error);
            throw error;
        }
    },

    getProfByUsuario: async function (login) {
        try {
            const professor = await professorModel.findAll({
                where: {
                    login: login,
                },
            });
            return professor.length > 0 ? professor[0] : null;
        } catch (error) {
            console.error('Erro ao buscar professor por usuário', error);
            throw error;
        }
    },

    getProfByCurso: async function (curso) {
        try {
            const professor = await professorModel.findAll({
                where: {
                    curso: curso,
                },
            });
            return professor;
        } catch (error) {
            console.error('Erro ao buscar professor por curso', error);
            throw error;
        }
    },

    Model: professorModel,
}