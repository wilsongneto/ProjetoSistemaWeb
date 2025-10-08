const form = document.getElementById('');
const inputNome = document.getElementById('');
const selectCategoria = document.getElementById('');
const inputPreco = document.getElementById('');
const inputQtde = document.getElementById('');
const tabelaBody = document.querySelector('');
const busca = document.getElementById('');
const totalItensEl = document.getElementById('');
const valorTotalEl = document.getElementById('');
const msg = document.getElementById('');
const btnLimparTudo = document.getElementById('');
const btnTema = document.getElementById('');


let produtos = [];
const STORAGE_KEY = '';


function formatarMoeda(n){
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}


function salvar(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
}
function carregar(){
  const dados = localStorage.getItem(STORAGE_KEY);
  produtos = dados ? JSON.parse(dados) : [];
}


function render(){
  const termo = busca.value.trim().toLowerCase();

  
  tabelaBody.innerHTML = '';

  
  const filtrados = produtos.filter(p => {
    const nomeOk = p.nome.toLowerCase().includes(termo);
    const catOk = p.categoria.toLowerCase().includes(termo);
    return termo === '' ? true : (nomeOk || catOk);
  });

 
  for(const p of filtrados){
    const tr = document.createElement('');

    const tdNome = document.createElement('');
    tdNome.textContent = p.;

    const tdCat = document.createElement('');
    tdCat.textContent = p.;

    const tdPreco = document.createElement('');
    tdPreco.textContent = formatarMoeda(p.);

    const tdQtde = document.createElement('');
    tdQtde.textContent = p.;

    const tdSub = document.createElement('');
    tdSub.textContent = formatarMoeda(p. * p.);

    const tdAcoes = document.createElement('');
    const btnRem = document.createElement('');
    btnRem.textContent = 'Remover';
    btnRem.className = 'outline';
    btnRem.addEventListener('click', () => removerProduto(p.id));
    tdAcoes.appendChild(btnRem);

    tr.append(tdNome, tdCat, tdPreco, tdQtde, tdSub, tdAcoes);
    tabelaBody.appendChild(tr);
  }

 
  let somaQtde = 0;
  let somaValor = 0;
  for(const p of produtos){
    somaQtde += p.;
    somaValor += p. * p.;
  }
  totalItensEl.textContent = somaQtde;
  valorTotalEl.textContent = formatarMoeda(somaValor);
}


function showMsg(texto){
  msg.textContent = texto;
  setTimeout(() => msg.textContent = '', 2200);
}


function removerProduto(id){
  produtos = produtos.filter(p => p.id !== id);
  salvar();
  render();
  showMsg('Produto removido.');
}


form.addEventListener('submit', (ev) => {
  ev.preventDefault();

  const nome = inputNome.value.trim();
  const categoria = selectCategoria.value;
  const preco = Number(inputPreco.value);
  const quantidade = parseInt(inputQtde.value, 10);

  
  if(!nome){
    showMsg('Informe o nome do produto.');
    inputNome.focus();
    return;
  }
  if(!Number.isFinite(preco) || preco < 0){
    showMsg('Preço inválido (deve ser ≥ 0).');
    inputPreco.focus();
    return;
  }
  if(!Number.isInteger(quantidade) || quantidade < 1){
    showMsg('Quantidade inválida (deve ser inteiro ≥ 1).');
    inputQtde.focus();
    return;
  }

 
  const produto = {
    id: Math.random().toString(36).slice(2,9), // id simples
    nome, categoria, preco, quantidade
  };

 
  produtos.push(produto);
  salvar();
  render();


  form.reset();
  inputQtde.value = 1;
  inputNome.focus();
  showMsg('Produto adicionado!');
});


busca.addEventListener('input', render);


btnLimparTudo.addEventListener('click', () => {
  if(confirm('Tem certeza que deseja apagar TUDO?')){
    produtos = [];
    salvar();
    render();
    showMsg('Lista limpa.');
  }
});


btnTema.addEventListener('click', () => {
  const dark = document.body.classList.toggle('dark');
  btnTema.setAttribute('aria-pressed', String(dark));
});


carregar();
render();

