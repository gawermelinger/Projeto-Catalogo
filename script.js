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
  //polimorfismo
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
  //polimorfismo
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
  //polimorfismo
  updateMessage() {
    alert("Brinquedo atualizado com sucesso!");
  }
}

class Estoque {
  //criação do array que receberá os produtos cadastrados:
  static #produtos = [];
  static #contador = 0;
  constructor() {}
  //cadastrando os produtos:
  static cadastrarProduto(e) {
    e.preventDefault();
    //pegando os valores dos inputs do meu formulário estático:
    const nome = document.querySelector("#input-name").value;
    const desc = document.querySelector("#input-desc").value;
    const preco = Number(document.querySelector("#input-price").value);
    const idProduto = this.contador;
    ++this.contador;
    //pegando os valores do meu botão de select:
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
  }
  //tornando meu #produtos acessível:
  static get produtos() {
    return this.#produtos;
  }
  static get contador() {
    return this.#contador;
  }
  static set contador(contadorIncremento) {
    this.#contador = contadorIncremento;
  }
  //removendo um produto:
  static deletarProduto(id) {
    this.#produtos = Estoque.produtos.filter((produto) => produto.id != id);
  }
  //atualizando um produto:
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
      //retornando o nome da classe
      produto.sabor = novoAtributoEspecifico;
    } else {
      produto.material = novoAtributoEspecifico;
    }
  }
}
class Catalogo {
  constructor() {}

  static init() {
    //botão para abrir o form de cadastro:
    const botoaoAdicionar = document.getElementById("btn-add");
    botoaoAdicionar.addEventListener("click", () => {
      const sectionAdicionar = document.getElementById("form-section");
      sectionAdicionar.classList.toggle("display-hidden");
      botoaoAdicionar.classList.toggle("display-hidden");
    });
    //btão de escolha
    const escolha = document.getElementById("opcoes"); //select estático
    escolha.addEventListener("change", () => {
      this.personalizarFormulario();
    });
    //evento quando clicar no 'Criar':
    this.btnCadastro = document.querySelector("form");
    this.btnCadastro.addEventListener("submit", (e) => {
      Estoque.cadastrarProduto(e);
      Catalogo.imprimirCatalogo();
      this.#limparFormulario();
    });
  }
  //crio o campo no formulário de acordo com a opção escolhida:
  static personalizarFormulario() {
    const escolha = document.getElementById("opcoes").value;
    const opcao = escolha === "comestivel" ? "Sabor:" : "Material:";
    const mainForm = document.getElementById("main-form"); //fieldset estático
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
  //Formatando a entrada de texto fornecida, capitalizando a primeira letra e convertendo o restante em minúsculas.
  static #formatarInput(input) {
    let maiuscula = input[0].toUpperCase();
    let minuscula = input.slice(1).toLowerCase();
    return maiuscula + minuscula;
  }
  //limpando o formulário após clicar em 'Criar':
  static #limparFormulario() {
    let nome = document.querySelector("#input-name");
    let desc = document.querySelector("#input-desc");
    let preco = document.querySelector("#input-price");
    let tipo = document.getElementById("atributoEspecifico");
    nome.value = "";
    desc.value = "";
    preco.value = "";
    tipo.value = "";
  }
  //criando dinamicamente e exibindo o card do produto:
  static imprimirCatalogo() {
    //para demostrar o prototype:
    const inventario = new Estoque();
    console.log(inventario.verificarEstoque());
    //pego a ul estática no html:
    const ulProdutos = document.querySelector(".lista-produtos");
    ulProdutos.innerHTML = "";
    //para cada produto crio esses elementos html:
    Estoque.produtos.forEach((p) => {
      const liCard = document.createElement("li");
      liCard.classList.add("product-card", "card-grid");
      liCard.id = `produto_ ${p.id}`;
      ulProdutos.appendChild(liCard);

      const divName = document.createElement("div");
      divName.classList.add("product-name");
      liCard.appendChild(divName);

      const tituloProduto = document.createElement("h2");
      tituloProduto.innerText = Catalogo.#formatarInput(p.nome);
      divName.appendChild(tituloProduto);

      const divDesc = document.createElement("div");
      divDesc.classList.add("product-desc");
      liCard.appendChild(divDesc);

      const descProduto = document.createElement("p");
      descProduto.innerText = Catalogo.#formatarInput(p.descricao);
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
        atributoProduto.innerText = Catalogo.#formatarInput(p.sabor);
      } else {
        atributoProduto.innerText = Catalogo.#formatarInput(p.material);
      }
      divCategoria.appendChild(atributoProduto);

      //criar os botões do card:
      const divBotoes = document.createElement("div");
      divBotoes.classList.add("botoes");
      liCard.appendChild(divBotoes);
      //criar o botão de excluir do card:
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

      //criar o botão de editar do card:
      const botaoEditar = document.createElement("button");
      botaoEditar.classList.add("btn");
      botaoEditar.addEventListener("click", () => {
        Catalogo.transformaCard(p); //transforma o card no formulário para editar os campos
      });
      divBotoes.appendChild(botaoEditar);

      const imgEditar = document.createElement("img");
      imgEditar.src = "./assets/editar.png";
      botaoEditar.appendChild(imgEditar);
    });
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
    //Crio os botões do meu formulário de edição:
    const formBotoes = document.createElement("div");
    formBotoes.classList.add("botoes");
    form.appendChild(formBotoes);
    //botão para confirmar os novos dados:
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
    //botão que cancela a edição:
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

Estoque.prototype.verificarEstoque = function () {
  return `Há ${Estoque.produtos.length} em estoque`;
};

Catalogo.init();
