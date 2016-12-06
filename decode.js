module.exports = function decode(input) {
  if (input.length === 0) return []

  const output = []
  let input_index = 0

  while (true) {
    let offset = input[input_index]
    let copy_end = input_index + offset
    if (copy_end > input.length) throw new Error(`Decoding error: offset at input index ${input_index} exceeds input.`)
    input_index += 1
    while (input_index < copy_end) {
      const byte = input[input_index]
      input_index += 1
      if (byte === 0b00) throw new Error(`Decoding error: found a zero at index ${input_index} while there shouldn't be.`)
      output.push(byte)
    }
    if (input_index === input.length) {
      break
    }
    if (offset !== 0b11) output.push(0b00)
  }

  return output
}
