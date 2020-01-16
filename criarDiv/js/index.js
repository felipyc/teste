
const formCaracteristicas = document.forms.containerCaracteristicas;

const containerElementoCriado = document.querySelector('.container-elemento-criado');

// text
// color
// background-color 
// height 
// width 
// border 
// border-radius 
// font-family 
// font-size 


console.log( containerElementoCriado.children.length );

function handleChange() {
    let inputs =  Array.from(this.elements);
    let propriedadesCss = ['','color','background-color','border','font-family','border-radius','height','width','font-size'];
    let propriedadesCssDoNovoElemento = '';
    
    
    
    if( containerElementoCriado.children.length === 1 ){
        containerElementoCriado.children[0].remove();
    }
    

    inputs.forEach( (input, index) => {
        if( index !== 0){
            if( index >= 6  ){
                propriedadesCssDoNovoElemento += `${propriedadesCss[index]}: ${input.value}px;`;
            }else if( index === 5 ){
                propriedadesCssDoNovoElemento += `${propriedadesCss[index]}: ${input.value}%;`;
            }else{
                propriedadesCssDoNovoElemento += `${propriedadesCss[index]}: ${input.value};`;
            }
        }
    });

    let newDiv = document.createElement('div');
    newDiv.innerText = inputs[0].value;
    newDiv.style.cssText = propriedadesCssDoNovoElemento;

    containerElementoCriado.appendChild(newDiv);
    

    

}

formCaracteristicas.addEventListener('change', handleChange);

