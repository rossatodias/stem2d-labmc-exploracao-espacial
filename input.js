function handleKeyPress(event) {
    if (event.key === 'Enter') {
        navigate();
    }
}

function formatCoordinatesInput() {
    const input = document.getElementById('coordinateInput');
    let value = input.value;
    const originalCursorPos = input.selectionStart;
    
    // Remover parênteses existentes para obter o conteúdo bruto
    let rawContent = value.replace(/[()]/g, '');
    
    // Calcular posição do cursor relativa ao conteúdo bruto
    let cursorOffset = originalCursorPos;
    if (value.startsWith('(') && originalCursorPos > 0) {
        cursorOffset--; // Ajustar para o parêntese de abertura removido
    }
    // Garantir que cursorOffset não seja negativo ou além do comprimento do conteúdo bruto
    cursorOffset = Math.max(0, Math.min(rawContent.length, cursorOffset));
    
    // Adicionar parênteses se houver conteúdo
    let newValue;
    let newCursorPos;
    
    if (rawContent.length > 0) {
        newValue = `(${rawContent})`;
        newCursorPos = cursorOffset + 1; // +1 para o parêntese de abertura adicionado
    } else {
        newValue = '';
        newCursorPos = 0;
    }
    
    // Atualizar o valor do input e definir a posição do cursor
    input.value = newValue;
    input.setSelectionRange(newCursorPos, newCursorPos);
    
    // Mostrar dica sobre limites se houver conteúdo
    if (rawContent.length > 0) {
        const coords = rawContent.split(',').map(s => s.trim());
        if (coords.length === 2) {
            const x = parseInt(coords[0]);
            const y = parseInt(coords[1]);
            
            if (isFinite(x) && isFinite(y)) {
                let hint = '';
                if (x < minCameraX || x > maxCameraX) {
                    hint += `X deve estar entre ${minCameraX} e ${maxCameraX}. `;
                }
                if (y < minCameraY || y > maxCameraY) {
                    hint += `Y deve estar entre ${minCameraY} e ${maxCameraY}. `;
                }
                
                // Verificar se as coordenadas estão dentro do Sol (raio = 200)
                const distanceFromSun = Math.sqrt(x * x + y * y);
                if (distanceFromSun <= 400) {
                    hint += 'Não é possível navegar para dentro do Sol!';
                }
                
                if (hint) {
                    showMessage(hint, 'error');
                } else {
                    // Limpar mensagem se coordenadas estiverem válidas
                    if (document.getElementById('message').textContent.includes('deve estar entre') || 
                        document.getElementById('message').textContent.includes('dentro do Sol')) {
                        document.getElementById('message').textContent = '';
                    }
                }
            }
        }
    }
}

// Atalhos de teclado para zoom e pan
function handleKeyDown(event) {
    if (gameState === 'playing') {
        // Verificar se o foco está no input
        const input = document.getElementById('coordinateInput');
        const isInputFocused = document.activeElement === input;
        
        switch(event.key) {
            case '+':
            case '=':
                event.preventDefault();
                zoomIn();
                break;
            case '-':
                // Se o input estiver focado, permitir digitação do sinal negativo
                if (isInputFocused) {
                    return; // Não prevenir comportamento padrão
                }
                event.preventDefault();
                zoomOut();
                break;
            case '0':
                // Se o input estiver focado, permitir digitação do zero
                if (isInputFocused) {
                    return; // Não prevenir comportamento padrão
                }
                event.preventDefault();
                resetZoom();
                break;
            case 'ArrowLeft':
                // Se o input estiver focado, permitir movimento do cursor
                if (isInputFocused) {
                    return; // Não prevenir comportamento padrão
                }
                event.preventDefault();
                panLeft();
                break;
            case 'ArrowRight':
                // Se o input estiver focado, permitir movimento do cursor
                if (isInputFocused) {
                    return; // Não prevenir comportamento padrão
                }
                event.preventDefault();
                panRight();
                break;
            case 'ArrowUp':
                // Se o input estiver focado, permitir movimento do cursor
                if (isInputFocused) {
                    return; // Não prevenir comportamento padrão
                }
                event.preventDefault();
                panUp();
                break;
            case 'ArrowDown':
                // Se o input estiver focado, permitir movimento do cursor
                if (isInputFocused) {
                    return; // Não prevenir comportamento padrão
                }
                event.preventDefault();
                panDown();
                break;
            case 'Home':
                event.preventDefault();
                resetCamera();
                break;
        }
    }
}
