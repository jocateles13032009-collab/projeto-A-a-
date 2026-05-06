// 👑 Rei do Açaí — app.js avançado
(function () {
  "use strict";

  // CONFIG (troque pelo número real)
  const WHATSAPP_NUMERO = "5511999999999";

  // Ano automático
  const anoEl = document.getElementById("ano");
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  // Renderização do cardápio
  const lista = document.getElementById("lista-itens");

  if (lista && Array.isArray(ITENS)) {
    lista.innerHTML = ITENS.map(item => {
      const nome = escapar(item.nome);
      const descricao = escapar(item.descricao);
      const preco = escapar(item.preco);
      const imagem = item.imagem || "https://images.unsplash.com/photo-1590080877777-4c9f9c6b4f9b";

      return `
        <li class="card">
          <img src="${imagem}" alt="${nome}" class="card-img">

          ${item.destaque ? '<span class="badge">🔥 Mais pedido</span>' : ""}

          <h3>${nome}</h3>
          <p>${descricao}</p>

          <div class="card-footer">
            <span class="preco">${preco}</span>
            <button class="btn btn--small pedir-btn" 
              data-nome="${nome}" 
              data-preco="${preco}">
              Pedir
            </button>
          </div>
        </li>
      `;
    }).join("");

    ativarBotoesPedido();
  }

  // BOTÃO PEDIR (WhatsApp)
  function ativarBotoesPedido() {
    const botoes = document.querySelectorAll(".pedir-btn");

    botoes.forEach(btn => {
      btn.addEventListener("click", () => {
        const nome = btn.dataset.nome;
        const preco = btn.dataset.preco;

        const mensagem = `Olá! Quero pedir:\n\n🍇 ${nome}\n💰 ${preco}`;
        const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;

        window.open(url, "_blank");
      });
    });
  }

  // FORMULÁRIO
  const form = document.querySelector(".form");
  const status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nome = form.nome.value.trim();
      const email = form.email.value.trim();

      if (!nome || !email) {
        setStatus("⚠ Preencha nome e e-mail.", "erro");
        return;
      }

      if (!validarEmail(email)) {
        setStatus("⚠ E-mail inválido.", "erro");
        return;
      }

      setStatus("✓ Mensagem enviada! Entraremos em contato.", "ok");
      form.reset();
    });
  }

  function validarEmail(email) {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  }

  function setStatus(msg, tipo) {
    if (!status) return;
    status.textContent = msg;
    status.className = `form-status ${tipo}`;
  }

  // Segurança (anti XSS)
  function escapar(txt) {
    const div = document.createElement("div");
    div.textContent = String(txt ?? "");
    return div.innerHTML;
  }

})();
