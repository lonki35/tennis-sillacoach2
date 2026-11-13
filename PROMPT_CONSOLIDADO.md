# Prompt consolidado de cierre de Tennis SillaCoach

Actualiza la PWA existente y conserva el mismo origen de GitHub Pages y el almacenamiento local. Mantén la navegación Partido e Historial, el perfil del rival, objetivos, cronómetro, descanso de 90 segundos, avance automático de sets, tie-break a 7 y súper tie-break a 10 con dos puntos de diferencia, corrección del marcador, cierre inconcluso e informe. El cierre registra puntaje propio, resultado, ganador y duración.

## Sensaciones

Al entrar, muestra Físico, Mental y Técnico. El primer toque en un grupo abre sus opciones. Cada nivel se selecciona con un toque y queda pendiente. Volver a tocar el mismo encabezado guarda sus cambios y cierra el grupo. Guarda únicamente las variables modificadas. Si quedan cambios pendientes, deshabilita Ver consigna hasta guardarlos o descartarlos explícitamente. Permite consultar consignas con los datos disponibles. En el siguiente descanso precarga el último estado confirmado del mismo partido, incluso tras recargar. Registra minuto, set y marcador al confirmar.

Físico en verdes comprende fatiga, activación y tensión. Mental en rojos comprende confianza, presión, enfoque y frustración. Técnico en azules comprende sensación del golpe y potencia. Usa tres niveles con las etiquetas existentes. Contrasta el texto oscuro sobre tarjetas claras y el texto blanco sobre botones seleccionados oscuros. Conserva la alerta por dos extremos desfavorables y excluye fatiga fresca. Mantén una opción explícita Sin registrar.

## Consignas

Mantén las lecturas Rival sirviendo, Rival recibiendo y Patrón de juego en cancha. Entrega dos planes, Sirviendo y Recibiendo, con inicio, construcción y cierre condicional. Usa sensaciones, observaciones, lateralidad y tiempo del partido. Favorece margen con fatiga alta o tensión y acorta el punto cuando haya una pelota favorable tras 75 minutos. Guarda las consignas en el informe.

## Historial

En horizontal, muestra Código, Fecha, Rival, Tipo de partido, Puntaje, Resultado, Duración y Acciones. Muestra duración HH:MM:SS directamente en la fila. Calcula desde inicio y término guardados. Toca el marcador para ver el detalle. Usa formato Yo/Rival para sets y Yo-Rival para el súper tie-break. Editar permite fecha, rival, tipo, puntaje propio y marcador. Conserva duración, perfil, observaciones e identificador interno al guardar. Recalcula el ganador cuando corresponda. Si falla el guardado, deja el formulario abierto. Eliminar requiere confirmación y reajusta el correlativo visible.

## Sonido y auditoría

Desbloquea audio con una acción del usuario. Incluye Probar pitido y control de sonido. Emite un único aviso al vencer en primer plano y muestra Descanso terminado. Al volver de segundo plano actualiza el estado sin repetir un pitido vencido. Comprueba el aviso con el sonido desactivado y al reiniciar el descanso. En Android físico, verifica el volumen multimedia, el pitido de prueba y un descanso completo. Identifica por separado las restricciones con bloqueo o segundo plano.

Prueba que cada grupo guarde con el segundo toque en su encabezado, que al siguiente descanso se conserven las respuestas y que cambiar una sola mantenga las demás. Verifica el contraste de opciones seleccionadas y sin seleccionar. Comprueba la duración en la tabla, la edición persistente sin red, el cambio de ambas consignas según el rival y la actualización de caché. Entrega ZIP y guía de actualización. Distingue pruebas de navegador de las pendientes en Android físico.

## Contraste de los botones de Sensaciones
Aplica fondo blanco #FFFFFF y texto #111111 explícitos a los niveles y a Sin registrar en las nueve subcategorías. Usa fondo #162B3E y texto blanco #FFFFFF para una selección. Limita el esquema claro al panel de sensaciones y conserva los fondos de grupo. Define también el color de relleno del texto en Chromium para evitar que se vuelva ilegible. Comprueba foco visible.
Prueba en Chrome con preferencia de modo oscuro y ancho de 320 px. Comprueba fondo, texto y relleno computados de todas las opciones y el estado seleccionado. Repite en Android físico con el modo oscuro habitual y verifica que las opciones se lean al abrir Físico, Mental y Técnico desde el icono actualizado. Verifica que el guardado por grupo y la recuperación en el siguiente descanso sigan funcionando. Actualiza la caché de la PWA y conserva el historial local.

## Consignas breves para usar en cancha
Muestra Sirviendo y Recibiendo en tres líneas cada una: Inicio, Construcción y Cierre. Limita cada plan a 28 palabras, incluidos los rótulos. Usa una acción por línea y una condición breve para atacar o recuperar margen. Mantén el ajuste por lateralidad cuando se conoce, el patrón de fondo o red, las observaciones de saque y devolución, y el margen cuando hay tensión o fatiga. Guarda en el informe el mismo plan que vio el jugador.
Ejemplo: Inicio · Saca al cuerpo. Construcción · Abre con un cruzado profundo. Cierre · Corta y cómodo: ataca. Si no, cruzado.
Verifica la extensión con distintas combinaciones de rival y sensaciones y prueba la vista móvil.

## Registro rápido
Un toque guarda una sensación. Se recuperan los niveles en el descanso siguiente. Inicio, Construcción y Cierre se muestran en recuadros. La consigna distingue rachas de games y puntos. En games normales, Registrar puntos para la racha permite anotar puntos opcionalmente sin cambiar el marcador. En desempates se usan los puntos del marcador.

## Puntaje automático
Ranking y Liga suman 1 punto por partido guardado más 1 por cada set ganado, incluido el súper tie-break decisivo. Un inconcluso suma el punto de partido y solo sus sets terminados y ganados. Amistoso suma 0. El historial calcula también los registros anteriores según el tipo y los sets disponibles. Editar el tipo o el marcador recalcula el puntaje.

## Recomendación de Juego
Una selección por grupo, de 1 favorable a 3 menos favorable. El cansancio ajusta el esfuerzo, el estado mental la rutina y el margen, y el estado técnico el riesgo del golpe. Mantén los recuadros Inicio, Construcción y Cierre para saque y devolución.

El descanso entre sets dura 120 segundos tras confirmar el set, si queda otro por jugar. Dentro de un set dura 90 segundos.
Rivales: registra nombre y, opcionalmente, edad y datos técnicos. Selecciona el perfil en Partido. Las observaciones del encuentro tienen prioridad sobre el perfil.
Objetivos del día: permite elegir hasta cuatro de ocho objetivos, incluidos slices, devolución, passing shots, globos y paralelos.
