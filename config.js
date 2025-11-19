// Configurações globais do jogo
const canvas = document.getElementById('spaceCanvas');
const ctx = canvas.getContext('2d');

// Estados do jogo
let gameState = 'menu'; // menu, playing, dialog
let menuVisible = true; // Estado do menu (visível/minimizado)

// Configurações da câmera
// Câmera será definida dinamicamente na inicialização
let scale = 1;
let minScale = 0.3; // Zoom mínimo
let maxScale = 2.0; // Zoom máximo
let minCameraX = -1600; // Limite mínimo da câmera (esquerda)
let maxCameraX = 1600; // Limite máximo da câmera (direita)
let minCameraY = -1000; // Limite mínimo da câmera (baixo)
let maxCameraY = 1000; // Limite máximo da câmera (cima)
let panSpeed = 0.5; // Velocidade do pan

// Configurações da câmera
let camera = { 
    x: 0, // Será definido dinamicamente na inicialização
    y: 0  // Será definido dinamicamente na inicialização
}; // Começa centralizada na Terra

// Configurações do mouse
let isDragging = false;
let lastMouseX = 0;
let lastMouseY = 0;

// Configurações de mensagens
let inputText = '';
let message = '';
let messageTimer = 0;

// Configuração de exibição das coordenadas dos planetas
let showPlanetCoordinates = false;

// Configuração da astronauta
let astronaut = { 
    x: 0, // Será definido dinamicamente na inicialização
    y: 0, // Será definido dinamicamente na inicialização
    targetX: null, 
    targetY: null, 
    moving: false, 
    waypoints: [], 
    currentWaypoint: 0 
}; // Começa na Terra (posição calculada dinamicamente)

// Imagem da astronauta
let astronautImage = new Image();
astronautImage.src = 'astronauta.png';

// Tratamento de erro para a imagem
astronautImage.onerror = function() {
    console.log('Imagem astronauta.png não encontrada. Usando fallback.');
};

// Função para inicializar posições baseadas na Terra
function initializePositions() {
    const earthPosition = getEarthPosition();
    
    // Definir posição inicial da astronauta na Terra
    astronaut.x = earthPosition.x;
    astronaut.y = earthPosition.y;
    
    // Definir posição inicial da câmera centralizada na Terra
    camera.x = earthPosition.x;
    camera.y = earthPosition.y;
}
