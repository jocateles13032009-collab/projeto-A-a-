let carrinho = [];

const sidebar = document.getElementById("cart-sidebar");
const abrirCarrinho = document.getElementById("abrir-carrinho");
const fecharCarrinho = document.getElementById("fechar-carrinho");

if (abrirCarrinho) {
  abrirCarrinho.addEventListener("click", () => {
    sidebar.classList.add("ativo");
  });
}

if (fecharCarrinho) {
  fecharCarrinho.addEventListener("click", () => {
    sidebar.classList.remove("ativo");
  });
}

function adicionarAoCarrinho(item) {

  carrinho.push(item);

  atualizarCarrinho();
}

function atualizarCarrinho() {

  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  if (!cartItems) return;

  cartItems.innerHTML = carrinho.map(item => `

    <div class="cart-item">
      <p>${item.nome}</p>
      <span>R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
    </div>

  `).join("");

  const total = carrinho.reduce((acc, item) => acc + item.preco, 0);

  cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;

  if (cartCount) {
    cartCount.textContent = carrinho.length;
  }
}

const finalizar = document.getElementById("finalizar-pedido");

if (finalizar) {

  finalizar.addEventListener("click", () => {

    if (!carrinho.length) {
      alert("Seu carrinho está vazio.");
      return;
    }

    let mensagem = "Olá! Quero pedir:%0A%0A";

    carrinho.forEach(item => {
      mensagem += `🍇 ${item.nome} - R$ ${item.preco.toFixed(2)}%0A`;
    });

    const total = carrinho.reduce((acc, item) => acc + item.preco, 0);

    mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;

    const numero = "5511999999999";

    window.open(`https://wa.me/${numero}?text=${mensagem}`);

  });

}
