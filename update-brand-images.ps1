$filePath = "C:\Users\habee\.gemini\antigravity-ide\scratch\windows-h-website-folder\src\data\seedData.ts"
$content = Get-Content $filePath -Raw

# Replace JSW image
$content = [regex]::Replace($content, "(?s)(brand:\s*'JSW Cement'.*?image:\s*').*?(')", "`${1}/jsw_cement.png`$2")

# Replace ACC image
$content = [regex]::Replace($content, "(?s)(brand:\s*'ACC Cement'.*?image:\s*').*?(')", "`${1}/acc_cement.png`$2")

# Replace Dalmia image
$content = [regex]::Replace($content, "(?s)(brand:\s*'Dalmia Cement'.*?image:\s*').*?(')", "`${1}/dalmia_cement.png`$2")

Set-Content -Path $filePath -Value $content
