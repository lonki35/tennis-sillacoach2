# Tennis SillaCoach — Actualización
1. Extrae el ZIP y abre el repositorio existente de GitHub.
2. En Code → Add file → Upload files, sube index.html, score.js, sw.js, manifest.webmanifest, icon-192.png e icon-512.png a la carpeta que ya publica Pages. Pulsa Commit changes.
3. En Actions, espera a que termine la publicación. En Android abre el enlace de siempre con Chrome y conexión. Si ves la versión anterior, recarga y vuelve a abrir la app instalada.
4. Comprueba las pestañas Partido e Historial. Conserva los datos de Chrome para migrar los registros previos. Luego prueba abrir desde el icono en modo avión.
Los campos ausentes de los partidos antiguos aparecen como Sin informar. Si un marcador manual anterior es incompatible con el formato automático, puedes guardarlo como inconcluso conservando sus games.

## Auditoría de esta versión

- Chrome de escritorio con pantalla táctil emulada a 320 px: formulario del rival, nombre obligatorio, perfil recuperado tras recargar, pausa con movimiento reducido, consigna, informe y reapertura del historial sin red.
- Pruebas de código: dos sets, tercero normal con tie-break 8–6, súper tie-break 10–9 y 11–9, deshacer tras avanzar y tras terminar, cierre inconcluso, migración idempotente, cronómetro, cierre único, ajuste al minuto 75 y direcciones contra diestros y zurdos.
- Pendiente en Android físico: actualización desde el enlace ya publicado, verificación de tus datos reales, comportamiento tras bloqueo y prueba cronometrada en cancha.
