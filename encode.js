module.exports = function encode_alt(input) {
  if (input.length === 0) return []
  const output = []
  let input_index = 0
  let offset_index = 0
  let copy_index = 1
  let offset = 1
  function write_offset() {
    output[offset_index] = offset
    offset = 1
    offset_index = copy_index
    copy_index += 1
  }
  while (input_index < input.length) {
    const byte = input[input_index]
    input_index += 1
    if (byte === 0b00) {
      write_offset()
    } else {
      output[copy_index] = byte
      copy_index += 1
      offset += 1
      if (offset >= 0b11 && input_index < input.length) {
        write_offset()
      }
    }
  }
  output[offset_index] = offset
  return output
}
