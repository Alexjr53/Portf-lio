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