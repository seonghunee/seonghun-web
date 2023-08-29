function isEmpty(value) {
  return !value || value.trim() === "";
}

function userDataValid(email, password, name, street, postal, city) {
  return (
    email &&
    email.includes("@") &&
    password &&
    password.trim().length >= 6 &&
    !isEmpty(name) &&
    !isEmpty(street) &&
    !isEmpty(postal) &&
    !isEmpty(city)
  );
}

function emailIsEqual(email, confirmEmail) {
    return (email === confirmEmail);
}

module.exports = {
    userDataValid: userDataValid,
    emailIsEqual: emailIsEqual,
}