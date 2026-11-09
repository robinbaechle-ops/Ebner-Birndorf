// Runde Fotogalerie: Pfeile, Punkte, Wischen und Pfeiltasten.
(function () {
  var galerie = document.getElementById("galerie");
  if (!galerie) return;
  var bilder = galerie.querySelectorAll(".galerie-fenster img");
  var punkte = galerie.querySelector(".galerie-punkte");
  var aktuell = 0;

  bilder.forEach(function (bild, i) {
    var knopf = document.createElement("button");
    knopf.type = "button";
    knopf.setAttribute("aria-label", "Foto " + (i + 1) + " von " + bilder.length);
    knopf.addEventListener("click", function () { zeige(i); });
    punkte.appendChild(knopf);
  });

  function zeige(i) {
    aktuell = (i + bilder.length) % bilder.length;
    bilder.forEach(function (bild, n) {
      bild.classList.toggle("aktiv", n === aktuell);
      if (n === aktuell) bild.loading = "eager";
    });
    punkte.querySelectorAll("button").forEach(function (knopf, n) {
      knopf.setAttribute("aria-current", n === aktuell ? "true" : "false");
    });
  }

  galerie.querySelector(".zurueck").addEventListener("click", function () { zeige(aktuell - 1); });
  galerie.querySelector(".weiter").addEventListener("click", function () { zeige(aktuell + 1); });

  galerie.tabIndex = 0;
  galerie.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") zeige(aktuell - 1);
    if (e.key === "ArrowRight") zeige(aktuell + 1);
  });

  var startX = null;
  galerie.addEventListener("pointerdown", function (e) { startX = e.clientX; });
  galerie.addEventListener("pointerup", function (e) {
    if (startX === null) return;
    var weg = e.clientX - startX;
    if (Math.abs(weg) > 40) zeige(aktuell + (weg < 0 ? 1 : -1));
    startX = null;
  });

  zeige(0);
})();
