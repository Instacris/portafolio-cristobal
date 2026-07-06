# Portafolio de Cristóbal — Cyberpunk / Pixel Art

Portafolio personal (HTML + CSS + JavaScript, **sin frameworks ni build**).
Estética cyberpunk con pixel art: negro y rojo, fondo de "hacking" estilo matrix
(blanco / azul / rojo) y cursor personalizado.

## Páginas
- **index.html** — perfil: inicio, skills, experiencia y contacto.
- **proyectos.html** — "Contrabandos": proyectos con vista previa y enlace en vivo.

## Funciones especiales
- **Pantalla de acceso** tipo expediente ("EXPEDIENTE 4444") antes de entrar al portafolio.
- **Menú lateral desplegable** a la izquierda (botón ☰ arriba a la izquierda).
- **Texto corrompido**: títulos y menú se ven en katakana/ilegible y se *decodifican*
  una sola vez al entrar en pantalla o al pasar el cursor (luego quedan en español).
- **Experiencia bloqueada**: cada empresa aparece encriptada; al hacer clic en
  **DESCIFRAR** corre una carga ("DESBLOQUEANDO INFORMACIÓN") y se revela el texto.
- **Cursor retícula**: una mira HUD sutil sigue al mouse, se agranda sobre elementos
  interactivos y emite un pequeño "ping" al hacer clic.
- **Lenguajes**: anillos HUD radiales con carga animada (en vez de barras).
- **Excel**: panel con logo real (`img/excel.png`) y checklist de habilidades.
- **Laterales (rails)**: telemetría y rastreo del puntero, solo en pantallas anchas (PC).

## Cómo editar tu información
Casi todo el contenido vive en **`js/data.js`**:

- `LENGUAJES` — nombre y nivel (%) de cada lenguaje (anillos).
- `EXCEL_SKILLS` — lista de habilidades de Excel (checklist).
- `EXPERIENCIA` — tus trabajos (cargo, empresa, fecha, descripción, tags).
- `PROYECTOS` — proyectos de la página *Contrabandos* (nombre, descripción,
  `img` de la vista previa, `link` real y tags).
- `CONTACTO` — nombre, rol, email, ubicación, GitHub y LinkedIn.

### Foto de perfil
`img/fotoperfil.jpg` — se muestra en el marco del hero. Si no existe, se ve un
avatar pixel-art de respaldo (`img/avatar-pixel.svg`).

### Logo de Excel
`img/excel.png` — ícono real usado en el panel de Excel (`js/data.js` → `excelIcon()`).

### Capturas de los proyectos
Cada proyecto en `PROYECTOS` (`js/data.js`) apunta a su propia imagen real en `img/`
(por ejemplo `img/gestorAdmin.png`, `img/ArcadeBar.png`, etc.). Si un archivo no
existe, se muestra `img/proyecto-placeholder.svg` automáticamente.

## Estructura
```
index.html            Perfil
proyectos.html        Página de proyectos / contrabandos
css/
  variables.css       Colores, fuentes y tokens
  styles.css          Layout, menú, hero, skills, experiencia, contacto, proyectos, rails
  animations.css      Glitch, eléctrico, keyframes y reveals
  responsive.css      Tablet y teléfono
js/
  data.js             ← edita aquí tu información (skills, excel, experiencia, proyectos)
  scramble.js          Motor de texto corrompido / decodificación (una sola vez)
  intro.js             Pantalla de acceso previa al portafolio
  ui.js                Menú lateral, scramble por viewport/hover, reveals (ambas páginas)
  main.js               (index) render, typing, anillos de lenguaje, desbloqueo de experiencia
  proyectos.js          (proyectos) render de las tarjetas de proyecto
  rails.js              Laterales decorativos (telemetría / rastreo del puntero)
  background.js         Lluvia de "hacking" (matrix) en canvas
  cursor.js             Cursor: retícula HUD + ping de clic
img/
  fotoperfil.jpg        Foto de perfil (hero)
  excel.png             Logo del panel de Excel
  avatar-pixel.svg       Placeholder si falta la foto
  proyecto-placeholder.svg  Placeholder de captura de proyecto
  (capturas reales de cada proyecto: gestorAdmin.png, GestorBodega.png,
   ArcadeBar.png, Superpan.png, hospital.png, Planetario.png)
```

## Ver en local
Sitio estático: abre `index.html` en el navegador, o usa el servidor configurado
en `.claude/launch.json` (perfil **web**, PowerShell, puerto 5599).

## Personalización rápida
- **Colores:** `css/variables.css` (`--red`, `--bg`, etc.).
- **Tu nombre:** `index.html` (hero, footer) y `js/data.js`.
- **Palabras del typing:** atributo `data-words` del `#type` en `index.html`.
- **Texto del menú / corrupción:** cada enlace usa `data-text` en `index.html`.
