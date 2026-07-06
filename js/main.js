/* ============================================================
   MAIN · (solo index) Render de datos, typing, barras eléctricas
   y desbloqueo de experiencias. El drawer / scramble / reveals
   viven en ui.js.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Render: lenguajes (anillos HUD) ---------- */
  var RING_R = 27;
  var RING_C = 2 * Math.PI * RING_R;
  var langWrap = document.getElementById("lang-list");
  if (langWrap && window.LENGUAJES) {
    langWrap.innerHTML = '<div class="lang-rings">' + window.LENGUAJES.map(function (l) {
      return '<div class="lang-ring" data-level="' + l.level + '">' +
        '<div class="ring-wrap">' +
          '<svg class="ring-scan" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="31"/></svg>' +
          '<svg class="ring-svg" viewBox="0 0 64 64" aria-hidden="true">' +
            '<circle class="ring-track" cx="32" cy="32" r="' + RING_R + '"></circle>' +
            '<circle class="ring-fill" cx="32" cy="32" r="' + RING_R + '" ' +
              'style="stroke-dasharray:' + RING_C + ';stroke-dashoffset:' + RING_C + '"></circle>' +
          "</svg>" +
          '<div class="ring-center">' +
            '<span class="ring-ico">' + l.icon + "</span>" +
            '<span class="ring-pct">0%</span>' +
          "</div>" +
        "</div>" +
        '<span class="ring-name">' + l.name + "</span>" +
      "</div>";
    }).join("") + "</div>";
  }

  /* ---------- Render: Excel (ícono + lista de habilidades) ---------- */
  var excelWrap = document.getElementById("excel-list");
  if (excelWrap && window.EXCEL_SKILLS) {
    excelWrap.innerHTML =
      '<div class="excel-icon">' + window.excelIcon() + "</div>" +
      '<ul class="excel-skills">' +
      window.EXCEL_SKILLS.map(function (s) {
        return '<li><span class="chk">✓</span><span class="scramble sc-multi obs" data-text="' + s + '">' + s + "</span></li>";
      }).join("") +
      "</ul>";
  }

  /* ---------- Render: experiencia (bloqueada hasta hacer clic) ---------- */
  var xpWrap = document.getElementById("xp-list");
  if (xpWrap && window.EXPERIENCIA) {
    xpWrap.innerHTML = window.EXPERIENCIA.map(function (x, i) {
      var tags = x.tags.map(function (t) {
        return '<span class="scramble sc-multi flick" data-text="' + t + '">' + t + "</span>";
      }).join("");
      return '<div class="xp reveal d' + ((i % 3) + 1) + '">' +
        '<div class="xp-card locked" data-i="' + i + '">' +
          '<div class="xp-load"><span>DESBLOQUEANDO INFORMACION</span><b class="xp-load-bar"><i></i></b></div>' +
          '<div class="xp-head">' +
            '<span class="xp-role scramble sc-multi flick" data-text="' + x.role + '">' + x.role + "</span>" +
            '<span class="xp-date scramble sc-multi flick" data-text="' + x.date + '">' + x.date + "</span>" +
          "</div>" +
          '<div class="xp-company scramble sc-multi flick" data-text="' + x.company + '">' + x.company + "</div>" +
          '<p class="xp-desc scramble sc-multi flick" data-text="' + x.desc + '">' + x.desc + "</p>" +
          '<div class="xp-tags">' + tags + "</div>" +
          '<button class="xp-lock" type="button" aria-label="Descifrar archivo">' +
            '<span class="xp-lock-ico">▣</span>' +
            '<span class="xp-lock-txt">ARCHIVO ENCRIPTADO</span>' +
            '<span class="xp-lock-cta">▶ DESCIFRAR</span>' +
          "</button>" +
        "</div>" +
      "</div>";
    }).join("");
  }

  /* ---------- Desbloqueo de cada experiencia ---------- */
  if (xpWrap) {
    xpWrap.addEventListener("click", function (e) {
      var lock = e.target.closest(".xp-lock");
      if (!lock) return;
      var card = lock.closest(".xp-card");
      if (!card || card.classList.contains("open")) return;
      unlock(card);
    });
  }
  function unlock(card) {
    card.classList.add("open");                 // oculta candado, muestra barra de carga
    var fields = card.querySelectorAll(".scramble");
    // mientras "carga", deja los caracteres parpadeando
    fields.forEach(function (el) { window.Scramble.setVisible(el, true); window.Scramble.corrupt(el); });
    setTimeout(function () {
      fields.forEach(function (el, i) { window.Scramble.decode(el, 900 + i * 60); });
      card.classList.add("decrypted");          // detiene la barra de carga
      setTimeout(function () { card.classList.add("done"); }, 1100);
    }, 1500);
  }

  /* ---------- Typing del rol en el hero ---------- */
  var typeEl = document.getElementById("type");
  if (typeEl) {
    var words = JSON.parse(typeEl.dataset.words || "[]");
    var wi = 0, ci = 0, deleting = false;
    (function tick() {
      var word = words[wi] || "";
      ci += deleting ? -1 : 1;
      typeEl.textContent = word.slice(0, ci);
      var delay = deleting ? 45 : 95;
      if (!deleting && ci === word.length) { delay = 1500; deleting = true; }
      else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; delay = 350; }
      setTimeout(tick, delay);
    })();
  }

  /* ---------- Anillos de lenguaje: carga al entrar en pantalla ---------- */
  var sio = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll(".lang-ring").forEach(function (ring) {
        var lvl = +ring.dataset.level || 0;
        var fillCircle = ring.querySelector(".ring-fill");
        var pct = ring.querySelector(".ring-pct");
        ring.classList.add("charging");
        requestAnimationFrame(function () {
          if (fillCircle) fillCircle.style.strokeDashoffset = RING_C * (1 - lvl / 100);
        });
        if (pct) {
          var n = 0;
          (function step() {
            n += Math.max(1, Math.ceil(lvl / 28));
            if (n >= lvl) { n = lvl; ring.classList.remove("charging"); ring.classList.add("charged"); }
            pct.textContent = n + "%";
            if (n < lvl) requestAnimationFrame(step);
          })();
        }
      });
      sio.unobserve(e.target);
    });
  }, { threshold: 0.25 });
  document.querySelectorAll("#lang-list").forEach(function (p) { sio.observe(p); });

  /* ---------- Contacto ---------- */
  if (window.CONTACTO) {
    var c = window.CONTACTO;
    var set = function (id, v) { var el = document.getElementById(id); if (el) el.textContent = v; };
    set("c-nombre", c.nombre); set("c-rol", c.rol); set("c-email", c.email); set("c-ubic", c.ubicacion);
    var mail = document.getElementById("c-mail-link"); if (mail) mail.href = "mailto:" + c.email;
    var gh = document.getElementById("c-gh"); if (gh) gh.href = c.github;
    var li = document.getElementById("c-li"); if (li) li.href = c.linkedin;
  }
})();
