//referenciar o input o button e a lista

//input
let input = document.querySelector('input[name=tarefa]');

//btn
let btn = document.querySelector('#botao');

//lista
let lista = document.querySelector('#lista');


let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];



function render(){
    lista.innerHTML = ''
    for(tarefa of tarefas){
        let itemLista = document.createElement('li')

        itemLista.setAttribute('class', 'list-group-item list-group-item-action')

        itemLista.onclick = function(){
            deletarTarefa(this);
        }

        let itemTexto =document.createTextNode(tarefa);

        itemLista.appendChild(itemTexto);

        lista.appendChild(itemLista)
    }

}

render();


btn.onclick = function(){
    let novaTarefa = input.value;

    if(novaTarefa !== ""){
        tarefas.push(novaTarefa);

        render();

        input.value = '';

        removerSpan();

        Salvar();

    }else{

        removerSpan();

        let card = document.querySelector('.card');

        let span = document.createElement('span');

        span.setAttribute('class', 'alert alert-warning');

        let msg = document.createTextNode('Voce Precisa adicionar uma nova tarefa!')

        span.appendChild(msg);

        card.appendChild(span);
    }
    
}


function removerSpan(){
    let spans = document.querySelectorAll('span');

    let card = document.querySelector('.card');


    for(let i=0;i<spans.length;i++){
        card.removeChild(spans[i]);

    }
}


function deletarTarefa(tarefa){

    tarefas.splice(tarefas.indexOf(tarefa.textContent), 1)

    render();

    Salvar();

}


function Salvar(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}