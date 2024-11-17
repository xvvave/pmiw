// Desarrollado por Lautaro Romero Temperini 95526/6 & Ivan M. Portela 120366/8
// Link Explicación: https://youtu.be/DY8t6hsacQ4

////////////////////  

// Variables globales para el juego y las imágenes
let juego;
let imgMcqueen, imgObstaculo, imgFondo, imgInicio;
let tiempoInicial = 20; 
let sonidoJuego;

// Pre-carga de recursos antes de iniciar el juego
function preload() {
  imgMcqueen = loadImage('data/mcqueen.png');
  imgObstaculo = loadImage('data/autoObstaculo.png');
  imgFondo = loadImage('data/fondoCarretera.jpg');
  imgInicio = loadImage('data/imagenInicio.jpg');
  sonidoJuego = loadSound('data/sonidoJuego.mp3');
}

// Configuración inicial del canvas y del juego

function setup() {
  createCanvas(640, 480);
  juego = new GameManager();
}

// Ciclo principal del juego
function draw() {
  juego.actualizar();
}

// Detectar clics del mouse
function mousePressed() {
  if (juego) {
    juego.mousePressed();
  }
}
