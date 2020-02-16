
const formCaracteristicas = document.forms.containerCaracteristicas;

const containerElementoCriado = document.querySelector('.container-elemento-criado');

const btn = document.querySelector('.botao-css');

// text
// color
// backgroundColor 
// border 
// fontFamily 
// borderRadius 
// height 
// width 
// fontSize 

let handleStyle = {
    element: document.querySelector('.botao-css'),
    text(value){
        this.element.innerText = value;
        this.element.classList.remove('botao-css-giro');
    },
    color(value){
        this.element.style.color = value;
        this.element.classList.remove('botao-css-giro');
    },
    backgroundColor(value){
        this.element.style.backgroundColor = value;
        this.element.classList.remove('botao-css-giro');
    },
    border(value){
        this.element.style.border = value;
        this.element.classList.remove('botao-css-giro');
    },
    fontFamily(value){
        this.element.style.fontFamily = value;
        this.element.classList.remove('botao-css-giro');
    },
    borderRadius(value){
        this.element.style.borderRadius = value + '%';
        this.element.classList.remove('botao-css-giro');
    },
    height(value){
        this.element.style.height = value + 'px';
        this.element.classList.remove('botao-css-giro');
    },
    width(value){
        this.element.style.width = value + 'px';
        this.element.classList.remove('botao-css-giro');
    },
    fontSize(value){
        this.element.style.fontSize = value + 'px';
        this.element.classList.remove('botao-css-giro');
    }
}

function handleChange(e) {
    let propriedadeCss = e.target.name;
    let value = e.target.value;

    handleStyle[propriedadeCss](value);
    
}

formCaracteristicas.addEventListener('change', handleChange);

btn.addEventListener('click', () => {
    btn.classList.add('botao-css-giro');
    let texto = btn.innerText.split('');
    btn.innerText = '';
    texto.forEach( (caracter, index) => {
        setTimeout(() => {
            btn.innerText += caracter;
        }, 200 * index);
    });
});

