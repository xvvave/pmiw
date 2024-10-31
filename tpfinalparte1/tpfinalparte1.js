//Desarrollado por Lautaro Romero Temperini 95526/6 & Ivan M. Portela 120366/8
//Explicacion Lautaro https://youtu.be/ivrIaK6yDjI
//Explicacion Ivan https://www.youtube.com/watch?v=lM5N9-4j2po&ab_channel=IvanRotela
//Diagrama de flujo https://drive.google.com/file/d/1kh4ar8WvimRVxCbauK8L2OhY1yofANzF/view

let estado = 0; // Inicializa el estado en 0
let imagenes = []; // Arreglo para almacenar imágenes
let textos = []; // Arreglo para almacenar textos de la historia
let opciones = []; // Arreglo para almacenar opciones
let siguientes = []; // Arreglo para almacenar estados siguientes
let sonido; // Variable para almacenar el sonido

function preload() {
  // Carga los textos desde el archivo 'textos.txt'
  loadStrings('data/textos.txt', (data) => {
    textos = data;
    console.log('Textos cargados:', textos.length);
  });

  // Carga las opciones desde el archivo 'opciones.txt' y las separa por '|'
  loadStrings('data/opciones.txt', (data) => {
    opciones = data.map(line => line.split('|'));
    console.log('Opciones cargadas:', opciones.length);
  });

  // Carga el sonido
  sonido = loadSound('data/sonidos/sonido.mp3');

  // Carga las imágenes de las escenas
  for (let i = 1; i <= 21; i++) {
    const path = `data/imagenes/escena${i}.jpg`;
    imagenes.push(loadImage(path, 
      () => console.log(`Imagen escena ${i} cargada`),  
      (err) => console.error(`Error cargando escena ${i}:`, err)
    ));
  }
}

function setup() {
  createCanvas(640, 480);  // Crea el lienzo con dimensiones 640x480 píxeles
  inicializar();  // Llama a la función para inicializar variables o configuraciones
}

function draw() {
  // Controla lo que se dibuja según el estado
  if (estado === 0) {
    pantallaInicio();  // Muestra la pantalla de inicio
    sonido.stop(); // La musica se detiene en la pantalla de inicio
  } else if (estado === 21) {
    pantallaCreditos();  // Muestra la pantalla de créditos
  } else if (estado >= 1 && estado <= 21) {
    pantallaHistoria(estado); // Muestra la historia correspondiente al estado
  }
}

function mousePressed() {
  // Controla lo que sucede cuando se hace clic con el mouse
  if (estado === 0) {
    // Si estamos en la pantalla de inicio
    if (colisionBoton(width/2, height*0.75, 200, 40)) {
      estado = 1;  // Cambia el estado a 1 si el botón de inicio es presionado

      // Control de sonido
      sonido.loop(); // Reproduce el sonido cuando comienza la historia
    } else if (colisionBoton(width/2, height*0.75+60, 200, 40)) {
      estado = 21;  // Cambia al estado 21 (créditos) si el botón correspondiente es presionado
    }
  } else if (estado === 21) {
    // Si estamos en la pantalla de créditos
    if (colisionBoton(width/2, height*0.75+60, 200, 40)) {
      estado = 0;  // Vuelve al estado 0 (pantalla de inicio) al presionar el botón en créditos
    }
  } else if (estado >= 1 && estado <= 21) {
    // Si estamos en la pantalla de la historia
    if (colisionBoton(width/3, height - 40, 160, 40)) {
      estado = siguientes[estado-1][0];  // Avanza a la siguiente escena en la historia (opción 1)
    } else if (colisionBoton(2 * width/3, height - 40, 160, 40)) {
      estado = siguientes[estado-1][1];  // Avanza a la siguiente escena en la historia (opción 2)
    }
  }
  console.log("estado: " + estado);  // Muestra el estado actual en la consola
}
