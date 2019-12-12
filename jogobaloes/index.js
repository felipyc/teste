

const containerGame = document.querySelector('.container-game');
const pontosElement = document.querySelector('.pontos-valor');
const vidasElement = document.querySelector('.vidas-valor');
const botaoIniciarJogo = document.querySelector('.iniciar-jogo');
let pontos = 0;
let vidas = 0;



function iniciarJogo(e){
    e.target.style.display = 'none';
    botaoIniciarJogo.innerHTML = 'Reiniciar jogo';
    vidas = 10;
    pontos = 0;
    vidasElement.innerHTML = vidas;
    pontosElement.innerHTML = pontos;
}

botaoIniciarJogo.addEventListener('click', iniciarJogo);

let verificaJogadorEstaJogando = setInterval( function(){
    if( vidas === 0 ){
        botaoIniciarJogo.style.display = 'block';
    }else{
        criarBalaoMudaPosicaoBalaoDinamicamente();
    }
}, 1000 );

function alteraPontos(){
    pontosElement.innerHTML = ++pontos;    
}

function alteraVidas(){
    vidasElement.innerHTML = --vidas;    
}

function criarBalaoMudaPosicaoBalaoDinamicamente(){
    const balao = document.createElement('div');
    const dimensaoBalao = Math.floor(window.innerWidth * 0.15);
    const min = 1;
    const max = 3;
    const randomBalao = Math.floor(Math.random() * (max - min + 1)) + min;
    let posicaoBalaoXY = {...geraPosicaoBalao()};
    let posicaoBalaoDinamica = setInterval( moveBalao, .1);
    
    balao.style.backgroundImage = `url('balao-${randomBalao}.png')`;
    balao.style.width = `${dimensaoBalao}px`;
    balao.style.height = `${dimensaoBalao}px`;
    balao.classList.add('balao');
    
    balao.style.top = `${posicaoBalaoXY.posicaoBalaoY}`;
    balao.style.left = `${posicaoBalaoXY.posicaoBalaoX}`;

    containerGame.appendChild(balao);

    //gera novas posicoes para cada balao e altera a vida se caso passar do topo
    function moveBalao(){
        let posicaoBalaoY = +balao.style.top.replace('px', '');
        balao.style.top = `${posicaoBalaoY-1}px`;
        if( balao.offsetTop === -dimensaoBalao){
            balao.parentElement.removeChild(balao);
            clearInterval(posicaoBalaoDinamica);
            if( vidas !== 0 ){
                alteraVidas();
            }
        }
    }

    //adiciona pontos
    balao.addEventListener('click', function(){
        if( vidas !== 0 ){
            alteraPontos()
            balao.parentNode.removeChild(balao);
        }
    }
    );
}

function geraPosicaoBalao(){
    const larguraTela = window.innerWidth;
    const alturaTela = window.innerHeight;
    const dimensaoBalao = Math.floor(window.innerWidth * 0.15);

    let posicaoBalaoX;
    let larguraTelaMenosDimensaoBalao;

    do{
        posicaoBalaoX = Math.floor(Math.random() * larguraTela + 1);
        larguraTelaMenosDimensaoBalao = larguraTela - dimensaoBalao;
    }while( larguraTelaMenosDimensaoBalao < posicaoBalaoX );

    let posicaoBalaoY = alturaTela;

    return {posicaoBalaoX: `${posicaoBalaoX}px`, posicaoBalaoY: `${posicaoBalaoY}px`};
}