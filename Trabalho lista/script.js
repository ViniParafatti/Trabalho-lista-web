const input = document.getElementById("itemInput");
const addButton = document.getElementById("addButton");
const lista = document.getElementById("listaItens");


window.onload = function () {
  const listaSalva = JSON.parse(localStorage.getItem("minhaLista"));
  if (listaSalva) {
    listaSalva.forEach(item => adicionarItem(item.texto, item.comprado));
  }
};

addButton.addEventListener("click", () => {
  const texto = input.value.trim();
  if (texto === "") return;

  adicionarItem(texto, false);
  salvarLista();
  input.value = "";
});

function adicionarItem(texto, comprado) {
  const li = document.createElement("li");
  li.classList.add("item");

  const span = document.createElement("span");
  span.textContent = texto;
  span.classList.add("item-texto");
  if (comprado) {
    span.classList.add("comprado");
  }

  span.addEventListener("click", () => {
    span.classList.toggle("comprado");
    salvarLista();
  });

  const botaoRemover = document.createElement("button");
  botaoRemover.textContent = "Remover";
  botaoRemover.classList.add("remover");
  botaoRemover.addEventListener("click", () => {
    li.remove();
    salvarLista();
  });

  li.appendChild(span);
  li.appendChild(botaoRemover);
  lista.appendChild(li);
}

function salvarLista() {
  const itens = [];
  document.querySelectorAll(".item").forEach((li) => {
    const texto = li.querySelector(".item-texto").textContent;
    const comprado = li.querySelector(".item-texto").classList.contains("comprado");
    itens.push({ texto, comprado });
  });
  localStorage.setItem("minhaLista", JSON.stringify(itens));
}
