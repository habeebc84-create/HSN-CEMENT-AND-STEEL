$files = Get-ChildItem -Path "src" -Recurse -Include *.tsx, *.ts, *.css

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName
    
    # Backgrounds
    $content = $content -replace 'bg-slate-950', 'bg-slate-50'
    $content = $content -replace 'bg-slate-900', 'bg-white'
    $content = $content -replace 'bg-slate-800', 'bg-slate-100'
    $content = $content -replace 'bg-slate-700', 'bg-slate-200'
    
    # Text colors
    $content = $content -replace 'text-slate-100', 'text-slate-900'
    $content = $content -replace 'text-slate-200', 'text-slate-800'
    $content = $content -replace 'text-slate-300', 'text-slate-700'
    $content = $content -replace 'text-slate-400', 'text-slate-600'
    $content = $content -replace 'text-slate-500', 'text-slate-500' # No change needed, but left for completeness
    
    # Borders
    $content = $content -replace 'border-slate-800', 'border-slate-200'
    $content = $content -replace 'border-slate-700', 'border-slate-300'
    
    # For white text that might be used as primary text, replace with slate-950
    # But be careful with buttons that use text-white (e.g. orange buttons). 
    # To be safe, we will replace text-white only if it's not inside a primary button... 
    # Actually, it's safer to leave text-white alone as it's often used inside colored buttons and badges. 
    # If the user specifically said "white background", replacing slate-950 is the main thing.

    Set-Content -Path $file.FullName -Value $content
}
