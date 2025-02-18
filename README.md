# zero-width-steganography

Example:
```shell
node encode.js -e=test/embed.png -c=test/cover.txt -o=test/output.txt
```

## Setup
Install NodeJS

https://github.com/nodesource/distributions

## Usage

### Encoding
To hide a file within text:
```bash
node encode.js -e path/to/file/to/hide -c path/to/cover/text -o output.txt
```

- `-e`: Path to the file you want to embed
- `-c`: Path to a text file that will act as the cover
- `-o`: Where to save the resulting steg file

### Decoding
To extract a hidden file:
```bash
node decode.js -s path/to/steg/file -o extracted_file
```

- `-s`: Path to the steg text file
- `-o`: Where to save the extracted embedded file

## Example

```bash
# Hide an image in text
node encode.js -e secret.png -c cover.txt -o hidden.txt

# Extract the hidden image
node decode.js -s hidden.txt -o extracted.png
```

## How it Works

The tool converts the binary of the files to base-4 numbers and represents them using invisible zero-width characters, which are then inserted at index 2 of the cover text. 
This makes the hidden data invisible when viewing or printing the text, while preserving the ability to extract the original file.

The encoded data starts with the following start flag:
>\u200B\u200F

And ends with the following end flag:
>\u200B\u200E

### Mappings
- `00`: U+200C (Zero Width Non-Joiner)
- `01`: U+200D (Zero Width Joiner)
- `10`: U+200E (LTR Mark)
- `11`: U+200F (RTL Mark)

