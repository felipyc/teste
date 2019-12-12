//script pulo
        
document.getElementById("btnContador").addEventListener("click", conta)
        
function conta(){
    //numero da tabuada
    var numeroTabuada = Number(document.getElementById('numeroTabuada').value)
    //resultado
    var resultado = document.getElementById('resultado-contador')
    //contador
    if( numeroTabuada < 0 || numeroTabuada == '' ){
        alert('Por favor, digite um número')
    }else{
        resultado.style.display = 'inline-block'
        resultado.innerHTML = ''
        for( var c = 1 ; c <= 10 ; c++ ){
            var option = document.createElement('option')
            var text = document.createTextNode(` ${numeroTabuada} x ${c} = ` + numeroTabuada * c)
            option.appendChild(text)
            resultado.appendChild(option)
        }
    }
}