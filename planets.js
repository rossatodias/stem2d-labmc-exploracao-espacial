// Controle para evitar mensagens repetidas
let lastPlanetMessage = null;

// Dados dos planetas com órbitas circulares distribuídas nos 4 quadrantes cartesianos
// 1º quadrante (superior direito): x>0, y>0
// 2º quadrante (superior esquerdo): x<0, y>0  
// 3º quadrante (inferior esquerdo): x<0, y<0
// 4º quadrante (inferior direito): x>0, y<0
const planets = [
    { name: 'Mercúrio', distance: 600, angle: Math.PI/2, color: '#A9A9A9', size: 8, visited: false, 
      message: 'Olá, terráqueo! Bem-vindo ao planeta mais próximo do Sol. Aqui o ano dura só 88 dias!' },
    { name: 'Vênus', distance: 610, angle: 3*Math.PI/2, color: '#FF8C00', size: 12, visited: false,
      message: 'Saudações! Vênus é o planeta mais quente do sistema solar, sua temperatura chega a 470°C. Cuidado com a temperatura!' },
    { name: 'Terra', distance: 622, angle: Math.PI/4, color: '#0000FF', size: 13, visited: false,
      message: 'Bem-vindo de volta à Terra! Nosso planeta azul é único no universo. É o único planeta conhecido que abriga vida… até agora!' },
    { name: 'Marte', distance: 636, angle: 3*Math.PI/4, color: '#FF4500', size: 10, visited: false,
      message: 'Olá, explorador! Marte é conhecido como o planeta vermelho porque sua superfície tem muito ferro enferrujado. Quem sabe um dia será nossa nova casa?' },
    { name: 'Júpiter', distance: 750, angle: 5*Math.PI/4, color: '#FFA500', size: 45, visited: false,
      message: 'Bem-vindo ao gigante gasoso! Júpiter é o maior planeta do sistema solar, tão gigante que caberiam 1.300 Terras dentro dele!.' },
    { name: 'Saturno', distance: 877, angle: 7*Math.PI/4, color: '#FFD700', size: 38, visited: false,
      message: 'Saudações! Admire os anéis de Saturno, formados por gelo e pedaços de rocha que giram ao seu redor, são únicos no sistema solar!' },
    { name: 'Urano', distance: 1170, angle: 2*Math.PI, color: '#ADD8E6', size: 32, visited: false,
      message: 'Olá! Urano é um gigante de gelo, conhecido por sua inclinação lateral. Seu eixo de rotação é tão inclinado que ele parece estar deitado.' },
    { name: 'Netuno', distance: 1500, angle: Math.PI, color: '#4169E1', size: 31, visited: false,
      message: 'Bem-vindo a Netuno! O planeta mais distante e ventoso do nosso sistema solar. São ventos incrivelmente rápidos, que podem chegar a 2.100 km/h!' }
];

// Função para calcular posição orbital dos planetas
function getPlanetPosition(planet) {
    const x = Math.cos(planet.angle) * planet.distance;
    const y = -Math.sin(planet.angle) * planet.distance; // Inverter Y para que negativos fiquem embaixo
    return { x, y };
}

// Função para obter posição da Terra
function getEarthPosition() {
    const earth = planets.find(p => p.name === 'Terra');
    if (earth) {
        return getPlanetPosition(earth);
    }
    // Fallback caso a Terra não seja encontrada
    return { x: 440, y: -440 };
}

// Função para verificar colisão com planetas
function checkPlanetCollision() {
    planets.forEach(planet => {
        const position = getPlanetPosition(planet);
        const distance = Math.sqrt((astronaut.x - position.x) ** 2 + (astronaut.y - position.y) ** 2);
        if (distance < planet.size) {
            // Marcar como visitado apenas na primeira vez
            if (!planet.visited) {
                planet.visited = true;
                updatePlanetList();
            }
            // Mostrar mensagem apenas se não for a mesma do último planeta visitado
            if (lastPlanetMessage !== planet.name) {
                lastPlanetMessage = planet.name;
                showDialog(planet.name, planet.message);
            }
        } else {
            // Resetar controle quando sair do planeta
            if (lastPlanetMessage === planet.name) {
                lastPlanetMessage = null;
            }
        }
    });
}

// Função para atualizar lista de planetas na UI
function updatePlanetList() {
    const list = document.getElementById('planetList');
    list.innerHTML = '';
    
    planets.forEach(planet => {
        const position = getPlanetPosition(planet);
        const item = document.createElement('div');
        item.className = `planet-item ${planet.visited ? 'planet-visited' : 'planet-unvisited'}`;
        
        const planetInfo = document.createElement('span');
        // Exibir Y invertido no menu para manter consistência visual
        if (showPlanetCoordinates) {
            planetInfo.textContent = `${planet.visited ? '✓' : '○'} ${planet.name} (${Math.round(position.x)}, ${Math.round(-position.y)})`;
        } else {
            planetInfo.textContent = `${planet.visited ? '✓' : '○'} ${planet.name}`;
        }
        
        const centerButton = document.createElement('button');
        centerButton.className = 'secondary-button';
        centerButton.textContent = '🎯';
        centerButton.style.padding = '2px 6px';
        centerButton.style.fontSize = '0.8em';
        centerButton.onclick = () => centerOnPlanet(planet.name);
        
        item.appendChild(planetInfo);
        item.appendChild(centerButton);
        list.appendChild(item);
    });
}
