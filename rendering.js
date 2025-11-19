// Inicializar canvas
function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Criar estrelas de fundo
function createStars() {
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 2 + 's';
        document.getElementById('gameContainer').appendChild(star);
    }
}

function drawGrid() {
    const gridSize = 100;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    // Calcular o alcance da grade baseado na câmera e zoom
    const startX = Math.floor((camera.x - canvas.width / 2 / scale) / gridSize) - 1;
    const endX = Math.ceil((camera.x + canvas.width / 2 / scale) / gridSize) + 1;
    const startY = Math.floor((camera.y - canvas.height / 2 / scale) / gridSize) - 1;
    const endY = Math.ceil((camera.y + canvas.height / 2 / scale) / gridSize) + 1;
    
    // Linhas verticais
    for (let x = startX; x <= endX; x++) {
        const screenX = (x * gridSize - camera.x) * scale + canvas.width / 2;
        if (screenX >= -gridSize && screenX <= canvas.width + gridSize) {
            ctx.beginPath();
            ctx.moveTo(screenX, 0);
            ctx.lineTo(screenX, canvas.height);
            ctx.stroke();
        }
    }
    
    // Linhas horizontais - sempre desenhar em toda a largura
    for (let y = startY; y <= endY; y++) {
        const screenY = (y * gridSize - camera.y) * scale + canvas.height / 2;
        if (screenY >= -gridSize && screenY <= canvas.height + gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, screenY);
            ctx.lineTo(canvas.width, screenY);
            ctx.stroke();
        }
    }
}

function drawSun() {
    const sunX = (0 - camera.x) * scale + canvas.width / 2;
    const sunY = (0 - camera.y) * scale + canvas.height / 2;
    
    // Tamanho base do Sol (sempre maior que qualquer planeta)
    const baseSunSize = 200; // Muito maior que o maior planeta (Júpiter = 45)
    const sunSize = Math.max(baseSunSize * scale, 60); // Mínimo de 60px para garantir dominância
    const glowSize = sunSize * 2; // Brilho ao redor do Sol
    
    // Brilho do sol (corona)
    const gradient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, glowSize);
    gradient.addColorStop(0, '#ffff00');
    gradient.addColorStop(0.3, '#ff8c00');
    gradient.addColorStop(0.7, '#ff4500');
    gradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(sunX, sunY, glowSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Sol principal
    const sunGradient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunSize);
    sunGradient.addColorStop(0, '#ffff00');
    sunGradient.addColorStop(0.5, '#ff8c00');
    sunGradient.addColorStop(1, '#ff4500');
    
    ctx.fillStyle = sunGradient;
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Nome do sol
    ctx.fillStyle = 'white';
    ctx.font = Math.max(12, 16 * scale) + 'px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Sol', sunX, sunY - sunSize - 20);
}

function drawPlanets() {
    planets.forEach(planet => {
        const position = getPlanetPosition(planet);
        const screenX = (position.x - camera.x) * scale + canvas.width / 2;
        const screenY = (position.y - camera.y) * scale + canvas.height / 2;
        
        // Tamanho do planeta com escala
        const planetSize = planet.size * scale;
        const glowSize = planetSize * 2;
        
        // Só desenhar se estiver na tela
        if (screenX >= -planetSize && screenX <= canvas.width + planetSize &&
            screenY >= -planetSize && screenY <= canvas.height + planetSize) {
            
            // Brilho do planeta
            const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, glowSize);
            gradient.addColorStop(0, planet.color);
            gradient.addColorStop(0.7, planet.color);
            gradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(screenX, screenY, glowSize, 0, Math.PI * 2);
            ctx.fill();
            
            // Anéis de Saturno (especiais)
            if (planet.name === 'Saturno') {
                ctx.strokeStyle = '#FFD700';
                ctx.lineWidth = Math.max(1, 3 * scale);
                ctx.beginPath();
                ctx.ellipse(screenX, screenY, planetSize * 1.5, planetSize * 0.3, 0, 0, Math.PI * 2);
                ctx.stroke();
                
                // Anel interno
                ctx.strokeStyle = '#FFA500';
                ctx.lineWidth = Math.max(1, 2 * scale);
                ctx.beginPath();
                ctx.ellipse(screenX, screenY, planetSize * 1.2, planetSize * 0.2, 0, 0, Math.PI * 2);
                ctx.stroke();
            }
            
            // Planeta
            ctx.fillStyle = planet.color;
            ctx.beginPath();
            ctx.arc(screenX, screenY, planetSize, 0, Math.PI * 2);
            ctx.fill();
            
            // Borda
            ctx.strokeStyle = planet.visited ? '#4CAF50' : 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = Math.max(1, 2 * scale);
            ctx.stroke();
            
            // Nome do planeta
            ctx.fillStyle = 'white';
            ctx.font = Math.max(10, 12 * scale) + 'px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(planet.name, screenX, screenY - planetSize - 10);
        }
    });
}

