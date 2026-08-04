$filePath = "C:\Users\habee\.gemini\antigravity-ide\scratch\windows-h-website-folder\src\data\seedData.ts"
$content = Get-Content $filePath -Raw

# Replace cement images
$content = [regex]::Replace($content, "(?s)(name:\s*'.*?Cement.*?'.*?image:\s*').*?(')", "`${1}/cement_banner_new.png`$2")

# Replace steel images
$content = [regex]::Replace($content, "(?s)(name:\s*'.*?(?:Tiscon|Steel|Rebar).*?'.*?image:\s*').*?(')", "`${1}/steel_banner_new.png`$2")

Set-Content -Path $filePath -Value $content
