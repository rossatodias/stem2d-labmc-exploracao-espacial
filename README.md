# 🌌 Jogo de Exploração Espacial - Jornada pelos Planetas

Um jogo educativo interativo que simula a exploração do sistema solar usando coordenadas cartesianas. Navegue pela astronauta entre planetas, evite o Sol e descubra mensagens dos habitantes de cada mundo!

## 🎮 Sobre o Jogo

Este é um jogo educativo que combina:
- **Navegação por coordenadas cartesianas** (X, Y)
- **Exploração do sistema solar** com planetas realistas
- **Física simplificada** com trajetórias que evitam o Sol
- **Interface interativa** com zoom, pan e controles intuitivos
- **Educação astronômica** com informações sobre cada planeta

## 🚀 Como Jogar

### Controles Básicos
- **Digite coordenadas** no formato `(x, y)` para navegar
- **Use o mouse** para arrastar e mover a câmera
- **Scroll do mouse** para zoom in/out
- **Botões de zoom** (+/-) para controle preciso
- **Setas do teclado** para mover a câmera
- **Tecla Home** para centralizar no Sol

### Navegação
1. Digite coordenadas no campo de entrada (ex: `(600, 400)`)
2. Pressione Enter ou clique em "Navegar"
3. A astronauta seguirá uma trajetória segura que evita o Sol
4. Ao chegar perto de um planeta, você receberá uma mensagem do alien

### Limites do Sistema
- **Eixo X**: -1600 a +1600
- **Eixo Y**: -1000 a +1000
- **Zoom**: 30% a 200%
- **Posição inicial**: (438, -438) - próxima à Terra

## 🌍 Planetas do Sistema Solar

| Planeta | Posição Aproximada | Características |
|---------|-------------------|-----------------|
| **Mercúrio** | (0, 600) | Planeta mais próximo do Sol |
| **Vênus** | (0, -610) | Planeta mais quente |
| **Terra** | (438, -438) | Nosso planeta azul |
| **Marte** | (-448, -448) | Planeta vermelho |
| **Júpiter** | (-527, -527) | Gigante gasoso |
| **Saturno** | (621, -621) | Planeta com anéis |
| **Urano** | (827, 827) | Gigante de gelo |
| **Netuno** | (-1061, 0) | Planeta mais distante |

## 🛠️ Estrutura Técnica

### Arquitetura Modular
O código foi organizado em módulos especializados para facilitar manutenção e extensão:

```
📁 Arquivos JavaScript
├── config.js      (40 linhas)  - Configurações globais
├── planets.js     (71 linhas)  - Dados e lógica dos planetas
├── camera.js      (160 linhas) - Controles de câmera e zoom
├── astronaut.js   (184 linhas) - Lógica da astronauta e navegação
├── rendering.js   (225 linhas) - Funções de renderização
├── ui.js          (45 linhas)  - Interface e diálogos
├── input.js       (136 linhas) - Manipulação de entrada
└── game.js        (45 linhas)  - Coordenação principal
```

### Tecnologias Utilizadas
- **HTML5 Canvas** para renderização gráfica
- **JavaScript ES6+** para lógica do jogo
- **CSS3** para estilização e animações
- **Matemática vetorial** para cálculos de trajetória

## 🎯 Funcionalidades Principais

### ✅ Navegação Inteligente
- **Trajetória segura** que automaticamente evita o Sol
- **Waypoints dinâmicos** para rotas complexas
- **Validação de coordenadas** com feedback visual
- **Limites de navegação** para manter o jogador no sistema

### ✅ Sistema de Câmera
- **Zoom suave** com scroll do mouse e botões
- **Pan intuitivo** com arrastar do mouse
- **Limites de movimento** para evitar sair do mapa
- **Centralização automática** em planetas

### ✅ Interface Responsiva
- **Menu colapsável** para maximizar área de jogo
- **Lista de planetas** com status de visitação
- **Indicadores visuais** de posição e zoom
- **Mensagens contextuais** e diálogos

