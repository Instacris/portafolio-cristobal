/* ============================================================
   DATA · Edita aquí tu información (skills, office, experiencia)
   Los íconos son SVG pixel-art en línea. Cambia textos y niveles.
   ============================================================ */

/* --- Mini-íconos pixel art (16x16 escalados) --- */
function px(cells, color) {
  // cells: array de "x,y" encendidos en grilla 8x8
  const r = 2; let rects = "";
  cells.forEach(c => { const [x, y] = c.split(",").map(Number); rects += `<rect x="${x*r}" y="${y*r}" width="${r}" height="${r}"/>`; });
  return `<svg viewBox="0 0 16 16" fill="${color}" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">${rects}</svg>`;
}

/* Ícono genérico de "chip/código" pixel para lenguajes */
function chip(letter, color) {
  return `<svg viewBox="0 0 16 16" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="12" height="12" fill="#0a0a12" stroke="${color}" stroke-width="1.4"/>
    <text x="8" y="11.5" font-family="'Press Start 2P',monospace" font-size="6" fill="${color}" text-anchor="middle">${letter}</text>
  </svg>`;
}

/* --- LENGUAJES DE PROGRAMACIÓN (edita nombre / nivel %) --- */
const LENGUAJES = [
  { name: "JavaScript", level: 90, icon: chip("JS", "#ffd23f") },
  { name: "HTML5",      level: 95, icon: chip("&lt;&gt;", "#ff5a3c") },
  { name: "CSS3",       level: 90, icon: chip("#", "#3fb0ff") },
  { name: "Python",     level: 80, icon: chip("Py", "#4cd964") },
  { name: "Java",       level: 70, icon: chip("J", "#ff8c42") },
  { name: "SQL",        level: 75, icon: chip("DB", "#ff2d55") },
];

/* --- HERRAMIENTAS DE TRABAJO (edita nombre / descripción / etiqueta) --- */
const HERRAMIENTAS = [
  { name: "VS Code",       desc: "Editor principal · terminal y debugging integrados", tag: "EDITOR",    icon: chip("VS", "#22a6f2") },
  { name: "Git & GitHub",  desc: "Control de versiones · repos públicos y colaboración", tag: "VERSIONES", icon: chip("G", "#f4511e") },
  { name: "Node.js",       desc: "Servidores, APIs y automatizaciones con npm", tag: "BACKEND",  icon: chip("N", "#6cc24a") },
  { name: "Vercel",        desc: "Despliegue y hosting de todos mis proyectos", tag: "DEPLOY",   icon: chip("▲", "#f3f4f8") },
  { name: "Bases de datos", desc: "Postgres (Neon) · Redis · modelado y consultas SQL", tag: "DATOS",   icon: chip("DB", "#b46bff") },
  { name: "IA aplicada",   desc: "Asistentes de IA para acelerar desarrollo y pruebas", tag: "BOOST",    icon: chip("AI", "#19ff7a") },
];

/* --- EXCEL: habilidades concretas (lo que más piden en empresas) ---
   Edita esta lista con lo que realmente sabes hacer. --- */
const EXCEL_SKILLS = [
  "Tablas dinámicas",
  "BUSCARV / BUSCARX",
  "Funciones SI, SUMAR.SI y CONTAR.SI",
  "Power Query (limpieza y transformación de datos)",
  "Macros básicas (VBA)",
  "Formato condicional y validación de datos",
  "Gráficos y dashboards dinámicos",
];

/* Ícono del panel de Excel (imagen real en img/excel.png) */
function excelIcon() {
  return `<img src="img/excel.png" alt="Excel" />`;
}

/* --- EXPERIENCIA LABORAL (edita / agrega tus trabajos) --- */
const EXPERIENCIA = [
  {
    role: "Analista Acreditacion",
    company: "Liderman",
    date: "2025 — 2025",
    desc: "En esta empresa se dedico a revisar documentacion empresa y de trabajadores de clientes externos, con la funcion de que estos tengan los papeles al dia",
    tags: ["Excel", "Apps_priv_clientes", "Outlook"],
  },
  {
    role: "Operario R/F",
    company: "Natura",
    date: "2023 — 2025",
    desc: "En esta empresa se cumplio el rol de buscar por sistema y fisicamente cajas y productos para pickeadores, realizando movimientos por sistema y cargarlos con radio frecuencia segun la instalacion de trabajo solicitada",
    tags: ["Radio_Frencuencia", "Excel", "SAP"],
  },
  {
    role: "Ayudante Soldador",
    company: "Rompeltiem (BOCH)",
    date: "2022 — 2023",
    desc: "Empresa dedicada a crear calderas, hacerles mantencion y realizar pruebas, funciones a realizar es conocimiento con galleta, herramientas, movilizacion y transporte.",
    tags: ["Aprendizaje", "Equipo"],
  },
];

