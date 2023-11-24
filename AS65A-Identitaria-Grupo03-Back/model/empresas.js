const { DataTypes } = require("sequelize")
const sequelize = require("../helpers/bd")

const empresaModel = sequelize.define('Empresas',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: DataTypes.STRING,
        cnpj: DataTypes.STRING,
        rua: DataTypes.STRING,
        cidade: DataTypes.STRING,
        telefone: DataTypes.STRING,
        email: DataTypes.STRING,
        apoiador: DataTypes.BOOLEAN,
        voluntario: DataTypes.BOOLEAN
    }

)

module.exports = {

    list: async function (page) {
        const limit = 10;
        const offset = (page - 1) * limit;
        const empresa = await empresaModel.findAll({
            offset,
            limit,
        });

        const countComapany = await empresaModel.count();


        return { data: empresa, total: countComapany };
    },

    save: async function (nome, cnpj, rua, cidade, telefone, email, apoiador, voluntario) {

        const empresa = empresaModel.create({
            nome: nome,
            cnpj: cnpj,
            rua: rua,
            cidade: cidade,
            telefone: telefone,
            email: email,
            apoiador: apoiador,
            voluntario: voluntario
        })
        return empresa;
    },

    update: async function (id, nome, cnpj, rua, cidade, telefone, email, apoiador, voluntario) {
        return await empresaModel.update({
            nome: nome,
            cnpj: cnpj,
            rua: rua,
            cidade: cidade,
            telefone: telefone,
            email: email,
            apoiador: apoiador,
            voluntario: voluntario
        },
            {
                where: { id: id }
            })
    },

    delete: async function (id) {
        const empresa = await empresaModel.findByPk(id)
        return empresa.destroy();
    },

    getById: async function (id) {
        return await empresaModel.findByPk(id);
    },

    Model: empresaModel,
}