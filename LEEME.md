# Tennis SillaCoach — Actualización para Android

1. Extrae el ZIP y abre el mismo repositorio de GitHub que publica la app.
2. Sube index.html, score.js, coach.js, sw.js, manifest.webmanifest e icon-192.png e icon-512.png a la carpeta publicada. Confirma los cambios.
3. Espera a que GitHub Pages termine de publicar. Abre el mismo enlace en Chrome con conexión y después vuelve a abrir la app instalada desde su icono. Si ves la versión anterior, recarga el enlace y vuelve a abrir la app.
4. Conserva los datos de Chrome para mantener el historial. Comprueba que Datos del rival aparezca antes de iniciar. Luego prueba abrir la app en modo avión.

El puntaje propio se ingresa manualmente al cerrar el partido. El marcador se muestra como Yo/Rival. El correlativo visible se reajusta después de eliminar, mientras el identificador interno del partido permanece estable.

## Verificación

Chrome con vista móvil de 320 px. Perfil del rival, persistencia, alerta con dos extremos, excepción de fatiga fresca, consignas separadas, cierre, edición, eliminación, renumeración y reapertura sin conexión.

Pendiente en Android físico. Publicación en el repositorio existente, actualización desde el icono instalado y comprobación con el historial real.

## Historial horizontal y patrón del rival

Gira el teléfono para consultar las siete columnas del Historial. Toca el marcador para ver ganador, duración e informe. Cada fila tiene Editar y Eliminar. En edición usa Guardar edición o Cancelar.

En Cómo juega el rival, selecciona Patrón de juego en cancha. La observación queda asociada al momento del partido y ajusta las consignas Sirviendo y Recibiendo.

Pruebas en Chrome con vista móvil de 320 px y horizontal de 740 × 360 px: tabla de siete columnas, formato de súper tie-break, edición, eliminación, renumeración, acceso sin conexión y cambios de ambas consignas. Pendiente verificar publicación y actualización en el Android físico.

## Edición, sensaciones y planes tácticos
En Historial, Editar muestra fecha, rival, tipo, puntaje y marcador. Los demás datos se conservan.
En Sensaciones, toca un nivel para elegirlo y tócalo otra vez para guardar. Puedes omitir los pendientes antes de ver las consignas.
Los planes Sirviendo y Recibiendo describen inicio, construcción y cierre del punto.
El pitido se prepara al iniciar el descanso. En segundo plano, con pantalla bloqueada o teléfono en silencio, Android y Chrome pueden impedir el audio. La app muestra Descanso terminado al volver.
Prueba automatizada en Chrome: guardado sin conexión, validación y fallo de guardado simulado, dos toques, consignas, y disparo único del aviso con audio simulado. Pendiente probar sonido real y actualización en el Android físico.

## Última actualización
Abre Físico, Mental o Técnico, elige tus niveles y vuelve a tocar el encabezado del grupo para guardar. Al siguiente descanso se recuperan tus selecciones. Historial muestra Duración. Usa Probar pitido antes del primer descanso y verifica el volumen multimedia del teléfono.

## Historial manual
Usa Agregar partido anterior. Ingresa fecha, rival y marcador Yo/Rival. Para un súper tie-break, elige ese formato y escribe, por ejemplo, 3/6 - 6/4 - 10-8. Puedes dejar en blanco puntaje, duración y apreciación personal. Toca el marcador para abrir el resumen final. Actualiza los archivos en el mismo repositorio sin borrar los datos del navegador.

## Puntaje automático
Ranking y Liga suman 1 punto por partido guardado más 1 por cada set ganado, incluido el súper tie-break decisivo. Un inconcluso suma el punto de partido y solo sus sets terminados y ganados. Amistoso suma 0. El historial calcula también los registros anteriores según el tipo y los sets disponibles. Editar el tipo o el marcador recalcula el puntaje.

El descanso entre sets dura 120 segundos tras confirmar el set, si queda otro por jugar. Dentro de un set dura 90 segundos.
Historial: el partido más antiguo recibe el número 1. Al agregar, editar o eliminar, la numeración visible se recalcula automáticamente por fecha.
Estadística: acumula los partidos del historial. Incluye sets completos y games anotados. El súper tie-break cuenta como set y sus puntos se excluyen de los games. Se suma la duración registrada.
Rivales: registra nombre y, opcionalmente, edad y datos técnicos. Selecciona el perfil en Partido. Las observaciones del encuentro tienen prioridad sobre el perfil.
