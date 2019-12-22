
/*
  Jogo da memoria
  autor: felipy Camargo.
*/

const containerJogo = document.querySelector('.container-jogo');
const containerCards = document.querySelector('.container-cards');

const iniciaJogo = () => {  
  
  //cria cards
  function criaCards(files){
    posicaoCards = geraPosicaoAleatoriaDosCards( files.length );
    let cards = [];
    let cardsViradosAcertados = {};
    let parVirado = false;

    let card1MostrandoVerso;
    let card2MostrandoVerso;

    function eventoAoClicarCard(card, posicao){

      if( !parVirado && !cardsViradosAcertados[card.style.backgroundImage] ){

        if( !card1MostrandoVerso && !card2MostrandoVerso ){
          card1MostrandoVerso = card;
          modificaClasseCard(card1MostrandoVerso, posicao);
        }else if( card1MostrandoVerso && !card2MostrandoVerso && card1MostrandoVerso !== card){
          card2MostrandoVerso = card;
          modificaClasseCard(card2MostrandoVerso, posicao);
          
          if( card1MostrandoVerso !== card2MostrandoVerso && card1MostrandoVerso.style.backgroundImage === card2MostrandoVerso.style.backgroundImage ){
            cardsViradosAcertados[card1MostrandoVerso.style.backgroundImage] = true;
            setTimeout( () => {
              card1MostrandoVerso = undefined;
              card2MostrandoVerso = undefined;
            },2000);
          }else{
            let parVirado = true;
            setTimeout( () => {
              modificaClasseCard(card1MostrandoVerso, posicao);
              modificaClasseCard(card2MostrandoVerso, posicao);
              card1MostrandoVerso = undefined;
              card2MostrandoVerso = undefined;
            },2000);
          }
  
        }

      }
    }

    function modificaClasseCard(card, posicao){
      if( card.classList.contains('card-frente') ){
        card.classList.add('card-verso'); 
        card.classList.remove('card-frente');
        card.style.backgroundImage = `url(${ files[posicao] })`; 
      }else if( card.classList.contains('card-verso') ){
        card.classList.add('card-frente');
        card.classList.remove('card-verso');
      }else{
        card.classList.add('card-verso');
        card.style.backgroundImage = `url(${ files[posicao] })`; 
      }
    }

    // cria cada cada card e coloca na div cards
    files.forEach( (imagem, index) => {
      let card1par = document.createElement('div');
      card1par.classList.add('card');
      let card2par = document.createElement('div');
      card2par.classList.add('card');
      
      let posicao1;
      let posicao2;

      posicao1 = posicaoCards.indexOf(index);
      cards[posicao1] = card1par;
      posicao2 = posicaoCards.lastIndexOf(index);
      cards[posicao2] = card2par;

      cards[posicao1].addEventListener('click', (e) => eventoAoClicarCard(e.currentTarget, index));
      cards[posicao2].addEventListener('click', (e) => eventoAoClicarCard(e.currentTarget, index));
    });

    cards.forEach( card => {
      containerCards.appendChild(card)
    });

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


  //apaga todos os cards do container cards
  function apagarTodosCards(){
    const cards = Array.from(containerCards.children);
    cards.map( card => {
      card.parentElement.removeChild(card);
    });
  }
  
    function adicionaImagensDefault(){
      let files = [];
      let contadora = 1;
      do{
        files.push(`./imagens/${contadora}-personagem.gif`);
        contadora++;
      }while( files.length <= 6 );
      apagarTodosCards();
      criaCards(files);
    }
    adicionaImagensDefault();

}

iniciaJogo();

addEventListener('load', () => {
  if( window.innerHeight > containerCards.clientHeight ){
    document.body.style.height = window.innerHeight + 'px';  
  }
})

addEventListener('resize', () => {
  if( window.innerHeight > containerCards.clientHeight ){
    document.body.style.height = window.innerHeight + 'px';  
  }
})
