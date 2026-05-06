// Renderiza a lista de itens e cuida do formulário.
(function () {
  "use strict";

  // Ano automático no rodapé
  const anoEl = document.getElementById("ano");
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  // Renderiza cards
  const lista = document.getElementById("lista-itens");
  if (lista && Array.isArray(ITENS)) {
    lista.innerHTML = ITENS.map(function (item) {
      return (
        '<li class="card">' +
          '<h3>' + escapar(item.nome) + '</h3>' +
          '<p>' + escapar(item.descricao) + '</p>' +
          '<p class="preco">' + escapar(item.preco) + '</p>' +
        '</li>'
      );
    }).join("");
  }

  // Formulário com validação acessível
  const form = document.querySelector(".form");
  const status = document.getElementById("form-status");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const nome = form.nome.value.trim();
      const email = form.email.value.trim();
      if (!nome || !email) {
        status.textContent = "⚠ Preencha nome e e-mail.";
        status.className = "form-status erro";
        return;
      }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        status.textContent = "⚠ E-mail inválido.";
        status.className = "form-status erro";
        return;
      }
      status.textContent = "✓ Mensagem enviada! Entraremos em contato.";
      status.className = "form-status ok";
      form.reset();
    });
  }

  function escapar(txt) {
    const div = document.createElement("div");
    div.textContent = String(txt == null ? "" : txt);
    return div.innerHTML;
  }
})();
