(function () {
  "use strict";

  const ano = document.getElementById("ano");

  if (ano) {
    ano.textContent = new Date().getFullYear();
  }

  const lista = document.getElementById("lista-itens");

  if (lista && Array.isArray(ITENS)) {

    lista.innerHTML = ITENS.map(item => `

      <div class="card">

        <img src="${item.imagem}" alt="${item.nome}" class="card-img">

        <div class="card-content">
          <h3>${item.nome}</h3>

          <p>${item.descricao}</p>

          <div class="card-footer">
            <span class="preco">
              R$ ${item.preco.toFixed(2).replace('.', ',')}
            </span>

            <button class="btn add-cart"
              data-id="${item.id}">
              Adicionar
            </button>
          </div>
        </div>

      </div>

    `).join("");

  }

  document.addEventListener("click", function (e) {

    if (e.target.classList.contains("add-cart")) {

      const id = Number(e.target.dataset.id);

      const item = ITENS.find(produto => produto.id === id);

      adicionarAoCarrinho(item);
    }

  });

})();
