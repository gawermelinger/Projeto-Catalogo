class Produto {
  #nome;
  #descricao;
  #preco;
  #id;

  constructor(nome, descricao, preco, id) {
    this.#nome = nome;
    this.#descricao = descricao;
    this.#preco = preco;
    this.#id = id;
  }
  get nome() {
    return this.#nome;
  }
  set nome(novoNome) {
    this.#nome = novoNome;
  }
  get descricao() {
    return this.#descricao;
  }
  set descricao(novaDescricao) {
    this.#descricao = novaDescricao;
  }
  get preco() {
    return this.#preco;
  }
  set preco(novoPreco) {
    this.#preco = novoPreco;
  }
  get id() {
    return this.#id;
  }
  set id(novoId) {
    this.#id = novoId;
  }
  updateMessage() {
    alert("Produto atualizado com sucesso!");
  }
}
class Comestivel extends Produto {
  #nome;
  #descricao;
  #preco;
  #id;
  #sabor;
  constructor(nome, descricao, preco, id, sabor) {
    super(nome, descricao, preco, id);
    this.#sabor = sabor;
  }
  get sabor() {
    return this.#sabor;
  }
  set sabor(novaSabor) {
    this.#sabor = novaSabor;
  }
  updateMessage() {
    alert("Comestível atualizado com sucesso!");
  }
}
class Brinquedo extends Produto {
  #nome;
  #descricao;
  #preco;
  #id;
  #material;
  constructor(nome, descricao, preco, id, material) {
    super(nome, descricao, preco, id);
    this.#material = material;
  }
  get material() {
    return this.#material;
  }
  set material(novomaterial) {
    this.#material = novomaterial;
  }
  updateMessage() {
    alert("Brinquedo atualizado com sucesso!");
  }
}
class Catalogo {
  constructor() {}

  static init() {
    const escolha = document.getElementById("opcoes");
    escolha.addEventListener("change", () => {
      this.personalizarFormulario();
    });
  }

  static personalizarFormulario() {
    const escolha = document.getElementById("opcoes").value;
    console.log(escolha);
    const opcao = escolha === "comestivel" ? "Sabor:" : "Material:";
    const mainForm = document.getElementById("main-form");
    let divEscolha = document.getElementById("divEscolha");
    if (divEscolha === null) {
      divEscolha = document.createElement("div");
      divEscolha.classList.add("input-set");
      divEscolha.id = "divEscolha";
      mainForm.appendChild(divEscolha);

      const labelEscolha = document.createElement("label");
      labelEscolha.id = "labelEscolha";
      divEscolha.appendChild(labelEscolha);

      const inputEscolha = document.createElement("input");
      inputEscolha.id = "atributoEspecifico";
      divEscolha.appendChild(inputEscolha);
    }

    labelEscolha.innerText = opcao;
  }

