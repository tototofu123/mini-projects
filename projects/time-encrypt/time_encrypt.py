import hashlib
import base64
import os
from datetime import datetime


def get_time_key():
    now = datetime.now()
    time_str = now.strftime("%Y%m%d%H%M%S")
    key = hashlib.sha256(time_str.encode()).digest()
    return key


def xor_encrypt(text, key):
    encrypted = bytearray()
    for i, char in enumerate(text.encode()):
        encrypted.append(char ^ key[i % len(key)])
    return base64.b64encode(bytes(encrypted)).decode()


def xor_decrypt(encrypted_text, key):
    encrypted_bytes = base64.b64decode(encrypted_text.encode())
    decrypted = bytearray()
    for i, char in enumerate(encrypted_bytes):
        decrypted.append(char ^ key[i % len(key)])
    return bytes(decrypted).decode()


def main():
    print("=== Time-Based Encryption Tool ===")
    print("1. Encrypt a message")
    print("2. Decrypt a message")
    choice = input("Select mode (1/2): ").strip()

    if choice == "1":
        message = input("Enter message to encrypt: ")
        key = get_time_key()
        encrypted = xor_encrypt(message, key)
        key_str = base64.b64encode(key).decode()
        print(f"\n--- Encrypted Message ---")
        print(encrypted)
        print(f"\n--- Key (use this to decrypt) ---")
        print(key_str)

    elif choice == "2":
        encrypted_msg = input("Enter encrypted message: ").strip()
        key_str = input("Enter the key: ").strip()
        try:
            key = base64.b64decode(key_str.encode())
            decrypted = xor_decrypt(encrypted_msg, key)
            print(f"\n--- Decrypted Message ---")
            print(decrypted)
        except Exception as e:
            print(f"Error: Invalid key or encrypted message")

    else:
        print("Invalid choice")


if __name__ == "__main__":
    main()
