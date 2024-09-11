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