// Declaración de variables
let Referencia; // Variable para almacenar la imagen de referencia
let zoomRadius = 15; // Radio para el efecto de zoom
let invertido = false; // Variable para controlar el estado de inversión de colores
let aplicarZoom = true; // Variable para activar o desactivar el efecto de zoom
let maxZoomScale = 1.5; // Factor de escala máximo para el zoom

/////////////////////////////////////////////////

function setup() {
  createCanvas(800, 400); // Crear un lienzo de 800x400 píxeles
  Referencia = loadImage("data/Referencia.jpg"); // Cargar la imagen de referencia desde la carpeta "data"
  noCursor(); // Ocultar el cursor del mouse
}

/////////////////////////////////////////////////

function draw() {
  Patron(); // Llamar a la función Patron() para dibujar el patrón en el lienzo

  // Dibujar la imagen de referencia en la posición (0, 0) del lienzo
  image(Referencia, 0, 0);

  // Mostrar las coordenadas del mouse en la consola usando la función propia obtenerCoordenadas
  print(obtenerCoordenadas(mouseX, mouseY));

  // Verificar si la variable invertido es verdadera y aplicar el filtro de inversión de colores si es necesario
  if (invertido) {
    filter(INVERT); // Aplicar el filtro de inversión de colores a todo el lienzo
  }
}

/////////////////////////////////////////////////

function mousePressed() {
  // Cambiar el estado de inversión de colores al hacer clic con el mouse
  invertido = !invertido;
}

/////////////////////////////////////////////////

function keyPressed() {
  // Verificar si la tecla presionada es 'r' o 'R' para desactivar el zoom
  if (key === 'r' || key === 'R') {
    aplicarZoom = false;
  }
  // Verificar si la tecla presionada es ENTER para activar el zoom
  else if (keyCode === ENTER) {
    aplicarZoom = true;
  }
}

/////////////////////////////////////////////////

// Función propia que toma las coordenadas X e Y como parámetros
// y devuelve una cadena con las coordenadas del mouse formateadas
function obtenerCoordenadas(x, y) {
  return "X: " + x + ", Y: " + y;
}
