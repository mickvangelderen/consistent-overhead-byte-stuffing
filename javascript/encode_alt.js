module.exports = function encode_alt(input) {
  if (input.length === 0) return []

  let input_index = 0
  const output = []

  while (true) {
    // Read the input, starting at input_index until we find a zero, have read
    // the maximum zero offset we can represent or hit the end of the input.
    let scan_index = input_index
    let scan_end = Math.min(input_index + 0b11 - 1, input.length)
    while (scan_index < scan_end && input[scan_index] !== 0b00) {
      scan_index += 1
    }

    // Write the offset and copy the non-zero input to the output.
    const offset = 1 + scan_index - input_index
    output.push(offset)
    while (input_index < scan_index) {
      output.push(input[input_index])
      input_index += 1
    }

    // If we hit the end of the input we can stop. The frame marker is not
    // appended to the output explicitly. 
    if (input_index === input.length) {
      break
    }

    // If we did not hit the end of the input or use up the maximum offset, we
    // know there is a zero at input_index and we skip over it.
    if (offset !== 0b11) input_index += 1
  }

  return output
}
