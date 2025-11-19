// Função para calcular trajetória que evita o Sol
function calculateSafePath(startX, startY, targetX, targetY) {
    const sunRadius = 200; // Raio do Sol
    const safetyMargin = 100; // Margem de segurança
    const safeRadius = sunRadius + safetyMargin;
    
    // Função para calcular distância de um ponto à linha
    function distancePointToLine(px, py, x1, y1, x2, y2) {
        const A = px - x1;
        const B = py - y1;
        const C = x2 - x1;
        const D = y2 - y1;
        
        const dot = A * C + B * D;
        const lenSq = C * C + D * D;
        
        if (lenSq === 0) {
            // Ponto para ponto
            return Math.sqrt(A * A + B * B);
        }
        
        const param = dot / lenSq;
        let xx, yy;
        
        if (param < 0) {
            xx = x1;
            yy = y1;
        } else if (param > 1) {
            xx = x2;
            yy = y2;
        } else {
            xx = x1 + param * C;
            yy = y1 + param * D;
        }
        
        const dx = px - xx;
        const dy = py - yy;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    // Verificar se a linha passa perto do Sol (0,0)
    const distanceToSun = distancePointToLine(0, 0, startX, startY, targetX, targetY);
    
    if (distanceToSun < safeRadius) {
        // Calcular ângulo da trajetória original
        const trajectoryAngle = Math.atan2(targetY - startY, targetX - startX);
        
        // Calcular ângulo perpendicular à trajetória (90 graus)
        const perpendicularAngle = trajectoryAngle + Math.PI / 2;
        
        // Calcular ponto de desvio a uma distância segura do Sol
        const deviationDistance = safeRadius + 200; // Distância extra para segurança
        const deviationX = Math.cos(perpendicularAngle) * deviationDistance;
        const deviationY = Math.sin(perpendicularAngle) * deviationDistance;
        
        // Calcular o outro ponto de desvio (lado oposto)
        const oppositeAngle = perpendicularAngle + Math.PI;
        const oppositeDeviationX = Math.cos(oppositeAngle) * deviationDistance;
        const oppositeDeviationY = Math.sin(oppositeAngle) * deviationDistance;
        
        // Calcular distâncias para escolher o melhor desvio
        const deviationToTarget = Math.sqrt((targetX - deviationX) ** 2 + (targetY - deviationY) ** 2);
        const oppositeDeviationToTarget = Math.sqrt((targetX - oppositeDeviationX) ** 2 + (targetY - oppositeDeviationY) ** 2);
        const startToTarget = Math.sqrt((targetX - startX) ** 2 + (targetY - startY) ** 2);
        
        // Escolher o ponto de desvio mais eficiente
        let finalDeviationX, finalDeviationY;
        if (deviationToTarget < oppositeDeviationToTarget) {
            finalDeviationX = deviationX;
            finalDeviationY = deviationY;
        } else {
            finalDeviationX = oppositeDeviationX;
            finalDeviationY = oppositeDeviationY;
        }
        
        return {
            type: 'deviated',
            waypoints: [
                { x: finalDeviationX, y: finalDeviationY }
            ]
        };
    }
    
    // Se não há risco, trajetória direta
    return { type: 'direct' };
}

// Função para navegar para coordenadas específicas
function navigate() {
    const input = document.getElementById('coordinateInput');
    const coords = input.value.replace(/[()]/g, '').split(',').map(s => s.trim());
    
    if (coords.length === 2) {
        const x = parseInt(coords[0]);
        const y = parseInt(coords[1]);
        
        if (isFinite(x) && isFinite(y)) {
            // Inverter Y para manter consistência com o sistema interno
            const invertedY = -y;
            
            // Verificar se as coordenadas estão dentro do Sol (raio = 200)
            const distanceFromSun = Math.sqrt(x * x + invertedY * invertedY);
            if (distanceFromSun <= 400) {
                document.getElementById('message').textContent = 'Não é possível navegar para dentro do Sol!';
                document.getElementById('message').className = 'error';
                return;
            }
            
            if (x >= minCameraX && x <= maxCameraX && invertedY >= minCameraY && invertedY <= maxCameraY) {
                // Calcular trajetória segura
                const safePath = calculateSafePath(astronaut.x, astronaut.y, x, invertedY);
                
                astronaut.targetX = x;
                astronaut.targetY = invertedY;
                astronaut.moving = true;
                astronaut.waypoints = safePath.type === 'deviated' ? safePath.waypoints : [];
                astronaut.currentWaypoint = 0;
                
                if (safePath.type === 'deviated') {
                    document.getElementById('message').textContent = `Navegando para (${x}, ${y})... (rota segura)`;
                } else {
                    document.getElementById('message').textContent = `Navegando para (${x}, ${y})...`;
                }
                document.getElementById('message').className = 'message';
                
                // Limpar a caixa de texto após iniciar a navegação
                input.value = '';
            } else {
                document.getElementById('message').textContent = 'Coordenadas fora dos limites permitidos!';
                document.getElementById('message').className = 'error';
            }
        } else {
            document.getElementById('message').textContent = 'Digite coordenadas válidas!';
            document.getElementById('message').className = 'error';
        }
    } else {
        document.getElementById('message').textContent = 'Digite coordenadas no formato (x, y)!';
        document.getElementById('message').className = 'error';
    }
}

// Função para atualizar posição da astronauta
function updateAstronaut() {
    if (astronaut.moving && astronaut.targetX !== null && astronaut.targetY !== null) {
        let currentTargetX = astronaut.targetX;
        let currentTargetY = astronaut.targetY;
        
        // Se há waypoints, usar o próximo waypoint como destino atual
        if (astronaut.waypoints && astronaut.waypoints.length > 0 && astronaut.currentWaypoint < astronaut.waypoints.length) {
            const waypoint = astronaut.waypoints[astronaut.currentWaypoint];
            currentTargetX = waypoint.x;
            currentTargetY = waypoint.y;
        }
        
        const dx = currentTargetX - astronaut.x;
        const dy = currentTargetY - astronaut.y;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);
        
        if (distance > 2) {
            astronaut.x += (dx / distance) * 3;
            astronaut.y += (dy / distance) * 3;
        } else {
            // Chegou ao waypoint atual
            if (astronaut.waypoints && astronaut.currentWaypoint < astronaut.waypoints.length) {
                // Ir para o próximo waypoint
                astronaut.currentWaypoint++;
                if (astronaut.currentWaypoint >= astronaut.waypoints.length) {
                    // Todos os waypoints completados, ir para o destino final
                    astronaut.waypoints = [];
                    astronaut.currentWaypoint = 0;
                }
            } else {
                // Chegou ao destino final
                astronaut.x = Math.round(astronaut.targetX);
                astronaut.y = Math.round(astronaut.targetY);
                astronaut.moving = false;
                astronaut.targetX = null;
                astronaut.targetY = null;
                astronaut.waypoints = [];
                astronaut.currentWaypoint = 0;
                document.getElementById('message').textContent = 'Chegou ao destino!';
            }
        }
    }
    
    // Exibir Y invertido para manter consistência visual
    document.getElementById('position').textContent = `(${Math.round(astronaut.x)}, ${Math.round(-astronaut.y)})`;
}
