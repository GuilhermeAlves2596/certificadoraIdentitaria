const express = require('express')
const router = express.Router()
const sequelize = require('../helpers/bd')
const userModel = require('../model/users')
const professorModel = require('../model/professores')
const empresaModel = require('../model/empresas')

router.get('/', async (req, res) => {
    await sequelize.sync({ force: true })

    // Popula usuarios
    let user1 = await userModel.save('Guilherme', '12345678910', '20', 'Moises Dias', 'Londrina', '99999-9999', 'usuario@gmail.com', 'Medico', true, false);
    let user2 = await userModel.save('John Doe', '9876543210', '30', 'Jane Smith', 'New York', '12345', 'johndoe@email.com', 'Engineer', true, false);
    let user3 = await userModel.save('Alice Johnson', '5555555555', '25', 'Bob Williams', 'Los Angeles', '54321', 'alicej@email.com', 'Teacher', true, false);
    let user4 = await userModel.save('Michael Brown', '1111111111', '40', 'Sarah Davis', 'Chicago', '67890', 'michaelb@email.com', 'Lawyer', true, false);
    let user5 = await userModel.save('Emma Wilson', '9999999999', '28', 'James Miller', 'Houston', '13579', 'emmaw@email.com', 'Artist', true, false);
    let user6 = await userModel.save('Olivia Lee', '8888888888', '22', 'Liam Smith', 'Phoenix', '24680', 'olivial@email.com', 'Chef', true, false);
    let user7 = await userModel.save('William Johnson', '7777777777', '33', 'Sophia Martin', 'San Francisco', '86420', 'williamj@email.com', 'Designer', true, false);
    let user8 = await userModel.save('Ava Martinez', '6666666666', '29', 'Ethan Wilson', 'Dallas', '97531', 'avam@email.com', 'Accountant', true, false);
    let user9 = await userModel.save('Mia Taylor', '4444444444', '35', 'Noah Anderson', 'Miami', '12345', 'miat@email.com', 'Writer', true, false);
    let user10 = await userModel.save('Ethan Hernandez', '3333333333', '27', 'Lily Jackson', 'Seattle', '54321', 'ethanh@email.com', 'Doctor', true, false);
    let user11 = await userModel.save('Charlotte Davis', '2222222222', '31', 'Oliver White', 'San Diego', '13579', 'charlotted@email.com', 'Developer', true, false);
    let user12 = await userModel.save('Lucas Adams', '9999999998', '26', 'Isabella Harris', 'Denver', '24680', 'lucasa@email.com', 'Entrepreneur', true, false);
    let user13 = await userModel.save('Liam Wilson', '8888888887', '21', 'Ava Jackson', 'Austin', '86420', 'liamw@email.com', 'Nurse', true, false);
    let user14 = await userModel.save('Sophia Thomas', '7777777776', '37', 'Mason Moore', 'Boston', '97531', 'sophiat@email.com', 'Architect', true, false);
    let user15 = await userModel.save('Oliver King', '6666666665', '24', 'Ella Allen', 'San Antonio', '12345', 'oliverk@email.com', 'Police Officer', true, false);
    let user16 = await userModel.save('Amelia Evans', '5555555554', '38', 'Benjamin Young', 'Portland', '54321', 'ameliae@email.com', 'Dentist', true, false);
    let user17 = await userModel.save('Benjamin Turner', '4444444443', '23', 'Grace Walker', 'San Jose', '13579', 'benjamint@email.com', 'Electrician', true, false);
    let user18 = await userModel.save('Ella Scott', '3333333332', '32', 'Henry Lewis', 'Philadelphia', '24680', 'ellasc@email.com', 'Plumber', true, false);
    let user19 = await userModel.save('Henry Mitchell', '2222222221', '34', 'Scarlett Hall', 'San Diego', '86420', 'henrym@email.com', 'Carpenter', true, false);
    let user20 = await userModel.save('Scarlett Collins', '1111111110', '25', 'Jackson Clark', 'Las Vegas', '97531', 'scarlettc@email.com', 'Electrician', true, false);
    let user21 = await userModel.save('Jackson Phillips', '0000000001', '27', 'Aria Turner', 'Orlando', '12345', 'jacksonp@email.com', 'Chef', true, false);
    let user22 = await userModel.save('Aria Baker', '0000000002', '28', 'Lucas Garcia', 'Atlanta', '54321', 'ariab@email.com', 'Teacher', true, false);
    let user23 = await userModel.save('Lucas Robinson', '0000000003', '29', 'Mia Foster', 'Denver', '13579', 'lucasr@email.com', 'Designer', true, false);
    let user24 = await userModel.save('Mia White', '0000000004', '30', 'Ethan Adams', 'Chicago', '24680', 'miaw@email.com', 'Engineer', true, false);
    let user25 = await userModel.save('Ethan Hall', '0000000005', '31', 'Olivia King', 'Phoenix', '86420', 'ethanh@email.com', 'Doctor', true, false);
    let user26 = await userModel.save('Olivia Mitchell', '0000000006', '32', 'William Turner', 'San Francisco', '97531', 'oliviam@email.com', 'Writer', true, false);
    let user27 = await userModel.save('William Scott', '0000000007', '33', 'Ava Phillips', 'Dallas', '12345', 'williams@email.com', 'Lawyer', true, false);
    let user28 = await userModel.save('Ava Collins', '0000000008', '34', 'Liam Davis', 'Miami', '54321', 'avac@email.com', 'Artist', true, false);
    let user29 = await userModel.save('Liam Phillips', '0000000009', '35', 'Sophia Turner', 'Los Angeles', '13579', 'liamp@email.com', 'Police Officer', true, false);
    let user30 = await userModel.save('Sophia Robinson', '0000000010', '36', 'Oliver King', 'Houston', '24680', 'sophiar@email.com', 'Entrepreneur', true, false);

    let users = [user1, user2, user3, user4, user5, user6, user7, user8, user9, user10, user11, user12, user13, user14, user15, user16, user17, user18, user19, user20, user21, user22, user23, user24, user25, user26, user27, user28, user29, user30];

    // Popula professores
    let prof1 = await professorModel.save('Joao', 'joao123', 'joao123', '12345678911', '40', 'Sem Saida', 'São Paulo', '11111-1111', 'joao@gmail.com', 'Engenharia Mecanica', false, true);
    let prof2 = await professorModel.save('Maria', 'maria123', 'maria123', '98765432100', '35', 'Rua Principal', 'Rio de Janeiro', '22222-2222', 'maria@gmail.com', 'Medicina', true, true);
    let prof3 = await professorModel.save('Pedro', 'pedro123', 'pedro123', '55555555555', '28', 'Avenida Central', 'Salvador', '33333-3333', 'pedro@gmail.com', 'Ciências da Computação', false, false);
    let prof4 = await professorModel.save('Ana', 'ana123', 'ana123', '44444444444', '33', 'Rua da Paz', 'Curitiba', '44444-4444', 'ana@gmail.com', 'Direito', true, true);
    let prof5 = await professorModel.save('Lucas', 'lucas123', 'lucas123', '77777777777', '27', 'Avenida da Liberdade', 'Belo Horizonte', '55555-5555', 'lucas@gmail.com', 'Psicologia', false, true);
    let prof6 = await professorModel.save('Carla', 'carla123', 'carla123', '66666666666', '45', 'Rua das Flores', 'Porto Alegre', '66666-6666', 'carla@gmail.com', 'Engenharia Civil', true, false);
    let prof7 = await professorModel.save('Rafael', 'rafael123', 'rafael123', '88888888888', '31', 'Avenida Central', 'Recife', '77777-7777', 'rafael@gmail.com', 'Administração', true, true);
    let prof8 = await professorModel.save('Julia', 'julia123', 'julia123', '99999999999', '29', 'Rua do Comércio', 'Fortaleza', '88888-8888', 'julia@gmail.com', 'Economia', false, true);
    let prof9 = await professorModel.save('Fernando', 'fernando123', 'fernando123', '22222222222', '38', 'Avenida da Praia', 'Natal', '99999-9999', 'fernando@gmail.com', 'Arquitetura', true, false);
    let prof10 = await professorModel.save('Mariana', 'mariana123', 'mariana123', '33333333333', '32', 'Rua do Porto', 'Manaus', '10101-1010', 'mariana@gmail.com', 'Medicina Veterinária', true, true);
    let prof11 = await professorModel.save('Carlos', 'carlos123', 'carlos123', '12344321123', '41', 'Rua do Sol', 'Florianópolis', '12121-1212', 'carlos@gmail.com', 'Engenharia Elétrica', false, true);
    let prof12 = await professorModel.save('Larissa', 'larissa123', 'larissa123', '55555555555', '30', 'Avenida da Esperança', 'Goiânia', '13131-1313', 'larissa@gmail.com', 'Medicina', true, false);
    let prof13 = await professorModel.save('Guilherme', 'guilherme123', 'guilherme123', '88888888888', '25', 'Rua dos Sonhos', 'Brasília', '14141-1414', 'guilherme@gmail.com', 'Ciências da Computação', false, true);
    let prof14 = await professorModel.save('Isabela', 'isabela123', 'isabela123', '66666666666', '37', 'Avenida da Liberdade', 'Porto Alegre', '15151-1515', 'isabela@gmail.com', 'Direito', true, true);
    let prof15 = await professorModel.save('Hugo', 'hugo123', 'hugo123', '11111111111', '28', 'Rua dos Artistas', 'Salvador', '16161-1616', 'hugo@gmail.com', 'Psicologia', false, false);
    let prof16 = await professorModel.save('Luis', 'luis123', 'luis123', '22222222222', '39', 'Avenida das Rosas', 'Belo Horizonte', '17171-1717', 'luis@gmail.com', 'Engenharia Civil', true, true);
    let prof17 = await professorModel.save('Simone', 'simone123', 'simone123', '77777777777', '29', 'Rua das Palmeiras', 'Rio de Janeiro', '18181-1818', 'simone@gmail.com', 'Administração', false, true);

    let professores = [prof1, prof2, prof3, prof4, prof5, prof6, prof7, prof8, prof9, prof10, prof11, prof12, prof13, prof14, prof15, prof16, prof17];

    // Popula empresas
    let empresa1 = await empresaModel.save('Empresa 1', '12.123.654/0001-40', 'Com Saida', 'Cornélio Procópio', '4444444-4444', 'empresa1@hotmail.com', true, true);
    let empresa2 = await empresaModel.save('Empresa 2', '98.765.432/0001-01', 'Sem Saida', 'Curitiba', '1111111-1111', 'empresa2@hotmail.com', false, false);
    let empresa3 = await empresaModel.save('Empresa 3', '76.543.210/0001-12', 'Com Saida', 'São Paulo', '2222222-2222', 'empresa3@hotmail.com', true, true);
    let empresa4 = await empresaModel.save('Empresa 4', '54.321.098/0001-23', 'Com Saida', 'Belo Horizonte', '3333333-3333', 'empresa4@hotmail.com', true, false);
    let empresa5 = await empresaModel.save('Empresa 5', '32.109.876/0001-34', 'Sem Saida', 'Rio de Janeiro', '4444444-4444', 'empresa5@hotmail.com', false, true);
    let empresa6 = await empresaModel.save('Empresa 6', '10.987.654/0001-45', 'Sem Saida', 'Porto Alegre', '5555555-5555', 'empresa6@hotmail.com', true, false);
    let empresa7 = await empresaModel.save('Empresa 7', '89.876.543/0001-56', 'Com Saida', 'Salvador', '6666666-6666', 'empresa7@hotmail.com', true, true);
    let empresa8 = await empresaModel.save('Empresa 8', '67.654.321/0001-67', 'Com Saida', 'Recife', '7777777-7777', 'empresa8@hotmail.com', false, true);
    let empresa9 = await empresaModel.save('Empresa 9', '45.432.109/0001-78', 'Sem Saida', 'Natal', '8888888-8888', 'empresa9@hotmail.com', true, false);
    let empresa10 = await empresaModel.save('Empresa 10', '23.210.987/0001-89', 'Com Saida', 'Brasília', '9999999-9999', 'empresa10@hotmail.com', true, true);
    let empresa11 = await empresaModel.save('Empresa 11', '01.098.765/0001-90', 'Sem Saida', 'Goiânia', '1010101-1010', 'empresa11@hotmail.com', false, true);
    let empresa12 = await empresaModel.save('Empresa 12', '87.654.321/0001-21', 'Com Saida', 'Manaus', '1111111-1111', 'empresa12@hotmail.com', true, false);
    let empresa13 = await empresaModel.save('Empresa 13', '65.432.109/0001-32', 'Com Saida', 'Florianópolis', '1212121-1212', 'empresa13@hotmail.com', false, true);
    let empresa14 = await empresaModel.save('Empresa 14', '43.210.876/0001-43', 'Sem Saida', 'Fortaleza', '1313131-1313', 'empresa14@hotmail.com', true, false);
    let empresa15 = await empresaModel.save('Empresa 15', '21.987.654/0001-54', 'Com Saida', 'Fortaleza', '1414141-1414', 'empresa15@hotmail.com', true, true);
    
    let empresas = [empresa1, empresa2, empresa3, empresa4, empresa5, empresa6, empresa7, empresa8, empresa9, empresa10, empresa11, empresa12, empresa13, empresa14, empresa15];


    res.json({
        status: true, msg: 'Tabelas criadas com sucesso',
        users: users,
        professores: professores,
        empresas: empresas
    })

})

module.exports = router