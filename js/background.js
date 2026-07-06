/* ============================================================
   BACKGROUND · Lluvia de "hacking" estilo matrix (blanco/azul/rojo)
   Funciona en cualquier <canvas class="rain"> (fondo + pantalla de acceso).
   ============================================================ */
(function () {
  var GLYPHS = "01<>[]{}/\\|=+-*#%&アカサタナハマヤラワ01ﾊﾐﾋｰﾅﾜ01ABCDEF";
  var FONT_SIZE = 16;

  function startRain(canvas) {
    var ctx = canvas.getContext("2d");
    var cols, drops, w, h, dpr, last = 0;
    var FRAME = 1000 / 22;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      var cw = canvas.clientWidth || window.innerWidth;
      var ch = canvas.clientHeight || window.innerHeight;
      w = canvas.width = Math.floor(cw * dpr);
      h = canvas.height = Math.floor(ch * dpr);
      cols = Math.floor(cw / FONT_SIZE);
      drops = new Array(cols).fill(0).map(function () { return Math.random() * -50; });
      ctx.font = (FONT_SIZE * dpr) + "px 'Share Tech Mono', monospace";
    }

    function draw(t) {
      requestAnimationFrame(draw);
      // Pausa cuando el canvas está oculto (p. ej. tras cerrar el intro)
      if (canvas.offsetWidth === 0 && canvas.offsetHeight === 0) return;
      if (t - last < FRAME) return;
      last = t;

      ctx.fillStyle = "rgba(5,5,7,0.16)";
      ctx.fillRect(0, 0, w, h);

      for (var i = 0; i < cols; i++) {
        var x = i * FONT_SIZE * dpr;
        var y = drops[i] * FONT_SIZE * dpr;
        var ch2 = GLYPHS[(Math.random() * GLYPHS.length) | 0];

        var head = Math.random() > 0.975;
        var r = Math.random();
        if (head) ctx.fillStyle = "rgba(255,255,255,0.95)";
        else if (r > 0.95) ctx.fillStyle = "rgba(255,0,51,0.85)";
        else if (r > 0.90) ctx.fillStyle = "rgba(43,155,255,0.8)";
        else ctx.fillStyle = "rgba(255,255,255,0.32)";
        ctx.fillText(ch2, x, y);

        if (y > h && Math.random() > 0.975) drops[i] = Math.random() * -20;
        drops[i]++;
      }
    }

    resize();
    var rz;
    window.addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(resize, 150); });
    requestAnimationFrame(draw);
  }

  document.querySelectorAll("canvas.rain").forEach(startRain);
})();
