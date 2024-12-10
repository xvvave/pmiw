class Obstaculos extends Autos {
    constructor(x, y) {
        super(x, y, 5);  // Velocidad 5 para obstáculos
        this.imagen = imgObstaculo;
    }

    mover() {
        this.y += this.velocidad;
    }

    actualizar() {
        this.mover();
        this.dibujar();
    }

    reiniciar() {
        this.x = random(130, 500);
        this.y = -100;
    }
}
