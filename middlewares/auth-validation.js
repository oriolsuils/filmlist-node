const joi = require('@hapi/joi');

//Register validation
const registerValidation = (body) => {
    const schema = joi.object({
        name: joi.string().min(6).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    });

    return schema.validate(body);
}

const loginValidation = (body) => {
    const schema = joi.object({
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    });

    return schema.validate(body);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;