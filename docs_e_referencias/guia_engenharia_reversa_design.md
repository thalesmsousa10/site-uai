# 🏛️ Guia de Engenharia Reversa de Design & Layout: Academia Lendár[IA]

Este documento é a **bíblia técnica e visual** para construir um novo site para uma empresa de IA com o mesmo calibre estético, fluidez e impacto do benchmark [Academia Lendária](https://www.academialendaria.ai).

Os arquivos complementares já gerados no seu workspace:
- 🎨 [design_tokens.css](file:///Users/machado/Documents/U.AI/Site%20UAI/Novo%20Site/design_tokens.css) — Tokens CSS, paleta de cores, tipografia, efeitos de luz, botões e keyframes.
- 📦 [academia_lendaria_scraping.json](file:///Users/machado/Documents/U.AI/Site%20UAI/Novo%20Site/academia_lendaria_scraping.json) — Dados brutos estruturados.
- 📑 [academia_lendaria_dossie.md](file:///Users/machado/Documents/U.AI/Site%20UAI/Novo%20Site/academia_lendaria_dossie.md) — Dossiê de negócios, copy e produtos.

---

## 1. Stack Tecnológico & Performance

| Elemento | Escolha do Site Original | Por que funciona e como replicar |
| :--- | :--- | :--- |
| **Framework Base** | Next.js (App Router) + Turbopack | Renderização híbrida ultra-rápida, SEO com meta-tags perfeitas. Pode ser feito com Next.js, Vite ou HTML/CSS vanilla puro. |
| **Estilização** | **CSS Modules + Tailwind CSS** | Evita dependências pesadas de bibliotecas de animação de terceiros. |
| **Engine de Animação** | **Pure CSS Keyframes + Intersection Observer** | **Descoberta crítica:** Eles não usam Three.js ou GSAP pesado na Home! Tudo é feito com `@keyframes` acelerados por hardware (`transform`, `opacity`, `mask-image`), garantindo 60fps até no celular e LCP < 1.0s. |
| **Hospedagem & CDN** | Cloudflare / Vercel | Cache de assets estáticos e streaming de vídeo otimizado. |

---

## 2. O Segredo da Identidade Visual: *Editorial Dark Luxury*

A maioria dos sites de IA comete o erro de usar o estilo clichê "Cyberpunk neon azul e roxo". A Academia Lendária se destaca porque usa uma abordagem **Editorial de Luxo** inspirada em revistas de alta costura e publicações financeiras premium combinadas com tecnologia.

### A Tripla Tipografia (Font Pairing)
1. **Display / Luxo**: `Instrument Serif` (Google Fonts)
   - Uso: Palavras-chave dos títulos sempre em itálico (`font-style: italic; font-weight: 400`).
   - Efeito: Quebra a monotonia da fonte técnica e traz autoridade e sofisticação intelectual.
2. **Interface / Corpo**: `Inter Tight` (Google Fonts)
   - Uso: Títulos principais em caixa alta/baixa com tracking negativo (`letter-spacing: -0.045em`) e textos de apoio com peso leve (`font-weight: 300`).
3. **Técnica / HUD / Código**: `JetBrains Mono` ou `SF Mono`
   - Uso: Eyebrows, pills no topo de seções, métricas de estatísticas, tags e datas.

### Paleta de Cores e Tokens HSL/Hex
* **Fundo Profundo**: `#070709` (Preto azulado quase absoluto).
* **Superfícies & Cartões**: `rgba(255, 255, 255, 0.03)` com borda fina de `rgba(255, 255, 255, 0.08)`.
* **Texto Primário**: `#edebe6` (Off-white levemente aquecido, sem o contraste agressivo do branco puro).
* **Ouro Champanhe (Acento Nobre)**:
  - Base: `#c9b298`
  - Brilho / Hover: `#e4d8ca`
  - Bronze / Tom Médio: `#8d7556`
  - Glow sutil: `rgba(201, 178, 152, 0.25)`

### O Grande Contraste Dramático (Transição de Tema no Meio da Página)
Enquanto 90% do site é **Dark Mode**, ao chegar na seção do **Manifesto**, o fundo transiciona repentinamente para um tom de **papel artesanal / marfim editorial** (`#f3eee6` com degradê para `#e8e1d3`), criando uma pausa visual dramática para leitura pausada.

---

## 3. Anatomia de Todas as Seções do Layout

### Seção 1: Navbar Flutuante (`V3Nav`)
- **Layout**: Container centralizado com `max-width: 1280px`, fixo no topo com `backdrop-filter: blur(12px)` e fundo translúcido `rgba(7, 7, 9, 0.7)`.
- **Marca**: Tipografia limpa com colchete colorido característico: `Lendár[IA]`. O `[IA]` é em ouro (`#c9b298`).
- **Navegação**: Links sutis com `color: rgba(237, 235, 230, 0.6)` que iluminam no hover.
- **CTAs**: Botão discreto de *Login* + Botão em pílula com borda dourada.

---

### Seção 2: Hero Section com Efeito Nebulosa / Aurora (`V3Hero`)
- **Altura**: `min-height: 90vh` a `100vh`.
- **Efeito Aurora de Fundo**:
  - 3 esferas ovais sobrepostas com `filter: blur(100px)` e `border-radius: 50%`.
  - Gradiente radial dourado e bronze (`#c9b2984d` e `#8b755659`).
  - Animadas por CSS com durações diferentes (22s, 28s, 18s) com movimento orgânico (`auroraDrift`), criando uma luz viva que respira sem sobrecarregar a CPU.
- **Camada de Vinheta**: Máscara radial de escurecimento (`#06060ad9`) que deixa as bordas escuras e o centro suave.
- **Eyebrow Tag**: Pílula translúcida com borda fina e um ponto pulsante verde/ouro (`livePulse`).
- **Título Hero**:
  - Escala fluida: `font-size: clamp(2.5rem, 7.2vw, 6.2rem)`.
  - Contraste: Linha em sans-serif moderno misturada com uma linha em `Instrument Serif Italic` dourada.
- **Botões de Ação**:
  - **Botão Primário**: Dourado com texto preto, sombra quente e efeito **shimmer** (feixe de luz branco translúcido que cruza o botão da esquerda para a direita no hover).
  - **Botão Ghost**: Vidro fosco (`backdrop-filter: blur(10px)`), fundo translúcido e borda sutil.
- **Barra de Métricas**: Linha horizontal dividida com traços finos contendo números em `JetBrains Mono` e legenda curta.
- **Scroll Indicator**: Linha vertical minimalista na base que oscila sutilmente para baixo.

---

### Seção 3: Trust Ticker / Carrossel Infinito de Autoridade (`V3Trust`)
- Faixa horizontal contínua com texto em caixa alta e bullets dourados separando os pontos de autoridade.
- Animação linear infinita em loop contínuo (`transform: translateX`).

---

### Seção 4: Manifesto com Efeito "Karaoke" no Scroll (`V3Manifesto`)
- **Estética**: Bloco no tom creme/papel (`#f3eee6`), com grid de micro-pontos sutis no fundo (`radial-gradient(circle at 1px 1px, #1a17120f 1px, transparent 0)`).
- **Mecânica do Efeito Karaoke**:
  - Cada palavra do manifesto é renderizada dentro de um `<span class="karaoke-word">`.
  - Estado inicial: `opacity: 0.18; transition: opacity 0.4s ease;`.
  - Conforme o usuário rola a página, um `IntersectionObserver` ou listener de scroll injeta a classe `.active`, elevando a opacidade da palavra para `1.0`.
  - Frases de maior impacto recebem a fonte `Instrument Serif` em tom bronze (`#8d7556`).

---

### Seção 5: Bento Grid — Por Que Existimos (`V3Why`)
- **Grid CSS**: `grid-template-columns: repeat(6, 1fr); gap: 16px;`.
- **Hierarquia dos Cards**:
  - Card Grande: Ocupa `grid-column: span 4`.
  - Card Médio: Ocupa `grid-column: span 2`.
  - No mobile: Todos viram `grid-column: span 6`.
- **Efeitos nos Cards do Bento**:
  - **Card Órbita**: Sistema de anéis concêntricos giratórios em CSS com pequenos pontos simulando planetas/agentes ao redor do núcleo (`orbitSpin 360deg`).
  - **Card Rede Neural**: Linhas conectadas com nós brilhantes piscando em sincronia (`netPulse`).
  - **Card Globo Conectado**: Coordenadas globais com pulsos iluminando pontos de cidades no mundo.

---

### Seção 6: Vitrine Editorial de Programas / Serviços (`V3Programs`)
- Diferente de cards tradicionais lado a lado, utiliza uma **lista horizontal empilhada (Row Stack)**.
- **Linha de Serviço**:
  - Coluna 1: Número editorial grande (`01`, `02`, `03`) com traço horizontal que expande no hover de 40px para 80px.
  - Coluna 2: Tags de status (ex: `ALWAYS-ON`, `4 SEMANAS`, `AVANÇADO`), Título em destaque, Descrição concisa e pílulas mono com os entregáveis.
  - Coluna 3: Botão circular com seta indicativa (`width: 40px; height: 40px; border-radius: 50%`) que no hover ganha fundo dourado e gira levemente (`rotate(-5deg)`).
- **Hover na Linha**: A linha inteira se desloca suavemente para a direita (`padding-left: 24px;`) e recebe um feixe dourado sutil de fundo.
- **Card Premium em Destaque**: O programa de maior valor possui um gradiente dourado sutil permanente (`background: linear-gradient(90deg, rgba(201,178,152,0.06), transparent)`).

---

### Seção 7: Mural de Provas Sociais com Scroll Infinito Duplo (`V3Proofs`)
- **Mural Vertical Dinâmico (The Wall)**:
  - 3 colunas de cards de depoimentos e prints reais.
  - **Altura Fixa**: `height: 520px` com `overflow: hidden`.
  - **Efeito de Fading Suave**: Usa a propriedade moderna `mask-image`:
    ```css
    mask-image: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);
    ```
    Isso faz os cards aparecerem do nada no topo e desaparecerem no rodapé de forma mágica, sem cortes secos.
  - **Movimento Alternado**:
    - Coluna 1: Rola para CIMA infinitamente (`wallUp`, 90s).
    - Coluna 2: Rola para BAIXO infinitamente (`wallDown`, 95s).
    - Coluna 3: Rola para CIMA infinitamente (`wallUp`, 85s).
  - **Pausa Interativa**: Ao passar o mouse por cima (`:hover`), a animação pausa instantaneamente para permitir a leitura.

---

### Seção 8: Mapa de Hubs & Constelação Global (`V3Hubs`)
- **Fundo**: Malha geométrica em SVG simulando constelações e conexões aéreas sobre o globo.
- **Destaque do Evento / Imersão**: Card horizontal largo com detalhes de encontros presenciais e imersão no Vale do Silício, com datas e badges de status.

---

### Seção 9: Founder com Frame Sci-Fi / HUD (`V3Founder`)
- **Vídeo em Loop Silencioso**: Em vez de uma foto estática, o fundador aparece em um vídeo portrait curto (`/alan.mp4`), com `autoplay loop muted playsinline`.
- **Cantos HUD (Corner Brackets)**:
  - 4 pequenos colchetes angulares posicionados nas 4 quinas da moldura do vídeo:
  ```css
  .hud-corner-tl { top: 8px; left: 8px; border-width: 2px 0 0 2px; }
  .hud-corner-tr { top: 8px; right: 8px; border-width: 2px 2px 0 0; }
  .hud-corner-bl { bottom: 8px; left: 8px; border-width: 0 0 2px 2px; }
  .hud-corner-br { bottom: 8px; right: 8px; border-width: 0 2px 2px 0; }
  ```
- **Texto Lateral**: Histórico do fundador, visão, credenciais de impacto e assinatura mono.

---

### Seção 10: Call to Action (Newsletter / Captura) & Footer (`V3Newsletter`)
- Moldura com gradiente perimetral dourado fino.
- Campo de input integrado ao botão de submit com feedback visual.
- Rodapé completo com colunas de navegação em grid limpo, disclaimer legal com CNPJ e links de termos.

---

## 4. Como Construir o Site da Sua Empresa de IA

Para criar um site com o mesmo impacto visual, siga esta receita direta:

1. **Importe as Fontes**:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
   ```
2. **Conecte o arquivo de estilos**:
   Utilize diretamente o arquivo que criei para você: [`design_tokens.css`](file:///Users/machado/Documents/U.AI/Site%20UAI/Novo%20Site/design_tokens.css).
3. **Substitua a Narrativa para a sua Empresa**:
   - Onde eles usam "15k empresários construindo com IA", use as métricas da sua empresa de IA (horas economizadas, agentes em produção, empresas atendidas).
   - Nos 3 programas, adapte para a sua esteira de serviços (ex: Consultoria Estratégica, Desenvolvimento de Agentes Customizados, Plataforma SaaS ou Squads Gerenciados).
   - Mantenha o contraste do **Manifesto** (tema papel/creme) para expor a tese e filosofia da sua marca.
   - Utilize vídeos ou animações em loop com os cantos HUD no seu bloco institucional.
