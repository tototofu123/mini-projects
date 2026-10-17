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
    source_dir = r"/path/to/massive_icons_temp/optimized"
    target_dir = r"/path/to/new/svg_folder"
    meta_json = r"/path/to/massive_icons_temp/metadata/icons.metadata.json"
    inv_json = r"/path/to/massive_icons_temp/metadata/inventory.json"
    
    os.makedirs(target_dir, exist_ok=True)
    
    print("Moving files to target directory...")
    # Move all contents from optimized to svg
    if os.path.exists(source_dir):
        for item in os.listdir(source_dir):
            s = os.path.join(source_dir, item)
            d = os.path.join(target_dir, item)
            if not os.path.exists(d):
                shutil.move(s, target_dir)
    
    print("Reading existing metadata...")
    with open(meta_json, 'r', encoding='utf-8') as f:
        meta_data = json.load(f)
    with open(inv_json, 'r', encoding='utf-8') as f:
        inv_data = json.load(f)
        
    meta_by_name = {m['name']: m for m in meta_data}
    inv_by_name = {}
    for i in inv_data:
        # Inventory path ends with the filename
        name = os.path.basename(i['path']).replace('.svg', '')
        # Original json has names without .svg and sometimes different path base, let's map by mostly basename
        inv_by_name[name] = i
        
    print("Scanning new target directory...")
    all_svgs = []
    for root, dirs, files in os.walk(target_dir):
        for file in files:
            if file.endswith('.svg'):
                all_svgs.append(os.path.join(root, file))
                
    new_meta = []
    new_inv = []
    
    print(f"Processing {len(all_svgs)} SVGs...")
    for idx, path in enumerate(all_svgs):
        if idx % 1000 == 0:
            print(f"Processed {idx} / {len(all_svgs)}")
            
        name = os.path.basename(path).replace('.svg', '')
        size = os.path.getsize(path)
        
        # We only compute hash if it's a new file to save time, or we just compute it. Let's compute it.
        file_hash = get_hash(path)
        
        # Meta info update
        if name in meta_by_name:
            entry = meta_by_name[name].copy()
            entry['new_path'] = path
            entry['size'] = size
            entry['hash'] = file_hash
        else:
            entry = {
                "name": name,
                "original_path": path,
                "new_path": path,
                "size": size,
                "hash": file_hash,
                "tags": [name, "combined"],
                "classification": "keep",
                "duplicate_of": None
            }
        new_meta.append(entry)
        
        # Inventory update
        # Because names in inventory don't always map easily, we just build a fresh entry based on the data
        inv_entry = {
            "path": path,
            "type": "svg",
            "classification": entry.get("classification", "keep"),
            "hash": file_hash,
            "size": size
        }
        new_inv.append(inv_entry)
        
    print("Saving updated JSON files...")
    with open(os.path.join(target_dir, "icons.metadata.json"), 'w', encoding='utf-8') as f:
        json.dump(new_meta, f, indent=2)
        
    with open(os.path.join(target_dir, "inventory.json"), 'w', encoding='utf-8') as f:
        json.dump(new_inv, f, indent=2)
        
    print("Done!")

if __name__ == "__main__":
    main()
