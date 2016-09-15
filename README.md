# debug-ware
small debugging middleware

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
