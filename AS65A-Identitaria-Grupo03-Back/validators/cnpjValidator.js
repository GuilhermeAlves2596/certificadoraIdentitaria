const {validationResult, body} = require('express-validator');

exports.validationRulesCNPJ = [
    body('email').isEmail().withMessage("Endereço de e-mail inválido. "),
    body('cnpj').custom(value => {
        if(!verifyCNPJ(value)) {
            throw new Error("Insira um CNPJ válido. ");
        }
        return true;
    }),
    body('nome').isLength({ min: 1 }).withMessage("O campo nome está vazio. "),
    body('rua').isLength({ min: 1 }).withMessage("O campo rua está vazio. "),
    body('cidade').isLength({ min: 1 }).withMessage("O campo cidade está vazio. "),
    body('telefone').custom(value => {
        if(!isValidPhoneNumber(value)) {
            throw new Error("Insira um número de telefone válido. ");
        }
        return true;
    })
]

exports.validateCNPJ = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({Erros: errors.array()})
    }
    next();
}

function verifyCNPJ(cnpj) {
    let unmaskedCnpj = cnpj.replace(/[.\/-]/g, "");
    return unmaskedCnpj.length === 14;
}



function isValidPhoneNumber(phone) {
    // (99) 99999-9999 ou (99) 9999-9999
    const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/gi;
    return telefoneRegex.test(phone);
}