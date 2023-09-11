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
    const botoaoAdicionar = document.getElementById("btn-add");
    botoaoAdicionar.addEventListener("click", () => {
      const sectionAdicionar = document.getElementById("form-section");
      sectionAdicionar.classList.remove("display");
      botoaoAdicionar.classList.add("display");
    });
    const escolha = document.getElementById("opcoes");
    escolha.addEventListener("change", () => {
      this.personalizarFormulario();
    });
    this.btnCadastro = document.querySelector("form");
    this.btnCadastro.addEventListener("submit", (e) => {
      Estoque.cadastrarProduto(e);
      Catalogo.imprimirCatalogo();
      this.limparFormulario();
    });
  }

  static personalizarFormulario() {
    const escolha = document.getElementById("opcoes").value;
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
  static limparFormulario() {
    let nome = document.querySelector("#input-name");
    let desc = document.querySelector("#input-desc");
    let preco = document.querySelector("#input-price");
    let tipo = document.getElementById("opcoes");
    if (tipo === "comestivel") {
      let sabor = document.getElementById("atributoEspecifico");
    } else {
      let material = document.getElementById("atributoEspecifico");
    }
    nome.value = "";
    desc.value = "";
    preco.value = "";
    tipo.value = "";
  }
  static transformaCard(produto) {
    const card = document.getElementById(`produto_ ${produto.id}`);
    card.innerHTML = "";
    card.classList.remove("card-grid");

    const form = document.createElement("form");
    form.classList.add("form-card");
    card.appendChild(form);

    const divForm1 = document.createElement("div");
    divForm1.classList.add("form-name");
    form.appendChild(divForm1);

    const nomeEdit = document.createElement("input");
    nomeEdit.type = "text";
    nomeEdit.maxLenght = "40";
    nomeEdit.value = produto.nome;
    nomeEdit.classList.add("input-name");
    divForm1.appendChild(nomeEdit);

    const divForm2 = document.createElement("div");
    divForm2.classList.add("form-desc");
    form.appendChild(divForm2);

    const descEdit = document.createElement("input");
    descEdit.type = "text";
    descEdit.maxLenght = "100";
    descEdit.value = produto.descricao;
    descEdit.classList.add("input-desc");
    divForm2.appendChild(descEdit);

    const divForm3 = document.createElement("div");
    divForm3.classList.add("form-price");
    form.appendChild(divForm3);

    const precoEdit = document.createElement("input");
    precoEdit.type = "text";
    precoEdit.maxLenght = "100";
    precoEdit.value = produto.preco;
    precoEdit.classList.add("input-price");
    divForm3.appendChild(precoEdit);

    const divForm4 = document.createElement("div");
    divForm4.classList.add("form-cat");
    form.appendChild(divForm4);

    const especEdit = document.createElement("input");
    especEdit.type = "text";
    especEdit.maxLenght = "30";
    if (produto.constructor.name === "Comestivel") {
      especEdit.value = produto.sabor;
    } else {
      especEdit.value = produto.material;
    }
    especEdit.classList.add("input-cat");
    divForm4.appendChild(especEdit);

    const formBotoes = document.createElement("div");
    formBotoes.classList.add("botoes");
    form.appendChild(formBotoes);

    const confirmaBotao = document.createElement("button");
    confirmaBotao.classList.add("btn");
    formBotoes.appendChild(confirmaBotao);
    confirmaBotao.addEventListener("click", (e) => {
      e.preventDefault();
      Estoque.editarProduto(
        produto,
        nomeEdit.value,
        precoEdit.value,
        descEdit.value,
        especEdit.value
      );
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
      botaoExcluir.addEventListener("click", () => {
        Estoque.deletarProduto(p.id);
        Catalogo.imprimirCatalogo();
      });
      divBotoes.appendChild(botaoExcluir);

      const imgExcluir = document.createElement("img");
      imgExcluir.src = "./assets/excluir.png";
      botaoExcluir.appendChild(imgExcluir);

      const botaoEditar = document.createElement("button");
      botaoEditar.classList.add("btn");
      botaoEditar.addEventListener("click", () => {
        Catalogo.transformaCard(p);
      });
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
  static cadastrarProduto(e) {
    e.preventDefault();

    const nome = document.querySelector("#input-name").value;
    const desc = document.querySelector("#input-desc").value;
    const preco = Number(document.querySelector("#input-price").value);
    const idProduto = Estoque.produtos.length;
    const tipo = document.getElementById("opcoes").value;
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
  }
  static get produtos() {
    return this.#produtos;
  }
  static deletarProduto(id) {
    //console.log(id);
    this.#produtos = Estoque.produtos.filter((produto) => produto.id != id);
  }
  static editarProduto(
    produto,
    novoNome,
    novoPreco,
    novaDescricao,
    novoAtributoEspecifico
  ) {
    produto.nome = novoNome;
    produto.preco = novoPreco;
    produto.descricao = novaDescricao;
    if (produto.constructor.name === "Comestivel") {
      produto.sabor = novoAtributoEspecifico;
    } else {
      produto.material = novoAtributoEspecifico;
    }
  }
}

Estoque.prototype.verificarEstoque = function () {
  return `Há ${Estoque.produtos.length} em estoque`;
};

Catalogo.init();
