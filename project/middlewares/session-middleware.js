function sessionIsAuth(req, res, next) {
    const user = req.session.user;

    if (!user) {
        return next();
    }
    
    res.locals.user = user;
    res.locals.isAuth = true;
    res.locals.isAdmin = user.isAdmin;

    next();
}

module.exports = sessionIsAuth;