function drawAstronaut() {
    const screenX = (astronaut.x - camera.x) * scale + canvas.width / 2;
    const screenY = (astronaut.y - camera.y) * scale + canvas.height / 2;
    
    const astronautSize = 40 * scale; // Tamanho da imagem aumentado
    const glowSize = astronautSize * 1.5;
    
    // Desenhar brilho (glow) ao redor da astronauta
    const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, glowSize);
    gradient.addColorStop(0, 'rgba(255, 182, 193, 0.8)');
    gradient.addColorStop(0.7, 'rgba(255, 182, 193, 0.3)');
    gradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(screenX, screenY, glowSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Calcular ângulo de rotação baseado na direção do movimento
    let rotationAngle = 0;
    if (astronaut.moving && astronaut.targetX !== null && astronaut.targetY !== null) {
        let targetX = astronaut.targetX;
        let targetY = astronaut.targetY;
        
        // Se há waypoints, usar o próximo waypoint como destino atual
        if (astronaut.waypoints && astronaut.waypoints.length > 0 && astronaut.currentWaypoint < astronaut.waypoints.length) {
            const waypoint = astronaut.waypoints[astronaut.currentWaypoint];
            targetX = waypoint.x;
            targetY = waypoint.y;
        }
        
        const dx = targetX - astronaut.x;
        const dy = targetY - astronaut.y;
        rotationAngle = Math.atan2(dy, dx);
    }
    
    // Desenhar a imagem da astronauta
    if (astronautImage.complete && astronautImage.naturalHeight !== 0) {
        // Salvar o contexto atual
        ctx.save();
        
        // Mover para a posição da astronauta
        ctx.translate(screenX, screenY);
        
        // Rotacionar baseado na direção do movimento
        ctx.rotate(rotationAngle);
        
        // Desenhar a imagem centralizada
        ctx.drawImage(
            astronautImage, 
            -astronautSize, 
            -astronautSize, 
            astronautSize * 2, 
            astronautSize * 2
        );
        
        // Restaurar o contexto
        ctx.restore();
    } else {
        // Fallback: desenhar círculo se a imagem não carregou
        ctx.fillStyle = '#FFB6C1';
        ctx.beginPath();
        ctx.arc(screenX, screenY, astronautSize, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = 'white';
        ctx.lineWidth = Math.max(1, 2 * scale);
        ctx.stroke();
    }
    
    // Desenhar trajetória se estiver navegando
    if (astronaut.moving && astronaut.targetX !== null && astronaut.targetY !== null) {
        ctx.strokeStyle = 'rgba(255, 182, 193, 0.6)';
        ctx.lineWidth = Math.max(1, 2 * scale);
        ctx.setLineDash([5, 5]);
        
        let currentX = astronaut.x;
        let currentY = astronaut.y;
        
        // Desenhar linha para waypoints
        if (astronaut.waypoints && astronaut.waypoints.length > 0) {
            for (let i = 0; i < astronaut.waypoints.length; i++) {
                const waypoint = astronaut.waypoints[i];
                const waypointScreenX = (waypoint.x - camera.x) * scale + canvas.width / 2;
                const waypointScreenY = (waypoint.y - camera.y) * scale + canvas.height / 2;
                
                ctx.beginPath();
                ctx.moveTo((currentX - camera.x) * scale + canvas.width / 2, (currentY - camera.y) * scale + canvas.height / 2);
                ctx.lineTo(waypointScreenX, waypointScreenY);
                ctx.stroke();
                
                // Desenhar waypoint
                ctx.fillStyle = 'rgba(255, 182, 193, 0.8)';
                ctx.beginPath();
                ctx.arc(waypointScreenX, waypointScreenY, 3 * scale, 0, Math.PI * 2);
                ctx.fill();
                
                currentX = waypoint.x;
                currentY = waypoint.y;
            }
        }
        
        // Desenhar linha para destino final
        const targetScreenX = (astronaut.targetX - camera.x) * scale + canvas.width / 2;
        const targetScreenY = (astronaut.targetY - camera.y) * scale + canvas.height / 2;
        
        ctx.beginPath();
        ctx.moveTo((currentX - camera.x) * scale + canvas.width / 2, (currentY - camera.y) * scale + canvas.height / 2);
        ctx.lineTo(targetScreenX, targetScreenY);
        ctx.stroke();
        
        ctx.setLineDash([]); // Resetar linha tracejada
    }
}
