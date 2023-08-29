const User = require('../models/user');
const validationSession = require('../util/validation-session');
const validation = require('../util/validation');

function getSignup (req, res) {
    const defaultData = {
        email: '',
        confirmEmail: '',
        password: '',
        name: '',
        address: {
            street: '',
            postal: '',
            city: ''
        }
    }
    const inputData = validationSession.getSessionErrorData(req, defaultData);

    res.render('signup', {inputData: inputData});
}

function getLogin (req, res, next) {
    const defaultData = {
        email: '',
        password: ''
    }

    const inputData = validationSession.getSessionErrorData(req, defaultData);
    res.render('login', {inputData: inputData});
}

async function signup (req, res) {
    const userData = req.body;
    const enteredEmail = userData.email;
    const enteredConfirmEmail = userData.confirmEmail;
    const enteredPassword = userData.password;
    const enteredName = userData.name;
    const enteredAddress = {
        street: userData.street,
        postalCode: userData.postal,
        city: userData.city
    }
    if (!validation.userDataValid(enteredEmail, enteredPassword, enteredName, enteredAddress.street, enteredAddress.postalCode, enteredAddress.city)) {
        validationSession.flashErrorsToSession(req, 
            {
            message: "비어있는 입력란이 있습니다.",
            email: enteredEmail,
            confirmEmail: enteredConfirmEmail,
            password: enteredPassword,
            name: enteredName,
            address: enteredAddress,
        }, function() {
            res.redirect('/signup');
        })
        return;
    }

    const user = new User(enteredEmail, enteredPassword, false, enteredName, enteredAddress);
    let existingUser;
    try {
        existingUser = await user.existAlready();
    } catch(error) {
        next(error);
        return;
    }

    if (existingUser) {
        validationSession.flashErrorsToSession(req, 
            {
            message: "이메일이 이미 존재합니다.",
            email: enteredEmail,
            confirmEmail: enteredConfirmEmail,
            password: enteredPassword,
            name: enteredName,
            address: enteredAddress,
        }, function() {
            res.redirect('/signup');
        })
        return;
    }

    if ( !validation.emailIsEqual(enteredEmail, enteredConfirmEmail)) {
        validationSession.flashErrorsToSession(req, {
            message: "입력하신 이메일이 다릅니다.",
            email: enteredEmail,
            confirmEmail: enteredConfirmEmail,
            password: enteredPassword,
            name: enteredName,
            address: enteredAddress,
        },function() {
            res.redirect('/signup');
        })
        return;
    } 

    try {
        await user.createUser();
    } catch(error) {
        next(error);
        return;
    }

    res.redirect('/login');
}

async function login (req, res, next) {
    const userData = req.body;
    const enteredEmail = userData.email;
    const enteredPassword = userData.password;

    const user = new User(enteredEmail, enteredPassword, null, null, null);
    let existingUser;
    try {
        existingUser = await user.getUserWithSameEmail();
    } catch(error) {
        next(error);
        return;
    }

    if (!existingUser) {
        validationSession.flashErrorsToSession(req, {
            message: "이메일 또는 비밀번호가 올바르지 않습니다.",
            email: enteredEmail,
            password: enteredPassword
        },
        function() {
            res.redirect('/login');
        })
        return;
    }

    const checkPassword = await user.passwordIsEqual();
    if (!checkPassword) {
        validationSession.flashErrorsToSession(req, {
            message: "이메일 또는 비밀번호가 올바르지 않습니다.",
            email: enteredEmail,
            password: enteredPassword
        },
        function() {
            res.redirect('/login');
        })
        return;
    }
    
    req.session.user = {id: existingUser._id, isAdmin: existingUser.isAdmin};
    req.session.save(function() {
        res.redirect('/');
    })
}

function logout (req, res) {
    req.session.user = null;

    res.redirect('/');
}

module.exports = {
    getSignup: getSignup,
    getLogin: getLogin,
    logout: logout,
    signup: signup,
    login: login,
}