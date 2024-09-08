const title = document.querySelector('.bannerTitle');
const subtitle = document.querySelector('.bannerSubtitle');
const logoEvent = document.querySelector('.logo');
const arrowUpEvent = document.querySelector('.arrowUp');

subtitle.classList.add('hidden'); //adiciona a classe com opacity 0 ao h2 para quando animação de digitação começar o elemento não começar visivel na tela.

//---------------------------------efeito de digitação do banner----------------------
// Função principal para criar o efeito de digitação
function animateTypingEffect (element, animateSubtitle){
    const originalHtml = element.innerHTML; //para preservar o estilo do span na segunda frase
    const textArray = element.textContent.split('');
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

//-------------------------------------------------------------------

//-------------------transição dos conteudo usando scrollbar-----------
document.addEventListener("DOMContentLoaded", function () {
    const generalObserver = new IntersectionObserver((entries) => { 
        entries.forEach((entry) => { // entry contém informações sobre o elemento observado
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }else if (!entry.isIntersecting) {
                entry.target.classList.remove("visible");    
            }
        });
    },{
        threshold: 0.3
    });
    
    const projectsObserver = new IntersectionObserver((entries) => { //específico para a section de projetos.
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }else if (!entry.isIntersecting) {
                entry.target.classList.remove("visible");    
            }
        });
    },{
        threshold: 0.1 
    });

    const generalContents = document.querySelectorAll(".scrollAnimate");
    generalContents.forEach((content) => { // aplicara a lógica de visibilidade da callback.
        generalObserver.observe(content);
    });

    const projectsContent = document.querySelector(".scrollAnimateProjects");
    
    if (projectsContent) { 
        projectsObserver.observe(projectsContent); // aplica as regras de visibilidade específicas para a section de projetos.
    }
});
//---------------------------------------------------------------------------

//----------------------------criando o card dos projetos-------------------
const projectsCardsContainer = document.querySelector('.projectsContainer');

async function fetchProjects() {
    try {
        const response = await fetch("projects.json");
        if (!response.ok) throw new Error('Erro ao buscar os projetos');
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar os projetos:', error);
        return []; // Retorna um array vazio como fallback
    }
}

async function createCards() {
    const data = await fetchProjects();
    data.forEach(project => createProjectCard(project));
}

function createProjectCard(project){
    const projectCard = document.createElement('div');
    projectCard.className = 'projectCard';
    projectCard.id =`${project.id}`
    projectCard.style.backgroundImage = `url(${project.image})`

    const cardContent = generateCardContent(project)
    projectCard.innerHTML = cardContent
    
    // Adiciona um evento de clique ao card para abrir o modal com os detalhes do projeto
    projectCard.addEventListener('click', () => openModal(project));

    // Adiciona o card criado ao container dos cards na página
    projectsCardsContainer.appendChild(projectCard);
}

function createTechnologiesIcons(technologies) { //função para criar os icones do projeto em relação a quantidade de icones que cada projeto possui
    return technologies.map(icon => `<i class="fab fa-${icon}"></i>`).join('');
}

function generateCardContent(project){
    const technologiesIcons = createTechnologiesIcons(project.technologies);
    return `
            <h3 class="projectName">${project.name}</h3>
            <div class="projectIcons">
                ${technologiesIcons}
            </div>
            <div class="projectDetails">
                <p>${project.name}</p>
                <input class="btnModalOpen" type="button" value="Ver Mais">
            </div>
            ` 
        
}

createCards();

//------------------------------------funções para abrir e fechar o modal
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal'); 
const closeModalButton = document.querySelector('.closeButton');

function openModal(project) {
    const technologiesIcons = createTechnologiesIcons(project.technologies);// Cria os ícones das tecnologias usadas no projeto
    
    modal.querySelector('.modalImage').src = project.image;
    modal.querySelector('.linkSite').href = project.linkSite;
    modal.querySelector('.linkRepositorio').href = project.linkRepositorio;
    modal.querySelector('.modalTitle').innerHTML = project.name;
    modal.querySelector('.modalDescription').innerHTML = project.description;
    modal.querySelector('.modalIcons').innerHTML = technologiesIcons

    overlay.classList.add('show')
    modal.classList.add('show')

     // Define a opacidade para 1 após um atraso para a transição de opacidade acontecer
    setTimeout(() => {
        overlay.style.opacity = '1';
        modal.style.opacity = '1';
    }, 10);
}

function closeModal(){
    overlay.style.opacity = '0';
    modal.style.opacity = '0';
    
    // Espera a transição terminar antes de adicionar display none
    setTimeout(() => {
        overlay.classList.remove('show');
        modal.classList.remove('show');
    }, 500);
};

// fecha o modal ao clicar no 'X'
closeModalButton.addEventListener('click', function(event) {
    if (event.target.closest('.closeButton')) {
        closeModal();
    }
});

//fecha o modal se o usuario clicar fora dele
document.querySelector('.overlay').addEventListener('click', (event) => {
    const modal = document.querySelector('.modal');
    if (!modal.contains(event.target)) {
        closeModal();
    }
});

//-----------------------------clique fora do menu mobile----------------------------
document.addEventListener("click", function(event) {
    const btnMenuMobile = document.querySelector('.menuMobile'); 
    const btnMenuSpan = document.querySelector('.menuIcon'); 
    const checkboxMenuMobile = document.getElementById('mobile-menu-toggle'); 
    const menuMobile = document.querySelector('.menuList');
    const darkModeBtn = document.querySelector('.darkModeBtn')
    
    //if para garantir que o clique foi fora do menu
    if (!btnMenuMobile.contains(event.target) && !btnMenuSpan.contains(event.target) && !checkboxMenuMobile.contains(event.target) && !menuMobile.contains(event.target) && !darkModeBtn.contains(event.target) ) {
        if (checkboxMenuMobile.checked) {
            checkboxMenuMobile.checked = false;
        }
    }
});

//--------------------------------botão darkmode
const darkModeBtn = document.querySelector('.darkModeBtn');
const spanBtn = document.querySelector('.dark');
const icons = document.querySelectorAll('.iconLink i');
const footer = document.querySelector('.footer');
const arrow = document.querySelector('.arrowUp');

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

    btnState = !btnState;
  };
  
darkModeBtn.addEventListener('click', toggleMode);