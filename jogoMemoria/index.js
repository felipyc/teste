
/*
  Jogo da memoria
  autor: felipy Camargo.
*/

const containerCards = document.querySelector('.container-cards');
const input = document.getElementById('imagens');
input.addEventListener('change', handleFileSelect, false);
let imagensDefaultSendoUsadas = false;
let cardsViradosAcertados = {};

function verificaCardViradoEIgual(card1MostrandoVerso = '', card2MostrandoVerso = ''){
  if( card1MostrandoVerso.style.backgroundImage === card2MostrandoVerso.style.backgroundImage ){
    if( !cardsViradosAcertados[card1MostrandoVerso.style.backgroundImage]){
      cardsViradosAcertados[card1MostrandoVerso.style.backgroundImage] = true;
      card1MostrandoVerso.style.boxShadow = '0 0 5px red';
      card2MostrandoVerso.style.boxShadow = '0 0 5px red';
    }
  }
}


//gera posição aleatória dos cards
function geraPosicaoAleatoriaDosCards( quantidadeDeImagens ){
  let quantidadeDeCards = quantidadeDeImagens * 2;
  let cardPosicao1;
  let cardPosicao2;
  let imagemAleatoriaNumero;
  let todasOuAlgumaPosicaoUndefined = true;
  let posicaoCards = [];
  do{
    todasOuAlgumaPosicaoUndefined = false;
    cardPosicao1 = Math.floor( Math.random() * quantidadeDeCards );
    cardPosicao2 = Math.floor( Math.random() * quantidadeDeCards );
    imagemAleatoriaNumero = Math.floor( Math.random() * quantidadeDeImagens );
    //posicaoCards.indexOf(imagemAleatoriaNumero) === -1 && posicaoCards.lastIndexOf(imagemAleatoriaNumero)
    //cardPosicao1 !== cardPosicao2
    //( posicaoCards[cardPosicao1] === undefined && posicaoCards[cardPosicao2] === undefined )
    if( posicaoCards[cardPosicao1] === undefined && posicaoCards[cardPosicao2] === undefined ){
      if( cardPosicao1 !== cardPosicao2 ){
        if( posicaoCards.indexOf(imagemAleatoriaNumero) === -1){
          posicaoCards[cardPosicao1] = imagemAleatoriaNumero;
          posicaoCards[cardPosicao2] = imagemAleatoriaNumero;
        }
      }
    }

    for (var i = 0; i < quantidadeDeCards; i++) {
      if( posicaoCards[i] === undefined){
        todasOuAlgumaPosicaoUndefined = true;
      }
    }  
  }while( todasOuAlgumaPosicaoUndefined );
  return posicaoCards;
}

//cria cards
function criaCard(files){
  posicaoCards = geraPosicaoAleatoriaDosCards( files.length );
  let cards = [];
  let card1MostrandoVerso;
  let card2MostrandoVerso

  function eventoAoClicarCard(that, imagem, posicao){
    
    const modificaClasseCard = that => {
      if( that.classList.contains('card-frente') ){
        that.classList.add('card-verso'); 
        that.classList.remove('card-frente');
        if( imagensDefaultSendoUsadas ){
          that.style.backgroundImage = `url(${ files[posicao] })`; 
        }else{
          that.style.backgroundImage = `url(${imagem})`;
        }
      }else if( that.classList.contains('card-verso') ){
        that.classList.add('card-frente');
        that.classList.remove('card-verso');
      }else{
        that.classList.add('card-verso');
        if( imagensDefaultSendoUsadas ){
          that.style.backgroundImage = `url(${ files[posicao] })`; 
        }else{
          that.style.backgroundImage = `url(${imagem})`;
        }
      }
    }

    if( that === card1MostrandoVerso || that === card2MostrandoVerso){
      if( that === card1MostrandoVerso && card2MostrandoVerso ){
        modificaClasseCard(card1MostrandoVerso);
        modificaClasseCard(card2MostrandoVerso);
      }else if( that === card2MostrandoVerso && card1MostrandoVerso ){
        modificaClasseCard(card1MostrandoVerso);
        modificaClasseCard(card2MostrandoVerso);
      }else if( that === card1MostrandoVerso ){
        modificaClasseCard(card1MostrandoVerso);
      }else if(  that === card2MostrandoVerso  ){
        modificaClasseCard(card2MostrandoVerso);
      }
      card1MostrandoVerso = undefined;
      card2MostrandoVerso = undefined;
    }else if( !card1MostrandoVerso ){
      card1MostrandoVerso = that;
      modificaClasseCard(card1MostrandoVerso);
    }else if( !card2MostrandoVerso ){
      card2MostrandoVerso = that;
      modificaClasseCard(card2MostrandoVerso);
    }else if( card1MostrandoVerso && card2MostrandoVerso ){
      verificaCardViradoEIgual(card1MostrandoVerso, card2MostrandoVerso);
      if( !cardsViradosAcertados[card1MostrandoVerso.style.backgroundImage] ){
        card1MostrandoVerso.classList.remove('card-verso');
        card1MostrandoVerso.classList.add('card-frente');
        card2MostrandoVerso.classList.remove('card-verso');
        card2MostrandoVerso.classList.add('card-frente');
      }
      modificaClasseCard(that);
      card1MostrandoVerso = that;
      card2MostrandoVerso = undefined;
    }

  }

  files.map( (imagem, index) => {
    let card = document.createElement('div');
    card.classList.add('card');
    let card2 = document.createElement('div');
    card2.classList.add('card');
    let posicao1;
    let posicao2;
    if( !imagensDefaultSendoUsadas ){
      imagem = URL.createObjectURL(imagem);
    }

    if( posicaoCards.indexOf(index) === 0 ){
      posicao1 = posicaoCards.indexOf(index);
      cards[posicao1] = card;
      posicao2 = posicaoCards.lastIndexOf(index);
      cards[posicao2] = card2;
      cards[posicao1].addEventListener('click', () => eventoAoClicarCard(cards[posicao1], imagem, index));
      cards[posicao2].addEventListener('click', () => eventoAoClicarCard(cards[posicao2], imagem, index));
    }else{
      posicao1 = posicaoCards.indexOf(index);
      cards[posicao1] = card;
      posicao2 = posicaoCards.lastIndexOf(index);
      cards[posicao2] = card2;

      cards[posicao1].addEventListener('click', () => eventoAoClicarCard(cards[posicao1], imagem, index));
      cards[posicao2].addEventListener('click', () => eventoAoClicarCard(cards[posicao2], imagem, index));
    }
  });

  cards.map( card => {
    containerCards.appendChild(card)
  });
}

//apaga todos os cards do container cards
function apagarTodosCards(){
  const cards = Array.from(containerCards.children);
  cards.map( card => {
    card.parentElement.removeChild(card);
  });
  input.value = null;
}

//recebe imagens do input
function handleFileSelect(evt) {
  imagensDefaultSendoUsadas = false;
  let files = [];
  files = Array.from(evt.target.files);
  apagarTodosCards();
  criaCard(files);
}

function adicionaImagensDefault(){
  let files = [];
  let contadora = 1;
  imagensDefaultSendoUsadas = true;
  do{
    files.push(`./imagens/${contadora}-personagem.gif`);
    contadora++;
  }while( files.length <= 6 );
  criaCard(files);
}

adicionaImagensDefault();

  

