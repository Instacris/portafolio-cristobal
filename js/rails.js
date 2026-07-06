/* ============================================================
   RAILS · Laterales decorativos (solo PC). Contenido dinámico:
   flujo hex (izq), coordenadas del puntero + osciloscopio (der).
   ============================================================ */
(function () {
  "use strict";

  /* --- Flujo de datos hex (rail izquierdo) --- */
  var stream = document.getElementById("rail-stream");
  var HEX = "0123456789ABCDEF";
  function hex(n) { var s = ""; for (var i = 0; i < n; i++) s += HEX[(Math.random() * 16) | 0]; return s; }
  if (stream) {
    setInterval(function () {
      if (stream.offsetParent === null) return;      // laterales ocultos (móvil/tablet)
      var d = document.createElement("div");
      d.textContent = (Math.random() > 0.5 ? "0x" : "") + hex(2);
      stream.insertBefore(d, stream.firstChild);
      while (stream.children.length > 9) stream.removeChild(stream.lastChild);
    }, 150);
  }

  /* --- Coordenadas del puntero (rail derecho) --- */
  var coords = document.getElementById("rail-coords");
  if (coords) {
    var pad = function (n) { return ("000" + n).slice(-4); };
    addEventListener("mousemove", function (e) {
      coords.innerHTML = "X:" + pad(e.clientX) + "<br>Y:" + pad(e.clientY);
    });
  }

  /* --- Osciloscopio (rail derecho) --- */
  var sc = document.getElementById("rail-scope");
  if (sc) {
    var g = sc.getContext("2d");
    var W = sc.width = 46, H = sc.height = 68;
    var ph = 0, amp = 1;
    addEventListener("mousemove", function (e) { amp = 0.35 + (e.clientY / innerHeight) * 1.4; });
    (function draw() {
      requestAnimationFrame(draw);
      if (sc.offsetParent === null) return;
      g.fillStyle = "rgba(7,7,12,0.4)"; g.fillRect(0, 0, W, H);
      g.strokeStyle = "#ff2d55"; g.lineWidth = 1.4;
      g.shadowBlur = 6; g.shadowColor = "#ff0033";
      g.beginPath();
      for (var x = 0; x < W; x++) {
        var y = H / 2 + Math.sin(x * 0.4 + ph) * (H * 0.3) * amp * Math.sin(x * 0.05 + ph * 0.5);
        x === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
      }
      g.stroke(); g.shadowBlur = 0; ph += 0.16;
    })();
  }
})();
