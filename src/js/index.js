
//arrumar a scrollbar
//refatorar o codigo de clique fora do menu


// 9 adicionar o curriculo / fazer o curriculo
// testar o hover dos links no mobile
// testar o hover dos projetos no mobile
// testar em outros navegadores
// colocar os projetos
// testar no celular


//-----------------------efeito de digitação do banner
const title = document.querySelector('.bannerTitle');
const subtitle = document.querySelector('.bannerSubtitle');
const logoEvent = document.querySelector('.logo');
const arrowUpEvent = document.querySelector('.arrowUp')

subtitle.classList.add('hidden'); //adiciona a classe com opacity 0 ao h2 para quando animação de digitação começar o elemento não começar visivel na tela.

// Função para criar o efeito de digitação (typewriter) em um elemento de texto------------
function typeWriter(element, callback){
    const originalHtml = element.innerHTML; //para preservar o span na segunda frase
    const textArray = element.textContent.split(''); // Divide o texto do conteúdo do elemento em um array de caracteres
    element.innerHTML = ""; // Limpa o conteúdo HTML do elemento para iniciar o efeito de digitação
    
    // Para cada caractere no array de texto, adiciona-o ao conteúdo do elemento com um atraso definido
    textArray.forEach((characters, index) => {
        setTimeout(function(){
            element.innerHTML += characters;
        }, 110 * index) // O tempo de atraso aumenta proporcionalmente ao índice do caracter
    });
    
    // chama a função de callback fornecida após a conclusão do efeito de digitação
    setTimeout(() => {
        if (callback) callback();
        element.innerHTML = originalHtml; // Após a conclusão da animação de digitação, restaura o HTML original do elemento (incluindo span com a estilização definida no css)
    }, 110 * textArray.length);
};


// Função para ativar o cooldown de clique do logo e da seta------------------
function activateClickCooldown(callback) {
    let canClickLogo = false; // Flag para controlar o cooldown de 5 segundos
    setTimeout(()=>{// setTimeout para só permitir o clique apos 5 segundos depois que a página for carregada pela primeira vez
        canClickLogo = true;
    }, 5000);

    return function () { // retorna uma nova função que gerencia o clique.
        if (!canClickLogo) return;
        canClickLogo = false; // Se canClick é false, a função não faz nada e retorna imediatamente.

        callback();// Executa callback: Chama a função passada como argumento

        setTimeout(() => {// Reativa a possibilidade de clicar após 5 segundos
            canClickLogo = true; 
        }, 5000);
    };
};

// Função de callback para o clique no logo e na seta
const handleClick = activateClickCooldown(()=>{
    subtitle.classList.add('hidden');
    typeWriter(title, function() {
        subtitle.classList.remove('hidden');
        typeWriter(subtitle);
    });
});

// Adiciona o evento de clique no logo
logoEvent.addEventListener('click', handleClick);

// Adiciona o evento de clique na seta do footer
arrowUpEvent.addEventListener('click', handleClick);

// Inicializa o efeito de digitação no carregamento da página
typeWriter(title, function() {
    subtitle.classList.remove('hidden');
    typeWriter(subtitle);
});


//-------------------transição dos conteudo usando scrollbarr-----------

document.addEventListener("DOMContentLoaded", function () { // evento que será executado quando o documento html for completamente carregado
    const generalObserver = new IntersectionObserver((entries) => { // observará mudanças de visibilidade em elementos da página.
        
        entries.forEach((entry) => { // entry contém informações sobre o elemento observado
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }else if (!entry.isIntersecting) {
                entry.target.classList.remove("visible");    
            }
        });
    },{
        threshold: 0.3 // Define que o callback será acionado quando 30% do elemento estiver visível na viewport
    });
    
    const projectsObserver = new IntersectionObserver((entries) => { //específico para observar a seção de projetos.
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }else if (!entry.isIntersecting) {
                entry.target.classList.remove("visible");    
            }
        });
    },{
        threshold: 0.1 // Define que o callback será acionado quando 10% do elemento estiver visível na viewport
    });

    const generalContents = document.querySelectorAll(".content");
    generalContents.forEach((content) => { //monitorará esses elementos e aplicará a lógica de visibilidade definida no callback.
        generalObserver.observe(content);
    });

    const projectsContent = document.querySelector(".contentProjects");
    
    if (projectsContent) {  //Verifica se o elemento com a classe .contentProjects existe na página
        projectsObserver.observe(projectsContent); // se estiver existe na página então aplica as regras de visibilidade específicas para a seção de projetos.
    }
});
//---------------------------------------------------------------------------------------


//-----------------------------clique fora do menu---------------------------------------
document.addEventListener("click", function(event) {
    const btnMenuMobile = document.querySelector('.menuMobile'); //container dos icones do menu mobile
    const btnMenuSpan = document.querySelector('.menuIcon'); // span que compoe o menu mobile (icones)
    const checkboxMenuMobile = document.getElementById('mobile-menu-toggle'); // checkbox que é marcado quando o 'botão' do menu é clicado *ele faz o menu ser aberto e fechado usando css*
    const menuMobile = document.querySelector('.menuList'); // toda a area do menu do mobile
    const darkModeBtn = document.querySelector('.darkModeBtn')
    
    
    if (!btnMenuMobile.contains(event.target) && !btnMenuSpan.contains(event.target) && !checkboxMenuMobile.contains(event.target) && !menuMobile.contains(event.target) && !darkModeBtn.contains(event.target) ) {
        if (checkboxMenuMobile.checked) {
            checkboxMenuMobile.checked = false;
        }
    }
});


