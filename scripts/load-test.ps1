for ($i = 1; $i -le 200; $i++) {

  $body = @{
    meterId = "MTR_$i"
    kwhConsumedAc = 5.2
    voltage = 220
    timestamp = "2026-02-10T10:00:00Z"
  } | ConvertTo-Json

  Invoke-RestMethod `
    -Method Post `
    -Uri "http://localhost:3000/ingest/meter" `
    -ContentType "application/json" `
    -Body $body
}
