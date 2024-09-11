const projectsCardsContainer = document.querySelector('.projectsContainer');

async function fetchProjects() {
    try {
        const response = await fetch("../../projects.json");
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