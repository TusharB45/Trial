$adapterName = "MediaTek Wi-Fi 6 MT7921 Wireless LAN Card"
$target = "8.8.8.8"

Write-Host "Monitoring Wi-Fi stability..."

while ($true) {
    $ping = Test-Connection -ComputerName $target -Count 3 -Quiet -ErrorAction SilentlyContinue

    if (-not $ping) {
        Write-Host "Connection unstable. Resetting adapter..." -ForegroundColor Red
        Disable-NetAdapter -Name $adapterName -Confirm:$false
        Start-Sleep -Seconds 5
        Enable-NetAdapter -Name $adapterName -Confirm:$false
        Start-Sleep -Seconds 20
    }

    Start-Sleep -Seconds 10
}
