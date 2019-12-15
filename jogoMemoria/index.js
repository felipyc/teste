const containerCards = document.querySelector('.container-cards');
const input = document.getElementById('imagens');
let posicaoCards;
let cards;
let files;
input.addEventListener('change', handleFileSelect, false);


//apaga todos os cards do container cards
function apagarTodosCards(){
  const cards = Array.from(containerCards.children);
  cards.map( card => {
    card.parentElement.removeChild(card);
  });
  input.value = null;
}

//gera posição aleatória dos cards
function geraPosicaoAleatoriaDosCards( quantidadeDeImagens ){
  let quantidadeDeCards = quantidadeDeImagens * 2;
  let cardPosicao1;
  let cardPosicao2;
  let imagemAleatoriaNumero;
  let todasOuAlgumaPosicaoUndefined = true;
  posicaoCards = [];
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
  cards = [];

  function eventoAoClicarCard(that, posicao){
    if( that.classList.contains('card-frente') ){
      that.classList.add('card-verso'); 
      that.classList.remove('card-frente');
      that.style.backgroundImage = `url(${URL.createObjectURL(files[posicao])})`;
    }else if( that.classList.contains('card-verso') ){
      that.classList.add('card-frente');
      that.classList.remove('card-verso');
    }else{
      that.classList.add('card-verso');
      that.style.backgroundImage = `url(${URL.createObjectURL(files[posicao])})`;
    }
  }

  files.map( (imagem, index) => {
    let card = document.createElement('div');
    card.classList.add('card');
    let card2 = document.createElement('div');
    card2.classList.add('card');
    let posicao1;
    let posicao2;
    if( posicaoCards.indexOf(index) === 0 ){
      posicao1 = posicaoCards.indexOf(index);
      cards[posicao1] = card;
      posicao2 = posicaoCards.lastIndexOf(index);
      cards[posicao2] = card2;

      cards[posicao1].addEventListener('click', () => eventoAoClicarCard(cards[posicao1], index));
      cards[posicao2].addEventListener('click', () => eventoAoClicarCard(cards[posicao2], index));
    }else{
      posicao1 = posicaoCards.indexOf(index);
      cards[posicao1] = card;
      posicao2 = posicaoCards.lastIndexOf(index);
      cards[posicao2] = card2;

      cards[posicao1].addEventListener('click', () => eventoAoClicarCard(cards[posicao1], index));
      cards[posicao2].addEventListener('click', () => eventoAoClicarCard(cards[posicao2], index));
    }
  });

  cards.map( card => {
    containerCards.appendChild(card)
  });
}

//recebe imagens do input
function handleFileSelect(evt) {
  let files = Array.from(evt.target.files);
  apagarTodosCards();
  criaCard(files);
}

  

