// Clase para los botones interactivos
class Boton {
  constructor(texto, x, y, ancho, alto) {
    this.texto = texto;
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
  }

  // Dibujar y actualizar el estado del botón
  actualizar() {
    push();
    rectMode(CENTER);
    if (this.colisionMouse()) {
      fill(150, 169, 237);
    } else {
      fill(100, 149, 237);
    }
    rect(this.x, this.y, this.ancho, this.alto, 10);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text(this.texto, this.x, this.y);
    pop();
  }

  // Detectar si el mouse está sobre el botón
  colisionMouse() {
    return mouseX > this.x - this.ancho/2 &&
      mouseX < this.x + this.ancho/2 &&
      mouseY > this.y - this.alto/2 &&
      mouseY < this.y + this.alto/2;
  }
}
