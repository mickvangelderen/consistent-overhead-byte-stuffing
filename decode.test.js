const assert = require('assert')
const inspect = require('util').inspect

module.exports = function test_decode(decode) {
  function pass(input, output) {
    const actual_output = decode(input)
    assert.deepEqual(output, actual_output, `Expected ${inspect(input)} to decode to ${inspect(output)} but got ${inspect(actual_output)}.`)
  }

  function fail(input, output, error) {
    assert.throws(() => assert.deepEqual(decode(input), output), error)
  }

  for (let x = 0b01; x <= 0b11; x++) {
    pass([], [])
    pass([ 1, 1 ], [ 0 ])
    pass([ 2, x ], [ x ])
    pass([ 1, 1, 1 ], [ 0, 0 ])
    pass([ 1, 2, x ], [ 0, x ])
    pass([ 2, x, 1 ], [ x, 0 ])
    pass([ 3, x, x ], [ x, x ])
    pass([ 1, 1, 1, 1 ], [ 0, 0, 0 ])
    pass([ 1, 1, 2, x ], [ 0, 0, x ])
    pass([ 1, 2, x, 1 ], [ 0, x, 0 ])
    pass([ 1, 3, x, x ], [ 0, x, x ])
    pass([ 2, x, 1, 1 ], [ x, 0, 0 ])
    pass([ 2, x, 2, x ], [ x, 0, x ])
    pass([ 3, x, x, 1, 1 ], [ x, x, 0 ])
    pass([ 3, x, x, 2, x ], [ x, x, x ])
  }
}
