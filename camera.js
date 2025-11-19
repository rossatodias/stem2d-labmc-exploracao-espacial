// Funções de zoom
function zoomIn() {
    if (scale < maxScale) {
        scale = Math.min(maxScale, scale * 1.2);
        updateZoomDisplay();
    }
}

function zoomOut() {
    if (scale > minScale) {
        scale = Math.max(minScale, scale / 1.2);
        updateZoomDisplay();
    }
}

function resetZoom() {
    scale = 1;
    updateZoomDisplay();
}

function updateZoomDisplay() {
    const zoomPercent = Math.round(scale * 100);
    document.getElementById('zoomLevel').textContent = zoomPercent + '%';
    
    // Atualizar estado dos botões
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    
    zoomInBtn.disabled = scale >= maxScale;
    zoomOutBtn.disabled = scale <= minScale;
}

// Zoom com scroll do mouse
function handleWheel(event) {
    if (gameState === 'playing') {
        // Verificar se o mouse está sobre o menu
        const ui = document.getElementById('ui');
        const menuToggle = document.getElementById('menuToggle');
        
        // Se o mouse estiver sobre o menu ou botão toggle, não fazer zoom
        if (ui.contains(event.target) || menuToggle.contains(event.target)) {
            return; // Permitir scroll normal do menu
        }
        
        event.preventDefault();
        const zoomFactor = 1.1;
        
        if (event.deltaY < 0) {
            // Scroll para cima - zoom in
            if (scale < maxScale) {
                scale = Math.min(maxScale, scale * zoomFactor);
                updateZoomDisplay();
            }
        } else {
            // Scroll para baixo - zoom out
            if (scale > minScale) {
                scale = Math.max(minScale, scale / zoomFactor);
                updateZoomDisplay();
            }
        }
    }
}

// Função para limitar a posição da câmera
function limitCameraPosition() {
    camera.x = Math.max(minCameraX, Math.min(maxCameraX, camera.x));
    camera.y = Math.max(minCameraY, Math.min(maxCameraY, camera.y));
}

// Funções de pan e centralização
function panLeft() {
    camera.x -= 100 * panSpeed;
    limitCameraPosition();
}

function panRight() {
    camera.x += 100 * panSpeed;
    limitCameraPosition();
}

function panUp() {
    camera.y -= 100 * panSpeed;
    limitCameraPosition();
}

function panDown() {
    camera.y += 100 * panSpeed;
    limitCameraPosition();
}

function centerOnPlanet(planetName) {
    const planet = planets.find(p => p.name === planetName);
    if (planet) {
        const position = getPlanetPosition(planet);
        camera.x = position.x;
        camera.y = position.y;
        limitCameraPosition();
    }
}

// Pan com arrastar do mouse
function handleMouseDown(event) {
    if (gameState === 'playing') {
        // Verificar se o mouse está sobre o menu
        const ui = document.getElementById('ui');
        const menuToggle = document.getElementById('menuToggle');
        
        // Se o mouse estiver sobre o menu ou botão toggle, não fazer pan
        if (ui.contains(event.target) || menuToggle.contains(event.target)) {
            return;
        }
        
        isDragging = true;
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
        canvas.style.cursor = 'grabbing';
    }
}

function handleMouseMove(event) {
    if (gameState === 'playing' && isDragging) {
        // Verificar se o mouse está sobre o menu
        const ui = document.getElementById('ui');
        const menuToggle = document.getElementById('menuToggle');
        
        // Se o mouse estiver sobre o menu ou botão toggle, parar o pan
        if (ui.contains(event.target) || menuToggle.contains(event.target)) {
            isDragging = false;
            canvas.style.cursor = 'crosshair';
            return;
        }
        
        const deltaX = event.clientX - lastMouseX;
        const deltaY = event.clientY - lastMouseY;
        
        // Movimento horizontal
        camera.x -= deltaX / scale; // Ajustar velocidade baseada no zoom
        
        // Movimento vertical
        camera.y -= deltaY / scale; // Ajustar velocidade baseada no zoom
        
        limitCameraPosition(); // Aplicar limites
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    }
}

function handleMouseUp() {
    if (gameState === 'playing') {
        isDragging = false;
        canvas.style.cursor = 'crosshair';
    }
}
