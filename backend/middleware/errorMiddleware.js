const errorHandler = (err, req, res, next) => {

    // if there is a status code then is will be used if not then the 500 is the catch all. 
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    res.json({
        message: err.message,

        // so then we can see the stack when in development
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {errorHandler}