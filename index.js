var bytes = require('bytes')
var onFinished = require('on-finished')

module.exports = function debugWare (debug) {
  return function (req, res, next) {
    function log (err) {
      if (err) return debug(`${req.method} ${req.url}`, err)

      var status = res.statusCode
      var size = bytes(res.body && res.body.length || 0)
      var color = status >= 500 ? 31 // red
        : status >= 400 ? 33 // yellow
        : status >= 300 ? 36 // cyan
        : status >= 200 ? 32 // green
        : 0 // no color

      debug(`${req.method} ${req.url} \x1b[${color}m${status} \x1b[0m${size}`)
    }

    onFinished(res, log)
    next()
  }
}
