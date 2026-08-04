$files = Get-ChildItem -Path "C:\Users\habee\.gemini\antigravity-ide\scratch\windows-h-website-folder\src" -Recurse -Filter "*.tsx"
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw
    $content = $content -replace 'orange-400','amber-400'
    $content = $content -replace 'orange-500','amber-500'
    $content = $content -replace 'orange-600','amber-600'
    Set-Content $f.FullName -Value $content -NoNewline
    Write-Host "Updated: $($f.Name)"
}
