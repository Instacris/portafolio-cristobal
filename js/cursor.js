/* ============================================================
   CURSOR · Retícula HUD sutil que sigue al mouse (sin estela).
   Se agranda y cambia a blanco sobre elementos interactivos y
   emite un pequeño "ping" al hacer clic. Se desactiva en táctil.
   ============================================================ */
(function () {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  var reticle = document.createElement("div");
  reticle.className = "cursor-reticle";
  reticle.innerHTML = "<i></i><i></i><i></i><i></i><b></b>";
  var pulse = document.createElement("div");
  pulse.className = "cursor-pulse";
  document.body.append(reticle, pulse);

  var HOT_SEL = "a, button, .btn, .panel, .lang-ring, .excel-skills li, .xp-card, .xp-lock, .photo-frame, input, .proj, .contact-links a";

  var mouse = { x: innerWidth / 2, y: innerHeight / 2 };
  var cur = { x: mouse.x, y: mouse.y };

  addEventListener("mousemove", function (e) {
    mouse.x = e.clientX; mouse.y = e.clientY;
    var hot = !!(e.target.closest && e.target.closest(HOT_SEL));
    reticle.classList.toggle("hot", hot);
  });
  addEventListener("mousedown", function () {
    pulse.style.left = mouse.x + "px";
    pulse.style.top = mouse.y + "px";
    pulse.classList.remove("go");
    void pulse.offsetWidth;           // reinicia la animación CSS
    pulse.classList.add("go");
  });
  addEventListener("mouseleave", function () { reticle.style.opacity = 0; });
  addEventListener("mouseenter", function () { reticle.style.opacity = 1; });

  function loop() {
    requestAnimationFrame(loop);
    cur.x += (mouse.x - cur.x) * 0.35;
    cur.y += (mouse.y - cur.y) * 0.35;
    reticle.style.transform = "translate(" + cur.x + "px," + cur.y + "px) translate(-50%,-50%)";
  }
  requestAnimationFrame(loop);
})();
