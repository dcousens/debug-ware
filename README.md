# debug-ware
A small debugging middleware for development purposes akin to `expressjs/morgan` but directly using a provided `debug` instance for logging.

## Example

``` js
let debug = require('debug')('app')
let debugWare = require('debug-ware')
let express = require('express')
let app = express()

// ...

// debug logging
app.use(debugWare(debug))
```

## LICENSE [MIT](LICENSE)
Credit to [expressjs/morgan](https://github.com/expressjs/morgan/) for their middleware inspiration and the status code colouring.
