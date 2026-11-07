// Google Maps wird erst nach Zustimmung geladen.
(function () {
  var SCHLUESSEL = "karten-zustimmung";
  var KARTE_URL = "https://www.google.com/maps?q=Einungsstra%C3%9Fe+40,+79774+Albbruck-Birndorf&output=embed";

  var banner = document.getElementById("cookie-banner");
  var feld = document.getElementById("karte");

  function lesen() {
    try { return localStorage.getItem(SCHLUESSEL); } catch (e) { return null; }
  }

  function speichern(wert) {
    try { localStorage.setItem(SCHLUESSEL, wert); } catch (e) { /* gilt dann nur für diesen Besuch */ }
  }

  function karteLaden() {
    if (feld.querySelector("iframe")) return;
    var rahmen = document.createElement("iframe");
    rahmen.src = KARTE_URL;
    rahmen.title = "Google-Karte der Verkaufsstelle Einungsstraße 40 in Albbruck-Birndorf";
    rahmen.loading = "lazy";
    rahmen.referrerPolicy = "no-referrer-when-downgrade";
    feld.replaceChildren(rahmen);
  }

  function zustimmen() {
    speichern("ja");
    banner.hidden = true;
    karteLaden();
  }

  function ablehnen() {
    speichern("nein");
    banner.hidden = true;
    // Eine bereits geladene Karte verschwindet durch Neuladen der Seite.
    if (feld.querySelector("iframe")) location.reload();
  }

  document.getElementById("cookie-ja").addEventListener("click", zustimmen);
  document.getElementById("cookie-nein").addEventListener("click", ablehnen);
  document.getElementById("karte-laden").addEventListener("click", zustimmen);
  document.getElementById("cookie-einstellungen").addEventListener("click", function () {
    banner.hidden = false;
    document.getElementById("cookie-ja").focus();
  });

  var wahl = lesen();
  if (wahl === "ja") karteLaden();
  else if (wahl !== "nein") banner.hidden = false;
})();
