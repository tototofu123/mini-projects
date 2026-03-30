# Time-Based Encryption Tool

A Python encryption tool that generates unique keys based on the current timestamp.

## How It Works

1. **Time-Based Key Generation**: The key is generated from current time (YYYYMMDDHHMMSS format) and hashed with SHA256 to create a 32-byte key
2. **XOR Encryption**: Uses XOR cipher to encrypt/decrypt messages
3. **Base64 Encoding**: Encodes the result for safe display/storage

## Tech Stack

- **Language**: Python 3
- **Modules**:
  - `hashlib` - SHA256 cryptographic hashing
  - `base64` - ASCII encoding for encrypted data
  - `datetime` - Time manipulation

## Project Structure

```
time_encrypt/
├── time_encrypt.py    # Main program
└── README.md          # This file
```

## Installation

```bash
git clone <repo-url>
cd time_encrypt
```

## Usage

Run the program:
```bash
python time_encrypt.py
```

### Mode 1: Encrypt
1. Select option `1`
2. Enter your message
3. Copy the **encrypted message** and **key** (both needed for decryption)

### Mode 2: Decrypt
1. Select option `2`
2. Enter the encrypted message
3. Enter the key (on a new line)
4. View the decrypted message

## Code Explanation

### `get_time_key()`
- Gets current timestamp formatted as YYYYMMDDHHMMSS
- Hashes it with SHA256 to create a 32-byte key
- Returns bytes

### `xor_encrypt(text, key)`
- XORs each character with key bytes
- Base64 encodes the result
- Returns encrypted string

### `xor_decrypt(encrypted_text, key)`
- Decodes base64 to bytes
- XORs with key again (reverses encryption)
- Returns decrypted string

### `main()`
- Shows menu (1=encrypt, 2=decrypt)
- Handles user input and output

## Security Note

This is for educational purposes. The XOR cipher is not cryptographically secure for production use. The time-based key means anyone who knows the approximate encryption time can brute-force the key.

## License

MIT
