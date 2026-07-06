/* ============================================================
   UI · Compartido entre páginas
   - Drawer lateral izquierdo (desplegable)
   - Decodificación de scramble por campo de visión / hover
   - Reveals al hacer scroll · año del footer
   ============================================================ */
(function () {
  "use strict";

  /* --- Inicializa todos los textos scramble --- */
  document.querySelectorAll(".scramble").forEach(function (el) { window.Scramble.make(el); });

  /* --- .scramble.obs : se decodifica UNA sola vez al entrar en vista y
         se queda en español (ya no se vuelve a corromper) --- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      window.Scramble.setVisible(e.target, true);
      window.Scramble.decode(e.target, 900);
      io.unobserve(e.target);
    });
  }, { threshold: 0.35 });
  document.querySelectorAll(".scramble.obs").forEach(function (el) { io.observe(el); });

  /* --- .scramble.flick : solo parpadea cuando es visible (no auto-decodifica; ej. experiencia bloqueada) --- */
  var fio = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { window.Scramble.setVisible(e.target, e.isIntersecting); });
  }, { threshold: 0.2 });
  document.querySelectorAll(".scramble.flick").forEach(function (el) { fio.observe(el); });

  /* --- .scramble.hov : decodifica al pasar el cursor --- */
  document.querySelectorAll(".scramble.hov").forEach(function (el) {
    el.addEventListener("mouseenter", function () { window.Scramble.decode(el, 420); });
  });

  /* --- Drawer lateral --- */
  var toggle = document.getElementById("menu-toggle");
  var drawer = document.getElementById("drawer");
  var backdrop = document.getElementById("drawer-backdrop");
  var items = drawer ? drawer.querySelectorAll(".scramble") : [];

  var navRevealed = false;
  function openDrawer() {
    drawer.classList.add("open");
    toggle.classList.add("open");
    backdrop.classList.add("show");
    drawer.setAttribute("aria-hidden", "false");
    // Solo la PRIMERA vez: texto corrompido y luego revelado (escalonado).
    // Después se queda en español al reabrir el menú.
    if (!navRevealed) {
      navRevealed = true;
      items.forEach(function (el, i) {
        window.Scramble.setVisible(el, true);
        window.Scramble.corrupt(el);
        setTimeout(function () { window.Scramble.decode(el, 1400); }, 300 + i * 90);
      });
    }
  }
  function closeDrawer() {
    drawer.classList.remove("open");
    toggle.classList.remove("open");
    backdrop.classList.remove("show");
    drawer.setAttribute("aria-hidden", "true");
    // Ya no se corrompen al cerrar.
  }
  if (toggle && drawer) {
    toggle.addEventListener("click", function () {
      drawer.classList.contains("open") ? closeDrawer() : openDrawer();
    });
  }
  if (backdrop) backdrop.addEventListener("click", closeDrawer);
  if (drawer) drawer.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeDrawer); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && drawer && drawer.classList.contains("open")) closeDrawer(); });

  /* --- Reveals genéricos --- */
  var rio = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); rio.unobserve(e.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal, .reveal-l, .reveal-r").forEach(function (el) { rio.observe(el); });

  /* --- Año --- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
