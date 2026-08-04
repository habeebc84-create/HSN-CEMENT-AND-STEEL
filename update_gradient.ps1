$files = Get-ChildItem -Path "C:\Users\habee\.gemini\antigravity-ide\scratch\windows-h-website-folder\src" -Recurse -Filter "*.tsx"
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw
    if ($content -match "gold-gradient-text") {
        $content = $content -replace "gold-gradient-text", "text-gradient theme-lovable text-gradient-animated"
        Set-Content -Path $f.FullName -Value $content -NoNewline
    }
}
