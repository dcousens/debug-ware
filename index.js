var onFinished = require('on-finished')

module.exports = function debugWare (debug) {
  return function (req, res, next) {
    function log (err) {
      if (err) return debug(`${req.method} ${req.url}`, err)

      debug(`${req.method} ${req.url}`, res.header && res.statusCode, res.body && res.body.length || 0)
    }

    onFinished(res, log)
    next()
  }
}
