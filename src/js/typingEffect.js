const title = document.querySelector('.bannerTitle');
const subtitle = document.querySelector('.bannerSubtitle');
const logoEvent = document.querySelector('.logo');
const arrowUpEvent = document.querySelector('.arrowUp');

subtitle.classList.add('hidden'); //adiciona a classe com opacity 0 ao h2 para quando animação de digitação começar o elemento não começar visivel na tela.

// Função principal para criar o efeito de digitação
function animateTypingEffect (element, animateSubtitle){
    const originalHtml = element.innerHTML; //para preservar o estilo do span na segunda frase
    const textArray = element.textContent.split(''); //divide a frase em um array
    element.innerHTML = ""; 
    
    
    textArray.forEach((characters, index) => {
        setTimeout(function(){
            element.innerHTML += characters;
        }, 110 * index) 
    });
    
    // chama a função de callback (segunda frase) após a conclusão do efeito de digitação
    secondSentence(element, originalHtml, animateSubtitle, textArray);
};

//função efeito de digitação da segunda frase
function secondSentence(element, originalHtml, animateSubtitle, textArray){
    setTimeout(() => {
        if (animateSubtitle) animateSubtitle();
        element.innerHTML = originalHtml; // Após a conclusão da animação de digitação, restaura o HTML original do elemento (incluindo span com a estilização definida no css)
    }, 110 * textArray.length);
}

// Função para ativar o cooldown de clique do logo e da seta
let canClickLogo = false; // controlar o cooldown de 5 segundos
function activateClickCooldown(callback, cooldownTime = 5000) {
    setTimeout(()=>{
        canClickLogo = true;
    }, cooldownTime);
    
    return function () { // retorna uma nova função que gerencia o clique.
        if (!canClickLogo) return;
        
        canClickLogo = false;
        callback();// função da segunda frase
        
        setTimeout(() => {// Reativa a possibilidade de clicar após 5 segundos
            canClickLogo = true; 
        }, cooldownTime);
    };
};

// Função de callback para o clique no logo e na seta
const handleClick = activateClickCooldown(()=>{
    subtitle.classList.add('hidden');
    animateTypingEffect (title, animateSubtitle);
});

// Adiciona o evento de clique no logo e na seta do footer
logoEvent.addEventListener('click', handleClick);
arrowUpEvent.addEventListener('click', handleClick);

function animateSubtitle(){
    subtitle.classList.remove('hidden');
    animateTypingEffect (subtitle);
}

// Inicializa o efeito de digitação no carregamento da página
animateTypingEffect (title, animateSubtitle);
