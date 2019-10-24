var btnCalcula = document.getElementById('btnCalcula');
btnCalcula.addEventListener('click', function () {
    
    // pegando respostas do usuário
    var ano = new Date()
    var ano_atual = ano.getFullYear()
    var idade = Number(ano_atual) - Number(document.getElementById('ano_nascimento').value)
    var sexo = document.querySelector('input[name="pSexo"]:checked').value;
    
    //pegando as referências dos campos que vão ser alterados
    var descricao = document.getElementById('descricaoPessoa');
    var fotoPessoa = document.getElementById('fotoPessoa');

    //filtrando o resultado
    if( document.getElementById('ano_nascimento').value > ano.getFullYear() || document.getElementById('ano_nascimento').value == '' ){
        alert(`Ano inserido invalido ${document.getElementById('ano_nascimento').value}`);
    }else{
        fotoPessoa.style.width = '250px';
        fotoPessoa.style.height = '250px';
        if( idade == 0 ){
            descricao.innerText = 'Você é um bebê.';
            fotoPessoa.style.backgroundImage = 'url(assets/imagens/exerc-idade/bebe.jpg)';
        }
        else if( idade < 24 ){
            if(sexo == 'M' ){
                fotoPessoa.style.backgroundImage = 'url(assets/imagens/exerc-idade/homem-adolescente.jpg)';
            }else{  
                fotoPessoa.style.backgroundImage = 'url(assets/imagens/exerc-idade/mulher-adolescente.jpg)';
            }
            descricao.innerText = 'Você é um adolescente ou está perto de ser.';
        }else if( idade < 59 ){
            if(sexo == 'M' ){
                fotoPessoa.style.backgroundImage = 'url(assets/imagens/exerc-idade/homem-adulto.jpg)';
            }else{  
                fotoPessoa.style.backgroundImage = 'url(assets/imagens/exerc-idade/mulher-adulta.jpg)';
            }
            descricao.innerText = 'Você é um adulto.';
        }else{
            if(sexo == 'M' ){
                fotoPessoa.style.backgroundImage = 'url(assets/imagens/exerc-idade/idoso.jpg)';
            }else{
                fotoPessoa.style.backgroundImage = 'url(assets/imagens/exerc-idade/idosa.jpg)';
            }   
            descricao.innerText = 'Você passou dos 59 aproveita para investir em você.';
        }
    }   
} )