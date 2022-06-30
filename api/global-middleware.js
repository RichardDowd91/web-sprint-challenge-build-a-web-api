function logger(req, res, next) {
    const log = {
      Time: new Date(),
      Method: req.method,
      Endpoint: req.url,
      Body: req.body
    }
    console.log(log)
    next()
  }
  
  function errorHandler(err, req, res, next) {
    res.status(err.status || 500).json({
      message: err.message || 'Error retrieving data. Please try again and sorry!'
    })
  }
  
  module.exports = { logger, errorHandler }