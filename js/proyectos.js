/* ============================================================
   PROYECTOS · Render de las tarjetas de proyecto (contrabandos)
   ============================================================ */
(function () {
  "use strict";
  var grid = document.getElementById("proj-grid");
  if (!grid || !window.PROYECTOS) return;

  var fallback = "img/proyecto-placeholder.svg";

  grid.innerHTML = window.PROYECTOS.map(function (p, i) {
    var tags = (p.tags || []).map(function (t) { return "<span>" + t + "</span>"; }).join("");
    return '<article class="proj reveal d' + ((i % 3) + 1) + '">' +
      '<a class="proj-shot" href="' + p.link + '" target="_blank" rel="noopener">' +
        '<img src="' + p.img + '" alt="Vista previa de ' + p.name + '" ' +
          "onerror=\"this.onerror=null;this.src='" + fallback + "';\" />" +
        '<span class="proj-scan"></span>' +
        '<span class="proj-open">ABRIR ▸</span>' +
      "</a>" +
      '<div class="proj-body">' +
        '<h3 class="proj-name scramble obs sc-multi" data-text="' + p.name + '">' + p.name + "</h3>" +
        '<p class="proj-desc">' + p.desc + "</p>" +
        '<div class="xp-tags">' + tags + "</div>" +
        '<a class="btn" href="' + p.link + '" target="_blank" rel="noopener">' +
          '<span class="ico">↗</span> <span>Ver en vivo</span>' +
        "</a>" +
      "</div>" +
    "</article>";
  }).join("");
})();