### ✅ Física Simplificada
- **Colisão com planetas** para ativar diálogos
- **Trajetória que evita o Sol** usando matemática vetorial
- **Movimento suave** da astronauta
- **Sistema de waypoints** para rotas complexas

## 🚀 Como Executar

### Opção 1: Abrir Diretamente
1. Baixe todos os arquivos
2. Abra `index.html` no seu navegador
3. Clique em "🚀 Iniciar Jornada"

### Opção 2: Servidor Local
```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

Acesse `http://localhost:8000` no navegador.

## 🎓 Aplicações Educacionais

### Matemática
- **Sistema de coordenadas cartesianas**
- **Vetores e trigonometria**
- **Cálculo de distâncias e ângulos**
- **Geometria espacial**

### Astronomia
- **Posições relativas dos planetas**
- **Características de cada mundo**
- **Escala do sistema solar**
- **Conceitos de órbita e gravidade**

### Programação
- **Arquitetura modular**
- **Game loop e renderização**
- **Manipulação de eventos**
- **Cálculos em tempo real**

## 🔧 Personalização

### Adicionar Novos Planetas
Edite `planets.js`:
```javascript
const planets = [
    // ... planetas existentes ...
    { 
        name: 'Plutão', 
        distance: 1800, 
        angle: Math.PI/6, 
        color: '#C0C0C0', 
        size: 5, 
        visited: false,
        message: 'Bem-vindo ao planeta anão!' 
    }
];
```

### Modificar Configurações
Edite `config.js`:
```javascript
// Limites do sistema
let minCameraX = -2000; // Aumentar área navegável
let maxCameraX = 2000;
let minCameraY = -1500;
let maxCameraY = 1500;
```

### Adicionar Novas Funcionalidades
1. Crie um novo arquivo JavaScript (ex: `scoring.js`)
2. Adicione `<script src="scoring.js"></script>` no `index.html`
3. Implemente suas funções e as chame nos módulos apropriados

### Personalizar a Astronauta
Para substituir o círculo da astronauta por uma imagem PNG:

1. **Adicione sua imagem PNG** na pasta do projeto (ex: `astronauta.png`)
2. **A imagem será carregada automaticamente** na inicialização
3. **Se a imagem não carregar**, o jogo usará o círculo padrão
4. **A astronauta rotaciona** automaticamente na direção do movimento

**Exemplo de imagem recomendada:**
- **Tamanho**: 64x64 pixels ou similar
- **Formato**: PNG com fundo transparente
- **Orientação**: Apontando para a direita (eixo X positivo)
- **Nome do arquivo**: `astronauta.png` (ou altere o caminho no código)

**Para alterar o caminho da imagem**, edite `config.js`:
```javascript
astronautImage.src = 'sua-imagem.png'; // Altere para o nome do seu arquivo
```

## 🐛 Solução de Problemas

### Problemas Comuns
- **Coordenadas inválidas**: Verifique se estão dentro dos limites (-1600 a 1600 para X, -1000 a 1000 para Y)
- **Trajetória passando pelo Sol**: O algoritmo automaticamente calcula rotas seguras
- **Performance lenta**: Reduza o zoom ou feche outros programas

### Compatibilidade
- **Navegadores modernos**: Chrome, Firefox, Safari, Edge
- **Resolução mínima**: 1024x768
- **JavaScript habilitado** obrigatório

## 📚 Recursos Adicionais

### Documentação
- **Comentários detalhados** em cada arquivo
- **Estrutura modular** bem documentada
- **Funções com nomes descritivos**

### Extensões Possíveis
- **Sistema de pontuação** baseado em planetas visitados
- **Missões específicas** com objetivos
- **Mais corpos celestes** (asteroides, cometas)
- **Modo multiplayer** para competição
- **Sistema de combustível** para maior realismo

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

---

**Desenvolvido com foco em educação e diversão!** 🌌✨

*Explore o universo, um planeta de cada vez!*
