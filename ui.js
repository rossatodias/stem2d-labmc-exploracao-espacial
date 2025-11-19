// Funções do jogo
function startGame() {
    gameState = 'story'; // Mudar para estado de história
    document.getElementById('menu').style.display = 'none';
    document.getElementById('ui').style.display = 'none'; // Menu minimizado durante a história
    document.getElementById('menuToggle').style.display = 'block';
    updatePlanetList();
    updateZoomDisplay(); // Inicializar display de zoom
    
    // Mostrar história do jogo
    showGameStory();
    
    gameLoop();
}

function toggleMenu() {
    const ui = document.getElementById('ui');
    const toggleBtn = document.getElementById('menuToggle');
    
    menuVisible = !menuVisible;
    
    if (menuVisible) {
        ui.style.display = 'block';
        toggleBtn.textContent = '☰';
    } else {
        ui.style.display = 'none';
        toggleBtn.textContent = '☰';
    }
}

function showDialog(title, message) {
    // Não alterar o gameState se estivermos na história
    if (gameState !== 'story') {
        gameState = 'dialog';
    }
    document.getElementById('dialogTitle').textContent = `👽 ${title}`;
    document.getElementById('dialogMessage').innerHTML = message;
    document.getElementById('dialog').style.display = 'block';
}

function closeDialog() {
    // Se estava no estado de história, mudar para playing e mostrar menu
    if (gameState === 'story') {
        gameState = 'playing';
        document.getElementById('ui').style.display = 'block'; // Mostrar menu após história
        menuVisible = true; // Garantir que o estado do menu seja visível
        // Atualizar o botão do menu para refletir o estado correto
        const toggleBtn = document.getElementById('menuToggle');
        toggleBtn.textContent = '☰';
    } else {
        gameState = 'playing';
    }
    document.getElementById('dialog').style.display = 'none';
}

function showMessage(text, type = 'message') {
    const messageElement = document.getElementById('message');
    messageElement.textContent = text;
    messageElement.className = type;
    messageTimer = 120; // 2 segundos a 60 FPS
}

function showGameStory() {
    const storyTitle = "🌌 A Jornada de Valentina";
    const storyMessage = `Bem-vindo à missão de exploração espacial!<br><br>

Valentina é uma astronauta corajosa em uma missão para explorar o sistema solar. Sua nave está equipada com um sistema de navegação por coordenadas cartesianas.<br><br>

🎯 <strong>SUA MISSÃO:</strong><br>
• Ajude a Valentina a explorar todos os 8 planetas do sistema solar<br>
• Use coordenadas (x, y) para navegar<br>
• Evite o Sol - ele é perigoso demais para se aproximar!<br>
• Converse com os habitantes de cada planeta<br><br>

🛸 <strong>CONTROLES:</strong><br>
• Digite coordenadas no formato (x, y)<br>
• Use o mouse para mover a câmera<br>
• Scroll para zoom in/out<br>
• Setas do teclado para navegação<br><br>

<strong>Boa sorte! O universo te aguarda!</strong>`;

    showDialog(storyTitle, storyMessage);
}

function togglePlanetCoordinates() {
    showPlanetCoordinates = !showPlanetCoordinates;
    const toggleButton = document.getElementById('coordinatesToggle');
    
    if (showPlanetCoordinates) {
        toggleButton.textContent = 'Ocultar Coordenadas';
    } else {
        toggleButton.textContent = 'Mostrar Coordenadas';
    }
    
    // Atualizar a lista de planetas para refletir a mudança
    updatePlanetList();
}
