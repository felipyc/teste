const inputTarefa = document.getElementById('input-adicionar-nova-tarefa');
const buttonAdicionarNovaTarefa = document.querySelector('.btn-adicionar-nova-tarefa');
const moldeTarefa = document.querySelector('.molde-tarefa');
const containerTarefas = document.querySelector('.container-tarefas');
const selecionarTodasTarefas = document.querySelector('.container-selecionar-todas-tarefas').children[0].children[0];
const botaoExcluirTodasTarefas = document.querySelector('.excluir-tudo');

let tarefaSendoEditada;
let valorOriginalDaTarefaAntesDeSerEditada;

selecionarTodasTarefas.addEventListener('click', function(){
    if(this.checked){
        Array.prototype.forEach.call(containerTarefas.children, (item) => {
            item.children[0].children[0].checked = true;
        });
    }else{
        Array.prototype.forEach.call(containerTarefas.children, (item) => {
            item.children[0].children[0].checked = false;
        });
    }
    
});

function adicionarNovaTarefa(){
    if(!tarefaSendoEditada){
        let containerTarefaBotaoExcluirEditar = moldeTarefa.children[0].cloneNode(true);
        let containerTarefa = containerTarefaBotaoExcluirEditar.children[1];
        let botaoEditar = containerTarefaBotaoExcluirEditar.children[2].children[0];
        let botaoExcluir = containerTarefaBotaoExcluirEditar.children[2].children[1];
        
        
        function excluirElemento(tarefa){
            if( !tarefaSendoEditada ){
                tarefa.parentElement.removeChild(tarefa);   
            }
        }
        botaoExcluir.addEventListener('click', () => excluirElemento(containerTarefaBotaoExcluirEditar));

        function editarElemento(e,containerTarefa){
            
            if( !tarefaSendoEditada ){
                valorOriginalDaTarefaAntesDeSerEditada = containerTarefa.innerText;
                tarefaSendoEditada = containerTarefa;

                let inputEditarTarefa = document.createElement('input');
                inputEditarTarefa.setAttribute('type', 'text');
                inputEditarTarefa.value = valorOriginalDaTarefaAntesDeSerEditada;
                inputEditarTarefa.setAttribute('autofocus','');
                containerTarefa.innerHTML = '';
                containerTarefa.appendChild(inputEditarTarefa);
                
            }else if(containerTarefa === tarefaSendoEditada){
                tarefaSendoEditada.innerHTML = tarefaSendoEditada.children[0].value;
                tarefaSendoEditada = null;
            }
        }
        botaoEditar.addEventListener('click', (e) => editarElemento(e,containerTarefa));



        containerTarefaBotaoExcluirEditar.children[1].innerHTML = inputTarefa.value; 
        containerTarefas.appendChild(containerTarefaBotaoExcluirEditar);
        inputTarefa.value = '';
    }

}
buttonAdicionarNovaTarefa.addEventListener('click', adicionarNovaTarefa);

botaoExcluirTodasTarefas.addEventListener('click', () => {
    
    let tarefas = Array.from(containerTarefas.children);

    tarefas.forEach(item => {
        if( item.children[0].children[0].checked.toString() === 'true' ){
            item.parentElement.removeChild(item);
            
        }
    });
});


//pegando as horas e mostrando
// var agora = new Date()
// var hora = agora.getHours()
// document.getElementById('horaDia').innerHTML = `Agora são ${hora} horas.`

// //mudança de fundo e imagem
// var fundo = document.getElementById('corFundoHoraDoDia');
// var imagem = document.getElementById('statusDiaImagem')
// if( hora > 18 || hora < 6 ){
//     document.getElementById('horaDia').innerHTML = `Agora ${hora == 1 || hora == 0 ?'é':'são'} ${hora} ${hora == 1 || hora == 0?'hora':'horas'}.`
//     imagem.style.backgroundImage = "url(assets/imagens/exerc-hora-do-dia/noite.jpg)";
//     fundo.style.backgroundColor = '#191B30';
// }else if( hora < 12  ){
//     imagem.style.backgroundImage = "url(assets/imagens/exerc-hora-do-dia/manha.jpg)";
//     fundo.style.backgroundColor = '#FED3A6';
// }else if( hora <= 18 ){
//     imagem.style.backgroundImage = "url(assets/imagens/exerc-hora-do-dia/tarde.jpg)";            
//     fundo.style.backgroundColor = '#36C2ED';
// }