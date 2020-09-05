

/**
 * Success
 * @param {*} data 
 */
const success = function (data) {
    data = data || {}
    return { code: 200, data: data }
}


/**
 * Error
 * @param {*} code 
 * @param {*} data 
 */
const error = function (code, data) {
    code = code || 500;
    if (!code && !data) {
        return { code: code, message: 'Internal Server Error' }
    }
    return { code: code, data: data ? data : {} }
}
 


/**
 * EXPORT MODULE
 */


module.exports = {
    success,
    /**
    * @default Response Server Error (500)
    */
    error
}

