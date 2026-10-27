// Na primeira visita, cada página leva quem lê em outro idioma à versão equivalente.
// A troca feita no seletor fica guardada e passa a valer sobre o idioma do navegador.
(function () {
  var seletor = document.querySelector("a[data-idioma]");
  var CHAVE = "idioma";

  function guardar(idioma) {
    try { localStorage.setItem(CHAVE, idioma); } catch (bloqueado) { /* sem armazenamento, vale o navegador */ }
  }

  function escolhido() {
    try { return localStorage.getItem(CHAVE); } catch (bloqueado) { return null; }
  }

  if (!seletor) return;
  seletor.addEventListener("click", function () { guardar(seletor.dataset.idioma); });
  if (/bot|crawl|spider|slurp/i.test(navigator.userAgent)) return;

  var doNavegador = (navigator.language || "en").toLowerCase().indexOf("pt") === 0 ? "pt" : "en";
  if ((escolhido() || doNavegador) === seletor.dataset.idioma) location.replace(seletor.href + location.hash);
})();
