// Clase principal que gestiona el estado del juego
class GameManager {
  constructor() {
    this.estado = "inicio"; // Estado inicial del juego
    this.mcqueen = new Player(width/2, height-100);// Jugador principal
    this.obstaculos = []; // Lista de obstáculos en el juego
    this.cantObstaculos = 3; // Número de obstáculos iniciales
    this.vidas = 3; // Número de vidas del jugador
    this.tiempoRestante = tiempoInicial;  // Tiempo restante del juego
    this.tiempoAnterior = 0;  // Tiempo anterior para control de intervalos


    this.botonInicio = new Boton("EMPEZAR", width/2, 440, 200, 40);
    this.botonReinicio = new Boton("REINICIAR", width/2, 440, 200, 40);
    this.botonCreditos = new Boton("CRÉDITOS", width/2, 380, 200, 40);
    this.botonVolver = new Boton("VOLVER", width/2, 440, 200, 40);

       // Crear obstáculos iniciales
 for (let i = 0; i < this.cantObstaculos; i++) {
      this.obstaculos.push(new Obstaculos(random(130, 500), -80 * (i+1)));
    }
  }

  //Método pantalla Créditos
    pantallaCreditos() {
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("Créditos", width/2, height/4);
    
    textSize(20);
    text("Desarrollado por:", width/2, height/4 + 50);
    text("Lautaro Romero Temperini 95526/6", width/2, height/4 + 80);
    text("Ivan M. Portela 120366/8", width/2, height/4 + 110);
    
    text("Arte y Diseño:", width/2, height/4 + 160);
    text("Pixar Animation Studios", width/2, height/4 + 190);
    
    text("Música:", width/2, height/4 + 240);
    text("Randy Newman", width/2, height/4 + 270);
    
    this.botonVolver.actualizar();
  }

// Método principal para actualizar el estado del juego
 actualizar() {
  if (this.estado === "inicio") {
    this.pantallaInicio(); // Pantalla de inicio
  } else if (this.estado === "jugando") {
    this.jugar(); // Juego en progreso
  } else if (this.estado === "gameOver") {
    this.pantallaGameOver(); // Pantalla de fin del juego
  } else if (this.estado === "victoria") {
    this.pantallaVictoria(); // Pantalla de victoria
  } else if (this.estado === "creditos") {
    this.pantallaCreditos();// Pantalla de creditos
  }
}

  // Muestra la pantalla de inicio
  pantallaInicio() {
    // Usar la imagen de fondo
    image(imgInicio, 0, 0, width, height); // Fondo de inicio
    fill(255);
    textAlign(CENTER, CENTER);
    stroke(0); 
    strokeWeight(3); 
    textSize(24); 
    text("McQueen avanza por la autopista hacia la gran carrera.", width/2, height/4 - 60);
    stroke(0); 
    strokeWeight(3); 
    textSize(24);  
    text("¿Logrará superar el tráfico y llegar a tiempo?", width/2, height/4 - 30);
    textSize(16);
    text("Usa las flechas ← → para esquivar los obstáculos", width/2, height/2 + 130);
    text("¡Sobrevive 20 segundos para ganar!", width/2, height/2 + 160);
    this.botonInicio.actualizar();  // Dibuja el botón de inicio
  }

  // Muestra el estado actual del juego en progreso
jugar() {
  image(imgFondo, 0, 0, width, height); // Fondo de juego

  // Actualizar tiempo
  if (millis() - this.tiempoAnterior >= 1000) {
    this.tiempoRestante--; // Resta un segundo
    this.tiempoAnterior = millis(); // Actualiza el tiempo
  }

  // Verificar victoria por tiempo
  if (this.tiempoRestante <= 0) {
    this.estado = "victoria";  // Cambia el estado a victoria
    return;
  }

  this.mcqueen.actualizar(); // Actualiza al jugador

  for (let obstaculo of this.obstaculos) {
    obstaculo.actualizar(); // Actualiza cada obstáculo

    if (this.colision(this.mcqueen, obstaculo)) {
      this.vidas--; // Resta una vida
      obstaculo.reiniciar(); // Reinicia el obstáculo
      if (this.vidas <= 0) {
        this.estado = "gameOver"; // Cambia el estado a fin del juego
      }
    }

    if (obstaculo.y > height) {
      obstaculo.reiniciar(); // Reinicia obstáculos fuera de pantalla
    }
  }

  this.mostrarEstado(); // Muestra vidas y tiempo
}

  // Detecta colisiones entre dos objetos
  colision(auto1, auto2) {
    let distancia = dist(auto1.x, auto1.y, auto2.x, auto2.y); // Distancia entre centros
    return distancia < 47;  // Distancia mínima para detectar colisión
  }

  // Mostrar información de tiempo y vidas
  mostrarEstado() {
    fill(255);
    textSize(24);
    textAlign(LEFT);
    text("Tiempo: " + this.tiempoRestante + "s", 20, 30);
    text("Vidas: " + this.vidas, 20, 60);
  }

  pantallaGameOver() {
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("¡Te has quedado en el embotellamiento!", width/2, height/3);
    textSize(24);
    text("Tiempo sobrevivido: " + (tiempoInicial - this.tiempoRestante) + "s", width/2, height/2);
    this.botonCreditos.actualizar();
    this.botonReinicio.actualizar();
  }

  pantallaVictoria() {
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("¡Lograste superar el tránsito!", width/2, height/3);
    textSize(24);
    text("¡Ka-Chow!", width/2, height/2);
  this.botonCreditos.actualizar();
  this.botonReinicio.actualizar();
  }

 mousePressed() {
    if (this.estado === "inicio" && this.botonInicio.colisionMouse()) {
      this.estado = "jugando";
      this.tiempoAnterior = millis();
      sonidoJuego.loop();
    } else if ((this.estado === "gameOver" || this.estado === "victoria") && this.botonReinicio.colisionMouse()) {
      this.reiniciar();
    } else if ((this.estado === "gameOver" || this.estado === "victoria") && this.botonCreditos.colisionMouse()) {
      sonidoJuego.stop();
      this.estado = "creditos";
    } else if (this.estado === "creditos" && this.botonVolver.colisionMouse()) {
      this.estado = "inicio";
    }
}

  reiniciar() {
    sonidoJuego.stop();
    this.vidas = 3;
    this.tiempoRestante = tiempoInicial;
    this.tiempoAnterior = millis();
    this.estado = "jugando";
    this.mcqueen.reiniciar();
    for (let i = 0; i < this.obstaculos.length; i++) {
      this.obstaculos[i].y = -80 * (i+1);
      this.obstaculos[i].x = random(90, 540);
    }
  }
}