  static formatarInput(input) {
    let maiuscula = input[0].toUpperCase();
    let minuscula = input.slice(1).toLowerCase();
    return maiuscula + minuscula;
  }
  static imprimirCatalogo() {
    const inventario = new Estoque();
    console.log(inventario.verificarEstoque());
    const ulProdutos = document.querySelector(".lista-produtos");
    ulProdutos.innerHTML = "";

    Estoque.produtos.forEach((p) => {
      const liCard = document.createElement("li");
      liCard.classList.add("product-card", "card-grid");
      liCard.id = `produto_ ${p.id}`;
      ulProdutos.appendChild(liCard);

      const divName = document.createElement("div");
      divName.classList.add("product-name");
      liCard.appendChild(divName);

      const tituloProduto = document.createElement("h2");
      tituloProduto.innerText = Catalogo.formatarInput(p.nome);

      divName.appendChild(tituloProduto);

      const divDesc = document.createElement("div");
      divDesc.classList.add("product-desc");
      liCard.appendChild(divDesc);

      const descProduto = document.createElement("p");
      descProduto.innerText = Catalogo.formatarInput(p.descricao);

      divDesc.appendChild(descProduto);

      const divPrice = document.createElement("div");
      divPrice.classList.add("product-price");
      liCard.appendChild(divPrice);

      const priceProduto = document.createElement("span");
      priceProduto.innerText = `R$ ${p.preco}`;
      divPrice.appendChild(priceProduto);

      const divCategoria = document.createElement("div");
      divCategoria.classList.add("categoria");
      liCard.appendChild(divCategoria);

      const atributoProduto = document.createElement("span");
      console.log(p);
      if (p.constructor.name === "Comestivel") {
        atributoProduto.innerText = Catalogo.formatarInput(p.sabor);
      } else {
        atributoProduto.innerText = Catalogo.formatarInput(p.material);
      }
      divCategoria.appendChild(atributoProduto);

      //criar o botão de editar:
      const divBotoes = document.createElement("div");
      divBotoes.classList.add("botoes");
      liCard.appendChild(divBotoes);

      const botaoExcluir = document.createElement("button");
      botaoExcluir.classList.add("btn");
      botaoExcluir.addEventListener("click", () =>
        Estoque.deletarProduto(p.id)
      );
      divBotoes.appendChild(botaoExcluir);

      const imgExcluir = document.createElement("img");
      imgExcluir.src = "./assets/excluir.png";
      botaoExcluir.appendChild(imgExcluir);

      const botaoEditar = document.createElement("button");
      botaoEditar.classList.add("btn");
      botaoEditar.addEventListener("click", () => Estoque.editarProduto(p));
      divBotoes.appendChild(botaoEditar);

      const imgEditar = document.createElement("img");
      imgEditar.src = "./assets/editar.png";
      botaoEditar.appendChild(imgEditar);
    });
  }
}
class Estoque {
  static #produtos = [];
  constructor() {}
  static init() {
    this.btnCadastro = document.querySelector("form");
    this.btnCadastro.addEventListener("submit", Estoque.cadastrarProduto);
  }
  static cadastrarProduto(evento) {
    evento.preventDefault();
    const tipo = document.getElementById("opcoes").value;
    const nome = document.querySelector("#input-name").value;
    const desc = document.querySelector("#input-desc").value;
    const preco = Number(document.querySelector("#input-price").value);
    const idProduto = Estoque.produtos.length;
    if (tipo === "comestivel") {
      const sabor = document.getElementById("atributoEspecifico").value;
      const item = new Comestivel(nome, desc, preco, idProduto, sabor);
      Estoque.#produtos.push(item);
    } else {
      const material = document.getElementById("atributoEspecifico").value;
      const item = new Brinquedo(nome, desc, preco, idProduto, material);
      Estoque.#produtos.push(item);
    }
    //Estoque.#produtos.push(item);
    Catalogo.imprimirCatalogo();
  }
  static get produtos() {
    return this.#produtos;
  }
  static deletarProduto(id) {
    //console.log(id);
    this.#produtos = Estoque.produtos.filter((produto) => produto.id != id);
    Catalogo.imprimirCatalogo();
  }
  static editarProduto(produto) {
    const card = document.getElementById(`produto_ ${produto.id}`);
    card.innerHTML = "";
    card.classList.remove("card-grid");

    const form = document.createElement("form");
    form.classList.add("form-card");
    card.appendChild(form);

    const divForm1 = document.createElement("div");
    divForm1.classList.add("form-name");
    form.appendChild(divForm1);

    const primeiroInput = document.createElement("input");
    primeiroInput.type = "text";
    primeiroInput.maxLenght = "40";
    primeiroInput.value = produto.nome;
    primeiroInput.classList.add("input-name");
    divForm1.appendChild(primeiroInput);

    const divForm2 = document.createElement("div");
    divForm2.classList.add("form-desc");
    form.appendChild(divForm2);

    const segundoInput = document.createElement("input");
    segundoInput.type = "text";
    segundoInput.maxLenght = "100";
    segundoInput.value = produto.descricao;
    segundoInput.classList.add("input-desc");
    divForm2.appendChild(segundoInput);

    const divForm3 = document.createElement("div");
    divForm3.classList.add("form-price");
    form.appendChild(divForm3);

    const terceiroInput = document.createElement("input");
    terceiroInput.type = "text";
    terceiroInput.maxLenght = "100";
    terceiroInput.value = produto.preco;
    terceiroInput.classList.add("input-price");
    divForm3.appendChild(terceiroInput);

    const divForm4 = document.createElement("div");
    divForm4.classList.add("form-cat");
    form.appendChild(divForm4);

    const quartoInput = document.createElement("input");
    quartoInput.type = "text";
    quartoInput.maxLenght = "30";
    if (produto.constructor.name === "Comestivel") {
      quartoInput.value = produto.sabor;
    } else {
      quartoInput.value = produto.material;
    }
    quartoInput.classList.add("input-cat");
    divForm4.appendChild(quartoInput);

    const formBotoes = document.createElement("div");
    formBotoes.classList.add("botoes");
    form.appendChild(formBotoes);

    const confirmaBotao = document.createElement("button");
    confirmaBotao.classList.add("btn");
    formBotoes.appendChild(confirmaBotao);
    confirmaBotao.addEventListener("click", () => {
      produto.nome = primeiroInput.value;
      produto.descricao = segundoInput.value;
      produto.preco = terceiroInput.value;
      if (produto.constructor.name === "Comestivel") {
        produto.sabor = quartoInput.value;
      } else {
        produto.material = quartoInput.value;
      }
      produto.updateMessage();
      Catalogo.imprimirCatalogo();
    });

    const imgConfirma = document.createElement("img");
    imgConfirma.src = "./assets/confirme.png";
    confirmaBotao.appendChild(imgConfirma);

    const cancelaBotao = document.createElement("button");
    cancelaBotao.classList.add("btn");
    formBotoes.appendChild(cancelaBotao);

    const imgCancela = document.createElement("img");
    imgCancela.src = "./assets/cancelar.png";
    cancelaBotao.appendChild(imgCancela);
    cancelaBotao.addEventListener("click", () => {
      Catalogo.imprimirCatalogo();
    });
  }
}
Catalogo.init();
Estoque.init();

Estoque.prototype.verificarEstoque = function () {
  return `Há ${Estoque.produtos.length} em estoque`;
};
