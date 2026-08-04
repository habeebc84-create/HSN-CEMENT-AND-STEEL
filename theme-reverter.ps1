$files = Get-ChildItem -Path "src" -Recurse -Include *.tsx, *.ts, *.css

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName
    
    # Backgrounds
    $content = $content -replace 'bg-slate-50', 'bg-slate-950'
    $content = $content -replace 'bg-white', 'bg-slate-900'
    $content = $content -replace 'bg-slate-100', 'bg-slate-800'
    $content = $content -replace 'bg-slate-200', 'bg-slate-700'
    
    # Text colors
    $content = $content -replace 'text-slate-900', 'text-slate-100'
    $content = $content -replace 'text-slate-800', 'text-slate-200'
    $content = $content -replace 'text-slate-700', 'text-slate-300'
    $content = $content -replace 'text-slate-600', 'text-slate-400'
    
    # Borders
    $content = $content -replace 'border-slate-200', 'border-slate-800'
    $content = $content -replace 'border-slate-300', 'border-slate-700'

    Set-Content -Path $file.FullName -Value $content
}
