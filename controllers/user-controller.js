const User = require('../models/user');
const { registerValidation, loginValidation } = require('./../middlewares/auth-validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function findUserByEmail (email) {
    let user = await User.findOne({email: email});
    return user;
}

async function createUser (body, hashedPass) {
    const user = new User({
        name: body.name,
        email: body.email,
        password: hashedPass
    });

    return user.save();
}

async function registerUser (body) {
    let { error } = registerValidation(body);
    if(error) return ({error: error.details[0].message});

    let user = await findUserByEmail(body.email)
    if(user) return ({error: 'Email already exists'});

    let salt = await bcrypt.genSalt(10);
    let hashedPass = await bcrypt.hash(body.password, salt);

    return await createUser(body, hashedPass);
}

async function login (body) {
    let { error } = loginValidation(body);
    if(error) return ({error: error.details[0].message});

    let user = await findUserByEmail(body.email);
    if(!user) return ({error: 'Email or password is wrong'});

    let validPass = await bcrypt.compare(body.password, user.password);
    if(!validPass) return ({error: 'Email or password is wrong'});

    let token = jwt.sign({ _id: user._id}, process.env.TOKEN_SECRET, { expiresIn: '1h'});
    return token;
}

module.exports.registerUser = registerUser;
module.exports.login = login;