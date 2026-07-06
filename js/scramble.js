/* ============================================================
   SCRAMBLE · Texto "corrompido" (japonés / ilegible) que se
   decodifica al entrar en pantalla o al pasar el cursor, y se
   vuelve a corromper al salir del campo de visión.
   Colores hacking: blanco / azul / rojo (clase .sc-multi).
   API global: window.Scramble
   ============================================================ */
(function () {
  "use strict";
  // Katakana de MEDIO ancho (mismo ancho que un carácter latino en monoespaciada,
  // a diferencia del katakana normal que es de ancho completo) + símbolos.
  // Así el texto corrompido nunca cambia de ancho al parpadear y no reflota
  // el párrafo (evita que las tarjetas de experiencia "salten").
  var CHARS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789#%&@<>/\\|=+*¦ǂ҂ʭ҈⌁⌬";
  var COLORS = ["sc-w", "sc-b", "sc-r"];
  var reg = new Set();
  var map = new WeakMap();

  function rnd() { return CHARS[(Math.random() * CHARS.length) | 0]; }
  function esc(c) { return c === "<" ? "&lt;" : c === ">" ? "&gt;" : c === "&" ? "&amp;" : c; }

  function S(el) {
    this.el = el;
    var t = el.dataset.text != null ? el.dataset.text : el.textContent;
    this.text = t.trim();
    el.dataset.text = this.text;
    this.multi = el.classList.contains("sc-multi");
    this.state = "corrupt";  // corrupt | decode | clear
    this.p = 0; this.dur = 1200; this.t0 = 0;
    this.vis = false; this.lf = 0;
    reg.add(this); map.set(el, this);
    this.render();
  }
  S.prototype.render = function () {
    if (this.state === "clear") { this.el.textContent = this.text; return; }
    var n = this.text.length;
    var cut = this.state === "decode" ? Math.floor(this.p * n) : 0;
    if (this.multi) {
      var h = "";
      for (var i = 0; i < n; i++) {
        var ch = this.text[i];
        if (ch === " ") { h += " "; continue; }
        if (i < cut) h += esc(ch);
        else h += '<span class="' + COLORS[(Math.random() * 3) | 0] + '">' + esc(rnd()) + "</span>";
      }
      this.el.innerHTML = h;
    } else {
      var s = "";
      for (var j = 0; j < n; j++) {
        var c = this.text[j];
        s += c === " " ? " " : j < cut ? c : rnd();
      }
      this.el.textContent = s;
    }
  };
  S.prototype.decode = function (dur) {
    if (this.state === "clear") return;   // ya revelado: no se vuelve a corromper
    this.state = "decode"; this.p = 0; this.dur = dur || 1200; this.t0 = performance.now();
  };
  S.prototype.corrupt = function () { this.state = "corrupt"; this.p = 0; };

  function tick(t) {
    requestAnimationFrame(tick);
    reg.forEach(function (s) {
      if (s.state === "clear") return;
      if (s.state === "decode") {
        s.p = Math.min(1, (t - s.t0) / s.dur);
        s.render();
        if (s.p >= 1) { s.state = "clear"; s.render(); }
      } else if (s.vis && t - s.lf > 60) {
        s.lf = t; s.render();   // parpadeo de caracteres mientras está visible y corrupto
      }
    });
  }
  requestAnimationFrame(tick);

  function get(el) { return map.get(el) || new S(el); }
  window.Scramble = {
    make: function (el) { return get(el); },
    decode: function (el, dur) { get(el).decode(dur); },
    corrupt: function (el) { get(el).corrupt(); },
    setVisible: function (el, v) { get(el).vis = v; },
  };
})();
