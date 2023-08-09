function getSessionErrorData (req, dataDefault) {
    let sessionInputData = req.session.inputData;
  
    if (!sessionInputData) {
      sessionInputData = {
        hasError: false,
        ...dataDefault
      };
    }
  
    req.session.inputData = null;

    return sessionInputData;
}

function flashErrorsToSession (req, data, action) {
    req.session.inputData = {
        hasError: true,
        ...data
    };
    
    req.session.save(action);
}

module.exports = {
    getSessionErrorData: getSessionErrorData,
    flashErrorsToSession: flashErrorsToSession,
}