var bytes = require('bytes')
var onFinished = require('on-finished')
var ms = require('ms')

module.exports = function debugWare (debug) {
  return function (req, res, next) {
    var start = Date.now()
    var reqSize = req.headers['content-length'] | 0
    if (reqSize) reqSize = bytes(reqSize)

    function log (err) {
      if (err) return debug(`${req.method} ${req.url}`, err)

      var end = Date.now()
      var status = res.statusCode
      var resSize = bytes(parseInt(res.getHeader('content-length'), 10) | 0)
      var taken = ms(end - start)

      // from https://github.com/expressjs/morgan/blob/572dd937f26d486babc709228c98fd15dd807408/index.js#L189
      var color = status >= 500 ? 31 // red
        : status >= 400 ? 33 // yellow
          : status >= 300 ? 36 // cyan
            : status >= 200 ? 32 // green
              : 0 // no color

      debug(`${req.method} ${req.originalUrl} \x1b[${color}m${status} ${res.statusMessage}\x1b[0m ${taken} ${reqSize}->${resSize}`)
    }

    onFinished(res, log)
    next()
  }
}
