async function guardLoute(req, res, next) {
    if (!res.locals.isAuth) {
        return res.status(401).render('401');
    }
    next();
}

async function adminLoute(req, res, next) {
    if (!res.locals.isAuth || !res.locals.isAdmin) {
        return res.status(401).render('401');
    }
    next();
}

module.exports ={ 
    guardLoute: guardLoute,
    adminLoute: adminLoute,
}
