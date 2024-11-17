class Autos {
    constructor(x, y, velocidad) {
        this.x = x;          // Posición X
        this.y = y;          // Posición Y
        this.velocidad = velocidad;  // Velocidad de movimiento
        this.ancho = 60;     // Ancho del sprite
        this.alto = 100;     // Alto del sprite
    }

    dibujar() {
        image(this.imagen, 
              this.x - this.ancho/2, 
              this.y - this.alto/2, 
              this.ancho, 
              this.alto);
    }
}
