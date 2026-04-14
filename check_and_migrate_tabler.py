import os
import shutil
import json
import hashlib

def get_hash(path):
    h = hashlib.sha256()
    with open(path, 'rb') as f:
        while chunk := f.read(8192):
            h.update(chunk)
    return h.hexdigest()

def main():
    svg_dir = r"/path/to/svg"
    tabler_dir1 = r"/path/to/tabler"
    tabler_dir2 = r"/path/to/tabler2"
    target_tabler_dir = os.path.join(svg_dir, "tabler")
    
    meta_json = os.path.join(svg_dir, "icons.metadata.json")
    inv_json = os.path.join(svg_dir, "inventory.json")

    # 1. Load existing hashes/names from the main svg directory to check for overlaps
    print("Loading existing SVG hashes and names...")
    existing_hashes = set()
    existing_names = set()
    
    if os.path.exists(meta_json):
        with open(meta_json, 'r', encoding='utf-8') as f:
            meta_data = json.load(f)
            for m in meta_data:
                existing_names.add(m.get('name'))
                if m.get('hash'):
                    existing_hashes.add(m.get('hash'))
    
    # 2. Scan Tabler 1 and Tabler 2
    def scan_dir(directory):
        files_list = []
        if os.path.exists(directory):
            for root, dirs, files in os.walk(directory):
                for file in files:
                    if file.endswith('.svg'):
                        files_list.append(os.path.join(root, file))
        return files_list

    t1_files = scan_dir(tabler_dir1)
    t2_files = scan_dir(tabler_dir2)
    
    print(f"Found {len(t1_files)} in tabler1 and {len(t2_files)} in tabler2.")

    # 3. Check overlaps
    def check_overlaps(file_list, source_name):
        overlaps = 0
        valid_files = []
        for path in file_list:
            name = os.path.basename(path).replace('.svg', '')
            file_hash = get_hash(path)
            if name in existing_names or file_hash in existing_hashes:
                overlaps += 1
            else:
                valid_files.append((path, name, file_hash))
        return valid_files, overlaps

    print("Checking for overlaps with existing SVGs...")
    valid_t1, overlaps_t1 = check_overlaps(t1_files, "tabler1")
    valid_t2, overlaps_t2 = check_overlaps(t2_files, "tabler2")
    
    print(f"Overlaps in tabler1 with main SVG dir: {overlaps_t1}")
    print(f"Overlaps in tabler2 with main SVG dir: {overlaps_t2}")

    # Check overlaps between T1 and T2
    t1_names = set([v[1] for v in valid_t1])
    cross_overlaps = [v for v in valid_t2 if v[1] in t1_names]
    print(f"Cross-overlaps between tabler1 and tabler2: {len(cross_overlaps)}")

    valid_t2 = [v for v in valid_t2 if v[1] not in t1_names]

    all_valid_tabler = valid_t1 + valid_t2
    print(f"Total unique tabler icons to add: {len(all_valid_tabler)}")

    if len(all_valid_tabler) == 0:
        print("Nothing to add.")
        return

    # 4. Copy and update JSON
    os.makedirs(target_tabler_dir, exist_ok=True)
    
    new_meta = []
    new_inv = []
    
    with open(inv_json, 'r', encoding='utf-8') as f:
        inv_data = json.load(f)

    print("Copying files and building metadata...")
    for path, name, file_hash in all_valid_tabler:
        size = os.path.getsize(path)
        dest_path = os.path.join(target_tabler_dir, os.path.basename(path))
        shutil.copy2(path, dest_path)
        
        # Build meta
        entry = {
            "name": f"tabler-{name}",
            "original_path": path,
            "new_path": dest_path,
            "size": size,
            "hash": file_hash,
            "tags": [name, "tabler", "combined"],
            "classification": "keep",
            "duplicate_of": None
        }
        meta_data.append(entry)
        
        inv_entry = {
            "path": dest_path,
            "type": "svg",
            "classification": "keep",
            "hash": file_hash,
            "size": size
        }
        inv_data.append(inv_entry)

    print("Saving updated JSON files...")
    with open(meta_json, 'w', encoding='utf-8') as f:
        json.dump(meta_data, f, indent=2)
        
    with open(inv_json, 'w', encoding='utf-8') as f:
        json.dump(inv_data, f, indent=2)
        
    print("Done! Tabler icons successfully migrated and logged.")

if __name__ == "__main__":
    main()
