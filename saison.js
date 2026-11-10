// Außerhalb der Saison weist die Seite auf den nächsten Verkauf hin.
// Saisonende: 23. Dezember. Bis Ende Oktober bleibt der Hinweis sichtbar.
(function () {
  var heute = new Date();
  var monat = heute.getMonth(); // 0 = Januar, 11 = Dezember
  var tag = heute.getDate();
  var nachDerSaison = monat < 10 || (monat === 11 && tag > 23);
  if (!nachDerSaison) return;

  document.getElementById("hero-zeiten").textContent = "Verkauf wieder ab Dezember geöffnet!";
  document.getElementById("verkauf-hinweis").textContent = "Die Saison ist vorbei. Verkauf wieder ab Dezember in der Hirschenscheune, Einungsstraße 40 in Birndorf.";
})();
