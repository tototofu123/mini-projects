$dir1 = '/path/to/3d webdev/all svg'
$dir2 = '/path/to/massive_icons_temp/optimized'

$files1 = Get-ChildItem -Path $dir1 -Recurse -Filter '*.svg'
$files2 = Get-ChildItem -Path $dir2 -Recurse -Filter '*.svg'

Write-Host "Total in 'all svg': $($files1.Count)"
Write-Host "Total in 'optimized': $($files2.Count)"

# Group by name to handle potential duplicates within the directories themselves, 
# but for simplicity we'll just take the first file encountered with that name.
$dict1 = @{}
foreach ($f in $files1) {
    if (-not $dict1.ContainsKey($f.Name)) {
        $dict1[$f.Name] = $f.FullName
    }
}

$dict2 = @{}
foreach ($f in $files2) {
    if (-not $dict2.ContainsKey($f.Name)) {
        $dict2[$f.Name] = $f.FullName
    }
}

$overlapNames = $dict1.Keys | Where-Object { $dict2.ContainsKey($_) }
$overlapCount = @($overlapNames).Count

Write-Host "Overlapping names: $overlapCount"

$identicalCount = 0
$differentCount = 0

foreach ($name in $overlapNames) {
    $path1 = $dict1[$name]
    $path2 = $dict2[$name]
    
    $hash1 = (Get-FileHash $path1 -Algorithm MD5).Hash
    $hash2 = (Get-FileHash $path2 -Algorithm MD5).Hash
    
    if ($hash1 -eq $hash2) {
        $identicalCount++
    } else {
        $differentCount++
    }
}

Write-Host "Identical content: $identicalCount"
Write-Host "Different content: $differentCount"

$uniqueToAllSvg = $dict1.Count - $overlapCount
Write-Host "Unique names in 'all svg' not in 'optimized': $uniqueToAllSvg"
