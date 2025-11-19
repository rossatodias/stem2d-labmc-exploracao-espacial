// Arquivo principal do jogo - coordena todos os módulos

// Função principal do loop do jogo
function gameLoop() {
    if (gameState === 'playing' || gameState === 'story') {
        // Limpar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Desenhar elementos
        drawGrid();
        drawSun();
        drawPlanets();
        drawAstronaut();
        
        // Atualizar lógica apenas se estiver jogando (não durante a história)
        if (gameState === 'playing') {
            updateAstronaut();
            checkPlanetCollision();
        }
        
        // Atualizar mensagem
        if (messageTimer > 0) {
            messageTimer--;
            if (messageTimer === 0) {
                document.getElementById('message').textContent = '';
            }
        }
    }
    
    requestAnimationFrame(gameLoop);
}

// Event listeners
window.addEventListener('resize', initCanvas);
window.addEventListener('wheel', handleWheel, { passive: false });
window.addEventListener('keydown', handleKeyDown);

// Event listeners para pan
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mouseup', handleMouseUp);
canvas.addEventListener('mouseleave', handleMouseUp);

// Inicialização
initCanvas();
createStars();
initializePositions(); // Inicializar posições baseadas na Terra
