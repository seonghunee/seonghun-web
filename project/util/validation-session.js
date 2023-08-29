function getSessionErrorData(req, dataDefault) {
    let inputData = req.session.inputData;

    if(!inputData) {
        inputData = {
            hasError: false,
            ...dataDefault,
        }
    }

    req.session.inputData = null;

    return inputData;
}

function flashErrorsToSession(req, data, action) {
    req.session.inputData = {
        hasError: true,
        ...data,
    }

    req.session.save(action);

}

module.exports = {
    getSessionErrorData: getSessionErrorData,
    flashErrorsToSession: flashErrorsToSession,
}