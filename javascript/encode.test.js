const assert = require('assert')
const inspect = require('util').inspect

module.exports = function test_encode(encode) {
  function pass(input, output) {
    const actual_output = encode(input)
    assert.deepEqual(output, actual_output, `Expected ${inspect(input)} to encode to ${inspect(output)} but got ${inspect(actual_output)}.`)
  }

  function fail(input, output, error) {
    assert.throws(() => assert.deepEqual(encode(input), output), error)
  }

  for (let x = 0b01; x <= 0b11; x++) {
    pass([], [])
    pass([ 0 ], [ 1, 1 ])
    pass([ x ], [ 2, x ])
    pass([ 0, 0 ], [ 1, 1, 1 ])
    pass([ 0, x ], [ 1, 2, x ])
    pass([ x, 0 ], [ 2, x, 1 ])
    pass([ x, x ], [ 3, x, x ])
    pass([ 0, 0, 0 ], [ 1, 1, 1, 1 ])
    pass([ 0, 0, x ], [ 1, 1, 2, x ])
    pass([ 0, x, 0 ], [ 1, 2, x, 1 ])
    pass([ 0, x, x ], [ 1, 3, x, x ])
    pass([ x, 0, 0 ], [ 2, x, 1, 1 ])
    pass([ x, 0, x ], [ 2, x, 2, x ])
    pass([ x, x, 0 ], [ 3, x, x, 1, 1 ])
    pass([ x, x, x ], [ 3, x, x, 2, x ])
  }
}
