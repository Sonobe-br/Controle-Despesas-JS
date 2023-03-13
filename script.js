const transacoesUl = document.querySelector('#transacoes')
const mostraRenda = document.querySelector('#money-plus')
const mostraDespesa = document.querySelector('#money-minus')
const mostraBalanco = document.querySelector('#balance')
const formulario = document.querySelector('#formuulario')
const inserirNomeDaTransacao = document.querySelector('#text')
const inserirQuantidadeDeTransacao = document.querySelector('#amount')

/* let novasTransacoes = [   
    { id: 1, name: 'Plano de Saúde', quantidade: -650 },
    { id: 2, name: 'Salário', quantidade: 15000 },
    { id: 3, name: 'Seguro do Veículo', quantidade: -2110 },
    { id: 4, name: 'Combustivel', quantidade: 350 },
] */

const localDeArmazenamentoDasTransacoes = JSON.parse(localStorage
    .getItem('transacoes'))

let novasTransacoes = localStorage
    .getItem('transacoes') !== null ? localDeArmazenamentoDasTransacoes :[]    

const removeTransacao = ID => {
    novasTransacoes = novasTransacoes.filter(transacao => transacao.id !== ID)
    carregandoLocalStorage()
    init ()
}

const addTransacaoDOM = transacao => {
    const operador = transacao.quantidade < 0 ? '-' : '+'
    const CSSClasse = transacao.quantidade < 0 ? 'minus' : 'plus'
    const operadorSemQuantidade = Math.abs(transacao.quantidade)
    const li = document.createElement('li')

    li.classList.add(CSSClasse)
    li.innerHTML = `
        ${transacao.name} 
        <span>${operador} R$ ${operadorSemQuantidade}</span>
        <button class="delete-btn" onClick="removeTransacao(${transacao.id})">
            x
        </button>
    `
    transacoesUl
    .append(li)   
}

const updateBalancoValor = () => {
    const quantidadeDeTransacoes = novasTransacoes
        .map(transacao => transacao.quantidade) 
    
        const total = quantidadeDeTransacoes
        .reduce((acumulador, transacao) => acumulador + transacao, 0)
        .toFixed(2)
    
        const renda = quantidadeDeTransacoes
        .filter(value => value > 0)
        .reduce((acumulador, value) => acumulador + value, 0)
        .toFixed(2)
        
        const despesa = Math.abs(quantidadeDeTransacoes
        .filter(value => value < 0)
        .reduce((acumulador, value) => acumulador + value, 0))
        .toFixed(2)
    
    mostraBalanco.textContent = `R$ ${total}` 
    mostraRenda.textContent = `R$ ${renda}` 
    mostraDespesa.textContent = `R$ ${despesa}` 
    
    console.log (despesa)
}

const init = () => {
    transacoesUl.innerHTML = ''
    novasTransacoes.forEach(addTransacaoDOM)
    updateBalancoValor()
}

init ()

const carregandoLocalStorage = () => {
    localStorage.setItem('transacoes', JSON.stringify(novasTransacoes) )
}

const geradorID = () => Math.round(Math.random() * 1000)

form.addEventListener ('submit', event => {
    event.preventDefault()

    const nomeDaTransacao = inserirNomeDaTransacao.value.trim()
    const nomeDaQuantidade = inserirQuantidadeDeTransacao.value.trim()

    if (nomeDaTransacao === '' || nomeDaQuantidade === '') {
        alert('Por favor, preencha o nome e o valor da transação')
        return
    }

    const transacao = { 
        id: geradorID(), 
        name: nomeDaTransacao, 
        quantidade: Number(nomeDaQuantidade) 
    }
    
    novasTransacoes.push(transacao) 
    init()
    carregandoLocalStorage()

    inserirNomeDaTransacao.value = ''
    inserirQuantidadeDeTransacao.value = ''
} )