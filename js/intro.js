/* ============================================================
   INTRO · Pantalla de acceso previa al portafolio.
   Toca / clic / tecla en cualquier parte para entrar.
   Al entrar: transición + breve loader de "login" (#boot).
   ============================================================ */
(function () {
  "use strict";
  var intro = document.getElementById("intro");
  if (!intro) return;
  var boot = document.getElementById("boot");
  var SEEN = "introSeen";

  // El #boot pasa a ser el loader posterior al acceso (no se auto-muestra).
  if (boot) boot.style.display = "none";

  // Solo se muestra una vez por sesión: si ya se vio (p. ej. al volver desde
  // Proyectos), se salta por completo sin animación ni bloqueo.
  var seen = false;
  try { seen = !!sessionStorage.getItem(SEEN); } catch (e) {}
  if (seen) {
    intro.style.display = "none";
    return;
  }

  document.body.classList.add("intro-lock");
  var done = false;

  function enter() {
    if (done) return;
    done = true;
    try { sessionStorage.setItem(SEEN, "1"); } catch (e) {}
    intro.classList.add("gone");
    document.body.classList.remove("intro-lock");

    if (boot) {
      boot.style.display = "flex";
      boot.classList.remove("done");
      // reinicia la animación de la barra
      void boot.offsetWidth;
      boot.classList.add("run");
      setTimeout(function () { boot.classList.add("done"); }, 1700);
      setTimeout(function () { boot.style.display = "none"; }, 2300);
    }
    setTimeout(function () { intro.style.display = "none"; }, 700);

    document.removeEventListener("click", enter);
    document.removeEventListener("keydown", enter);
    document.removeEventListener("touchstart", enter);
  }

  // Pequeño retardo para evitar que un clic residual lo cierre al instante
  setTimeout(function () {
    document.addEventListener("click", enter);
    document.addEventListener("keydown", enter);
    document.addEventListener("touchstart", enter, { passive: true });
  }, 350);
})();
