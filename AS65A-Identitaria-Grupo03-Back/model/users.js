const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd")

const userModel = sequelize.define('Usuarios',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: DataTypes.STRING,
        cpf: DataTypes.STRING,
        idade: DataTypes.INTEGER,
        rua: DataTypes.STRING,
        cidade: DataTypes.STRING,
        telefone: DataTypes.STRING,
        email: DataTypes.STRING,
        profissao: DataTypes.STRING,
        apoiador: DataTypes.BOOLEAN,
        voluntario: DataTypes.BOOLEAN
    }

)

module.exports = {

    list: async function (page) {
        const limit = 10
        const offset = (page - 1) * limit;
        const user = await userModel.findAll({
            offset,
            limit
        });
        const countUser = await userModel.count();

        return { data: user, total: countUser };
    },

    save: async function (nome, cpf, idade, rua, cidade, telefone, email, profissao, apoiador, voluntario) {

        const user = userModel.create({
            nome: nome,
            cpf: cpf,
            idade: idade,
            rua: rua,
            cidade: cidade,
            telefone: telefone,
            email: email,
            profissao: profissao,
            apoiador: apoiador,
            voluntario: voluntario
        })
        return user;
    },

    update: async function (id, nome, cpf, idade, rua, cidade, telefone, email, profissao, apoiador, voluntario) {
        return await userModel.update({
            nome: nome, cpf: cpf, idade: idade, rua: rua, cidade: cidade,
            telefone: telefone, email: email, profissao: profissao, apoiador: apoiador, voluntario: voluntario
        },
            {
                where: { id: id }
            })
    },

    delete: async function (id) {
        const user = await userModel.findByPk(id)
        return user.destroy();
    },

    getById: async function (id) {
        return await userModel.findByPk(id);
    },

    Model: userModel,

}