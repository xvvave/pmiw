// Declaración de variables locales para la función Patron()
let numCols = 25; // Número de columnas de patrones
let numRows = 25; // Número de filas de patrones
let spacing = 40; // Espaciado entre los patrones

function Patron() {
  background(255); // Establecer el color de fondo del lienzo a blanco (255)

  // Ciclo For Anidado para recorrer las filas y columnas de patrones
  for (let i = 0; i < numCols; i++) {
    for (let j = 0; j < numRows; j++) {
      // Calcular las coordenadas de cada patrón basado en el índice y el espaciado
      let patternX = 4 + i * spacing;
      let patternY = 0 + j * spacing;

      // Calcular la distancia entre el mouse y el patrón usando la función dist()
      let distance = dist(mouseX, mouseY, 408 + patternX, 10 + patternY);
      let maxDistance = 80; // Distancia máxima para el efecto de zoom
      let zoomScale = map(distance, 0, maxDistance, maxZoomScale, 1.0); // Mapear la distancia a un factor de escala

      // Dibujar un cuadrado en la posición calculada
      fill(0); // Establecer el color de relleno a negro
      rect(418 + patternX, 0 + patternY, 19, 19); // Dibujar el primer cuadrado de tamaño 19x19

      // Dibujar otro cuadrado en la posición calculada
      fill(0); // Establecer el color de relleno a negro
      rect(398 + patternX, 20 + patternY, 19, 19); // Dibujar el segundo cuadrado de tamaño 19x19

      // Dibujar un círculo en la posición calculada
      fill(0); // Establecer el color de relleno a negro
      if (aplicarZoom) {
        // Aplicar el efecto de zoom si la variable aplicarZoom es verdadera
        circle(428 + patternX, 30 + patternY, 19 * zoomScale);
      } else {
        // Dibujar el círculo sin efecto de zoom
        circle(428 + patternX, 30 + patternY, 19);
      }

      // Dibujar otro círculo en la posición calculada con efecto de zoom
      if (distance <= zoomRadius && aplicarZoom) {
        // Si la distancia es menor o igual al radio de zoom y el zoom está activado
        circle(408 + patternX, 10 + patternY, 19 * maxZoomScale);
      } else {
        // Dibujar el círculo sin efecto de zoom
        fill(0); // Establecer el color de relleno a negro
        circle(408 + patternX, 10 + patternY, 19);
      }
    }
  }
}
