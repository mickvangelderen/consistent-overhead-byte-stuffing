use std::io::Write;

fn encode<W: Write>(input: &[u8], output: W) {
    for byte in input {
        output.write(byte);
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        assert_eq!(4, add_two(2));
    }
}
