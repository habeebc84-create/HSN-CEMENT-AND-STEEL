$files = Get-ChildItem -Path "C:\Users\habee\.gemini\antigravity-ide\scratch\windows-h-website-folder\src" -Recurse -Filter "*.tsx"
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw
    
    # Primary accent (amber -> cyan)
    $content = $content -replace 'amber-400','cyan-400'
    $content = $content -replace 'amber-500','cyan-500'
    $content = $content -replace 'amber-600','cyan-600'
    
    # Secondary accent (emerald -> orange)
    $content = $content -replace 'emerald-400','orange-400'
    $content = $content -replace 'emerald-500','orange-500'
    $content = $content -replace 'emerald-600','orange-600'

    Set-Content $f.FullName -Value $content -NoNewline
    Write-Host "Updated neon colors in: $($f.Name)"
}
