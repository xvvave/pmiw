function dibujarBoton(texto, x, y) {
  push(); // Guarda el estado actual del contexto de dibujo para poder restaurarlo más tarde.

  fill(100, 149, 237); // Establece el color de relleno a un tono de azul (RGB: 100, 149, 237).

  // Dibuja un rectángulo centrado en (x, y) con un ancho de 160, alto de 40 y bordes redondeados.
  rect(x - 80, y - 20, 160, 40, 5);

  fill(255); // Cambia el color de relleno a blanco (RGB: 255, 255, 255).

  textAlign(CENTER, CENTER); // Establece la alineación del texto al centro tanto horizontal como verticalmente.

  textSize(12); // Establece el tamaño de la fuente del texto a 12 píxeles.

  text(texto, x, y); // Dibuja el texto en la posición (x, y) con el contenido de la variable "texto".

  pop(); // Restaura el estado del contexto de dibujo al que se guardó con push().
}

function colisionBoton(x, y, w, h) {
  // Verifica si el cursor del mouse está dentro de los límites del botón.
  return (mouseX > x - w / 2 && mouseX < x + w / 2 &&
    mouseY > y - h / 2 && mouseY < y + h / 2);
}
