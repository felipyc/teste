//script pulo
        
document.getElementById("btnConta").addEventListener("click", conta)
        
function conta(){
    //inicio
    var inicio = Number(document.getElementById('inicio').value)

    //fim
    var fim = Number(document.getElementById('fim').value)

    //passo
    var passo = Number(document.getElementById('passo').value)

    //resultado
    var resultado = document.getElementById('resultado')
    
    //contador
    if( inicio < 0 || fim < 0  || passo < 1 ){
        alert('Impossível contar.')
    }else{
        resultado.innerText = ''
        for(  ; inicio <= fim ; inicio = inicio + passo ){
            var novoTexto = document.createElement('span')
            if( inicio >= fim){
                novoTexto.innerHTML = inicio
            }else{
                novoTexto.innerHTML = inicio + '&nbsp; &#128073;&#127999; &nbsp;'
            }               
            resultado.appendChild(novoTexto)
            
        }
    }
}