//-------------------------------criando o card dos projetos-------
const projectsCardsContainer = document.querySelector('.projectsContainer');
const closeModalButton = document.querySelector('.closeButton');

async function fetchProjects (){ // faz a requisição ao arquivo json
    const response = await fetch('/src/data/projects.json')
    return await response.json();
}

function createTechnologiesIcons(technologies) { //função para criar os icones do projeto em relação a quantidade de icones que cada projeto possui
    return technologies.map(icon => `<i class="fab fa-${icon}"></i>`).join('');
}

// Itera sobre cada projeto nos dados retornados
async function createCards() {
    const data = await fetchProjects();

    data.forEach(project => { //para cada projeto...
        const projectName = project.name;
        const projectDescription = project.description;
        const projectImages = project.image;
        const projectId = project.id;
        const technologiesIcons = createTechnologiesIcons(project.technologies); //armazeno em uma variavel os icones
        
        // Cria um elemento 'div' para o card do projeto
        const projectCard = document.createElement('div');
        projectCard.className = 'projectCard';
        projectCard.id =`${projectId}`
        projectCard.style.backgroundImage = `url(${projectImages})`// Define a imagem de fundo do card

        // Define o conteúdo HTML interno do card
        projectCard.innerHTML += `
                                    <h3 class="projectName">${projectName}</h3>
                                    <div class="projectIcons">
                                        ${technologiesIcons}
                                    </div>
                                    <div class="projectDetails">
                                        <p>${projectName}</p>
                                        <input class="btnModalOpen" type="button" value="Ver Mais">
                                    </div>
                                ` 
        // Adiciona um evento de clique ao card para abrir o modal com os detalhes do projeto
        projectCard.addEventListener('click', () => openModal(project));

        // Adiciona o card criado ao container dos cards na página
        projectsCardsContainer.appendChild(projectCard);

    });
    // Adiciona um evento de clique ao botão de fechar o modal, verificando se o alvo é o botão correto
    closeModalButton.addEventListener('click', function(event) {
        if (event.target.closest('.closeButton')) {
            closeModal();
        }
    });
}

//------------------------------------funções para abrir e fechar o modal
// Função para abrir o modal com as informações do projeto selecionado
function openModal(project) {
    const overlay = document.querySelector('.overlay');
    const modal = document.querySelector('.modal'); 

    const technologiesIcons = createTechnologiesIcons(project.technologies);// Cria os ícones das tecnologias usadas no projeto
    
    // Atualiza o conteúdo do modal com as informações do projeto
    modal.querySelector('.modalImage').src = project.image;
    modal.querySelector('.linkSite').href = project.linkSite;
    modal.querySelector('.linkRepositorio').href = project.linkRepositorio;
    modal.querySelector('.modalTitle').innerHTML = project.name;
    modal.querySelector('.modalDescription').innerHTML = project.description;
    modal.querySelector('.modalIcons').innerHTML = technologiesIcons

    // Exibe o overlay e o modal adicionando uma classe que os torna visíveis
    overlay.classList.add('show')
    modal.classList.add('show')

     // Define a opacidade para 1 após um breve atraso para a transição de opacidade ocorrer suavemente
    setTimeout(() => {
        overlay.style.opacity = '1';
        modal.style.opacity = '1';
    }, 10);

}
// Função para fechar o modal
function closeModal(){
    const overlay = document.querySelector('.overlay');
    const modal = document.querySelector('.modal');
    
    // Reduz a opacidade para 0 para iniciar a transição de fechamento
    overlay.style.opacity = '0';
    modal.style.opacity = '0';
    
    // Espera a transição terminar antes de esconder completamente
    setTimeout(() => {
        overlay.classList.remove('show');
        modal.classList.remove('show');
    }, 500); // Tempo deve corresponder à duração da transição
};

//fecha o modal se o usuario clicar fora dele
document.querySelector('.overlay').addEventListener('click', (event) => {
    const modal = document.querySelector('.modal');
    
    // Verifica se o clique foi fora do modal
    if (!modal.contains(event.target)) {
        closeModal();
    }
});

// Chama a função createCards() para iniciar o processo de criação dos cards na página
createCards();

//--------------------------------botão darkmode
const darkModeBtn = document.querySelector('.darkModeBtn');
const spanBtn = document.querySelector('.dark');
const icons = document.querySelectorAll('.iconLink i');
const footer = document.querySelector('.footer');
const arrow = document.querySelector('.arrowUp');
const modal = document.querySelector('.modal');

// Estado inicial do botão, falso indica que o dark mode está ativado por padrão
let btnState = false

// Função para alternar entre dark mode e light mode
const toggleMode = () => {
    darkModeBtn.classList.toggle('lightMode', !btnState);
    spanBtn.classList.toggle('light', !btnState);
    document.body.classList.toggle('bodyLightMode', !btnState); 
    icons.forEach(icon => icon.classList.toggle('ColorLightMode', !btnState));// Alterna a classe 'ColorLightMode' em cada ícone para mudar sua cor
    footer.classList.toggle('footerLightMode', !btnState);
    arrow.classList.toggle('arrowLightMode', !btnState);
    modal.classList.toggle('modalLightMode', !btnState);

    // Inverte o estado do botão para refletir a mudança de modo
    btnState = !btnState;
  };
  // Adiciona um evento de clique no botão para alternar entre dark mode e light mode
  darkModeBtn.addEventListener('click', toggleMode);


