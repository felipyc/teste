

const inputNovaTarefa = document.querySelector('.input-nova-tarefa');
const buttonNewTarefa = document.querySelector('.button-criar-nova-tarefa');
const containerTarefasCriadas = document.querySelector('.container-tarefas-criadas');
let tarefaSendoEditada = false;

buttonNewTarefa.addEventListener('click', criarNovaTarefa);

function criarNovaTarefa(){
    if ( inputNovaTarefa.value.length !== 0 && !tarefaSendoEditada ) {
        const moldeTarefa = document.querySelector('.molde .container-status-tarefa-actions');
        const tarefa = moldeTarefa.cloneNode(true);
    
        tarefa.querySelector('.tarefa-criada-texto').innerHTML = inputNovaTarefa.value;
        inputNovaTarefa.value = '';

        adicionarActions(tarefa);
        modificarStatus(tarefa)

        containerTarefasCriadas.appendChild(tarefa);
    }

    function modificarStatus(tarefa) {
        const iconChecked = tarefa.querySelector('.status-tarefa i');
        iconChecked.addEventListener('click', function(){
            if( !tarefaSendoEditada ) {
                if( !iconChecked.hasAttribute('data-checked') ) {
                    iconChecked.classList.remove('fa-square-o');
                    iconChecked.classList.add('fa-check-square-o');
                    tarefa.classList.add('tarefa-feita');
                    iconChecked.dataset.checked = '';
                }
                else {
                    iconChecked.classList.remove('fa-check-square-o');
                    iconChecked.classList.add('fa-square-o'); 
                    tarefa.classList.remove('tarefa-feita')
                    delete iconChecked.dataset.checked;
                } 
            }else {
                this.checked = false;
            }
        });
    }
    
    function adicionarActions(tarefa) {
        const editar = tarefa.querySelector('.actions .editar');
        const excluir = tarefa.querySelector('.actions .excluir');
        const tarefaTexto = tarefa.querySelector('.tarefa-criada-texto');
    
        editar.addEventListener('click', function() {
            if( !tarefaSendoEditada || tarefaTexto.hasAttribute('data-editando')) {
                if ( !tarefaTexto.hasAttribute('data-editando') ) {
                    tarefaTexto.dataset.editando =  '';
                    
                    let input = document.createElement('input');
                    input.setAttribute('type', 'text');
                    input.setAttribute('class', 'input-editar-tarefa');
                    input.value = tarefaTexto.innerHTML;
        
                    tarefaTexto.innerHTML = '';
                    tarefaTexto.appendChild(input);
                    tarefaSendoEditada = true;
                }else {
                    delete tarefaTexto.dataset.editando;
                    tarefaTexto.innerHTML = tarefaTexto.querySelector('input').value;
                    tarefaSendoEditada = false;
                }
            }
        });
    
        excluir.addEventListener('click', function(){
            if( !tarefaSendoEditada ) 
                tarefa.remove();
        });
    
    }
}

function verificaTarefasConcluidas() {
    const containerTodasTarefasConcluidas = document.querySelector('.container-tarefas-concluidas-ate-agora');

    let loopVerificaTarefasConcluidas = setInterval(() => {
        let todasTarefasConcluidas = document.querySelectorAll('.tarefa-feita');
        if ( todasTarefasConcluidas.length )
            containerTodasTarefasConcluidas.innerHTML = `<i class="fa fa-check-square-o" aria-hidden="true" data-checked=""></i>&nbsp;${todasTarefasConcluidas.length}`;
        else {
            containerTodasTarefasConcluidas.innerHTML = '';
        }
    }, 0);
}
verificaTarefasConcluidas();
