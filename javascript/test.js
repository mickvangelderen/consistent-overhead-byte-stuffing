const cobs = require('./')

require('./decode.test')(cobs.decode)
require('./encode_alt.test')(cobs.encode_alt)
require('./encode.test')(cobs.encode)

console.log('Success.')
