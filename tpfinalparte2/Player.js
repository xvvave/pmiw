class Player extends Autos {
    constructor(x, y) {
        super(x, y, 8);  // Velocidad 8 para el jugador
        this.imagen = imgMcqueen;
    }

    mover() {
        if (keyIsDown(LEFT_ARROW)) {
            this.x = constrain(this.x - this.velocidad, 130, 500);
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.x = constrain(this.x + this.velocidad, 130, 500);
        }
    }

    actualizar() {
        this.mover();
        this.dibujar();
    }

    reiniciar() {
        this.x = width/2;
        this.y = height-100;
    }
}
