var bytes = require('bytes')
var onFinished = require('on-finished')
var ms = require('ms')

module.exports = function debugWare (debug) {
  return function (req, res, next) {
    var start = Date.now()

    function log (err) {
      if (err) return debug(`${req.method} ${req.url}`, err)

      var end = Date.now()
      var status = res.statusCode
      var size = bytes(parseInt(res.getHeader('content-length'), 10))
      var taken = ms(end - start)
      var color = status >= 500 ? 31 // red
        : status >= 400 ? 33 // yellow
        : status >= 300 ? 36 // cyan
        : status >= 200 ? 32 // green
        : 0 // no color

      debug(`${req.method} ${req.originalUrl} \x1b[${color}m${status} ${res.statusMessage}\x1b[0m ${taken} ${size}`)
    }

    onFinished(res, log)
    next()
  }
}