/* --- Datos de contacto del bloque terminal --- */
const CONTACTO = {
  nombre: "Cristóbal",
  rol: "Desarrollador - Analista",
  email: "cristobal.chacon2003@gmail.com",
  ubicacion: "Chile",
  github: "https://github.com/Instacris",
  linkedin: "https://www.linkedin.com/",
};

/* --- PROYECTOS / "CONTRABANDOS" (página proyectos.html) ---
   img: captura previa de la página (guárdala en img/ con ese nombre exacto).
   link: URL real del proyecto (se abre en otra pestaña). --- */
const PROYECTOS = [
  {
    name: "Brasa Burger · Hamburguesería",
    desc: "Sitio para una hamburguesería artesanal: portada con hamburguesas animadas que rotan cada 3 segundos, carta digital ilustrada con assets propios (burgers, malteadas, cafés), reserva de mesa y pedidos a domicilio por WhatsApp.",
    img: "img/BrasaBurger.png",
    link: "https://brasa-burger-alpha.vercel.app",
    tags: ["HTML", "CSS", "JavaScript", "SVG"],
  },
  {
    name: "Overdrive · Tienda de Cosplay",
    desc: "Tienda temática (asesino de Scream) con DOS perfiles: vista de cliente (catálogo con ofertas y stock en tiempo real, selección de productos y contacto por WhatsApp) y panel administrativo para gestionar productos, precios, ofertas, stock y mensajes. Con base de datos real en la nube.",
    img: "img/overdrive.png",
    link: "https://overdrive-woad.vercel.app/demo",
    tags: ["JavaScript", "API Serverless", "Redis", "Admin"],
  },
  {
    name: "Pixel Restaurant · Arcade Bar",
    desc: "Carta virtual con temática pixel art para un bar arcade: categorías, fichas de platos con ingredientes, animaciones y carrito de pedidos.",
    img: "img/ArcadeBar.png",
    link: "https://pixel-restaurant.vercel.app",
    tags: ["React", "Vite", "Tailwind"],
  },
  {
    name: "Plantel · Gestión de Personal",
    desc: "App de RR.HH. para administrar personal: contratos, horarios y nómina. Con base de datos real (Neon Postgres), API serverless y autenticación JWT.",
    img: "img/gestorAdmin.png",
    link: "https://plantel-gestion-personal.vercel.app",
    tags: ["JavaScript", "Postgres", "API", "JWT"],
  },
  {
    name: "Bodega · Gestión de Mercadería",
    desc: "Sistema para personal administrativo de bodega: control de vencimientos, stock, mermas, compras y cargas masivas desde Excel. Funciona sin instalación.",
    img: "img/GestorBodega.png",
    link: "https://bodega-gestion.vercel.app",
    tags: ["JavaScript", "Excel", "LocalStorage"],
  },
  {
    name: "Superpan · Amasandería",
    desc: "Sitio comercial mobile-first para una amasandería y pastelería de Quinta Normal: catálogo con filtros, pedidos por WhatsApp, SEO y panel de administración.",
    img: "img/Superpan.png",
    link: "https://superpan-web.vercel.app",
    tags: ["HTML", "CSS", "JavaScript", "SEO"],
  },
  {
    name: "Clínica Quillay",
    desc: "Landing institucional para una clínica: reserva de horas en 4 pasos con validación de RUT, buscador de especialidades, FAQ y diseño accesible.",
    img: "img/hospital.png",
    link: "https://clinica-quillay.vercel.app",
    tags: ["HTML", "CSS", "JS vanilla"],
  },
  {
    name: "Planetario Austral",
    desc: "Sitio educativo con buscador de astros, módulos de aprendizaje verificados con NASA/ESA y una zona Kids gamificada con estrellas por descubrir.",
    img: "img/Planetario.png",
    link: "https://planetario-austral.vercel.app",
    tags: ["JavaScript", "Educación", "UI/UX"],
  },
  {
    name: "Ferretería EL GALPÓN",
    desc: "Sitio catálogo para una ferretería y maquinaria: más de 190 productos con filtros por categoría, búsqueda y enfoque en precios mayoristas por volumen.",
    img: "img/ferreteria.png",
    link: "https://ferreteria-el-galpon.vercel.app",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    name: "ORIGEN · Tienda de Café",
    desc: "Tienda online de café y máquinas con carrito, checkout que descuenta stock y panel de administración completo (productos, pedidos y ajustes).",
    img: "img/origen.png",
    link: "https://origen-cafe-eta.vercel.app",
    tags: ["JavaScript", "E-commerce", "Admin"],
  },
];

/* --- Exponer en window para que main.js pueda leerlos ---
   (const a nivel de script NO crea propiedades en window) --- */
window.LENGUAJES = LENGUAJES;
window.HERRAMIENTAS = HERRAMIENTAS;
window.EXCEL_SKILLS = EXCEL_SKILLS;
window.EXPERIENCIA = EXPERIENCIA;
window.CONTACTO = CONTACTO;
window.PROYECTOS = PROYECTOS;
window.excelIcon = excelIcon;
