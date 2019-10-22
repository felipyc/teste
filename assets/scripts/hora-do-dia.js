
//pegando as horas e mostrando
var agora = new Date()
var hora = agora.getHours()
document.getElementById('horaDia').innerHTML = `Agora são ${hora} horas.`

//mudança de fundo e imagem
var fundo = document.getElementById('corFundoHoraDoDia');
var imagem = document.getElementById('statusDiaImagem')
if( hora > 18 || hora < 6 ){
    document.getElementById('horaDia').innerHTML = `Agora ${hora == 1 || hora == 0 ?'é':'são'} ${hora} ${hora == 1 || hora == 0?'hora':'horas'}.`
    imagem.style.backgroundImage = "url(assets/imagens/exerc-hora-do-dia/noite.jpg)";
    fundo.style.backgroundColor = '#191B30';
}else if( hora < 12  ){
    imagem.style.backgroundImage = "url(assets/imagens/exerc-hora-do-dia/manha.jpg)";
    fundo.style.backgroundColor = '#FED3A6';
}else if( hora <= 18 ){
    imagem.style.backgroundImage = "url(assets/imagens/exerc-hora-do-dia/tarde.jpg)";            
    fundo.style.backgroundColor = '#36C2ED';
}