const User = require("../models/user");
const validationSession = require("../util/validation-session");
const validation = require("../util/validation");

function get401(req, res) {
  res.status(401).render('401');
}

function getSignup(req, res) {
  const sessionErrorData = validationSession.getSessionErrorData(req, {
    email: "",
    confirmEmail: "",
    password: "",
  });

  res.render("signup", {
    inputData: sessionErrorData,
  });
}

function getLogin(req, res) {
  const sessionErrorData = validationSession.getSessionErrorData(req, {
    email: "",
    password: "",
  });

  res.render("login", {
    inputData: sessionErrorData,
  });
}

async function signup(req, res) {
  const userData = req.body;
  const enteredEmail = userData.email; // userData['email']
  const enteredConfirmEmail = userData["confirm-email"];
  const enteredPassword = userData.password;

  const newUser = new User(userData.email, userData.password);
  const userIsValid = validation.userIsValid(enteredEmail, enteredConfirmEmail, enteredPassword);

  if (!userIsValid) {
    req.session.inputData = validationSession.flashErrorsToSession(
      req,
      {
        message: "Invalid input - please check your data.",
        email: enteredEmail,
        confirmEmail: enteredConfirmEmail,
        password: enteredPassword,
      },
      function () {
        res.redirect("/signup");
      }
    );
    return;
  }

  const existingUser = await newUser.existsAlready();

  if (existingUser) {
    req.session.inputData = validationSession.flashErrorsToSession(
      req,
      {
        message: "User exists already!",
        email: enteredEmail,
        confirmEmail: enteredConfirmEmail,
        password: enteredPassword,
      },
      function () {
        res.redirect("/signup");
      }
    );

    return;
  }

  const result = await newUser.signup();

  res.redirect("/login");
}

async function login(req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredPassword = userData.password;

  const newUser = new User(userData.email, userData.password);
  const existingUser = await newUser.getUserWithSameEmail();

  if (!existingUser) {
    req.session.inputData = validationSession.flashErrorsToSession(
      req,
      {
        message: "Could not log you in - please check your credentials!",
        email: enteredEmail,
        password: enteredPassword,
      },
      function () {
        res.redirect("/login");
      }
    );
    return;
  }

  const passwordsAreEqual = await newUser.login();

  if (!passwordsAreEqual) {
    req.session.inputData = validationSession.flashErrorsToSession(req, {
      message: "Could not log you in - please check your credentials!",
      email: enteredEmail,
      password: enteredPassword,
      function() {
        res.redirect("/login");
      },
    });
    return;
  }

  req.session.user = { id: existingUser._id, email: existingUser.email };
  req.session.isAuthenticated = true;
  req.session.save(function () {
    res.redirect("/admin");
  });
}

function logout(req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect("/");
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout,
  get401: get401
};
